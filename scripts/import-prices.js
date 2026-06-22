const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

// Меняем инициализацию на использование service_role ключа
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // <-- берем сервисный ключ

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Ошибка: Отсутствует секретный ключ Supabase в .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Конфигурация файлов и кодов отделений ЛДЦ
const PRICE_FILES = [
  { code: '5287', name: 'Заречный (Проценко 15)', filename: 'Прайс ФЛО 5287 (Заречный, ул. им. М.В. Проценко, стр. 15).xlsx' },
  { code: '50008', name: 'Пенза (Тернопольская 10)', filename: 'Прайс ФЛО 50008 (Пенза, ул. Тернопольская, 10).xlsx' },
  { code: '50435', name: 'Пенза (Измайлова 58А)', filename: 'ФЛО 50435 (Пенза, ул. Изамйлова, д. 58А, к. 3).xlsx' },
  { code: '50362', name: 'Пенза (Строителей 174)', filename: 'Прайс ФЛО 50362 (Пенза, проспект Строителей, д. 174).xlsx' }
];

// Функция автоматического определения категории для фильтров на сайте
function determineCategory(title, sku) {
  const t = title.toLowerCase();
  if (t.includes('ультразвуков') || t.includes('узи') || sku.startsWith('A04')) return 'УЗИ и ЭКГ';
  if (t.includes('прием') || t.includes('консультация') || sku.startsWith('B01')) return 'Приём врачей';
  if (t.includes('введение') || t.includes('инъекция') || t.includes('блокада') || t.includes('капельно')) return 'Процедуры';
  if (t.includes('выезд') || t.includes('на дому')) return 'Выезд на дом';
  return 'Анализы и исследования'; // Категория по умолчанию
}

async function importExcelFile(fileConfig) {
  const filePath = path.join(process.cwd(), fileConfig.filename);
  
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Файл не найден, пропускаем: ${fileConfig.filename}`);
    return;
  }

  console.log(`\n📦 Обработка филиала: ${fileConfig.name} (${fileConfig.code})...`);
  
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  // Объект для фильтрации дубликатов артикулов внутри одного файла
  const uniqueRecords = {};

  // Начинаем с 7 строки (индекс 6)
  for (let i = 6; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row.length < 5) continue;

    const sku = row[3] ? String(row[3]).trim() : null;      // Столбец D: Артикул
    const title = row[4] ? String(row[4]).trim() : null;    // Столбец E: Номенклатура
    const price = parseFloat(row[7]);                       // Столбец H: Цена

    // Валидация: отсекаем пустые строки и технический мусор
    if (!sku || !title || isNaN(price) || price <= 0.1) continue;

    // Записываем в объект. Если артикул повторится, он просто перезапишет старый в памяти,
    // и в массив для Supabase попадет строго одна уникальная позиция.
    uniqueRecords[sku] = {
      department_code: fileConfig.code,
      sku: sku,
      title: title,
      price: price,
      category: determineCategory(title, sku)
    };
  }

  // Превращаем объект обратно в чистый массив строк
  const recordsToInsert = Object.values(uniqueRecords);

  if (recordsToInsert.length === 0) {
    console.log(`🔹 Нет данных для импорта из файла ${fileConfig.filename}`);
    return;
  }

  console.log(`🚀 Загрузка ${recordsToInsert.length} уникальных позиций в Supabase...`);

  const chunkSize = 500;
  for (let i = 0; i < recordsToInsert.length; i += chunkSize) {
    const chunk = recordsToInsert.slice(i, i + chunkSize);
    
    const { error } = await supabase
      .from('prices')
      .upsert(chunk, { onConflict: 'department_code,sku' });

    if (error) {
      console.error(`❌ Ошибка загрузки пачки ${i}-${i + chunkSize}:`, error.message);
    }
  }

  console.log(`✅ Филиал ${fileConfig.code} успешно импортирован!`);
}

async function main() {
  console.log('🏁 Запуск импорта медицинских прайс-листов Гемотест...');
  for (const file of PRICE_FILES) {
    await importExcelFile(file);
  }
  console.log('\n🎉 Все доступные файлы успешно обработаны!');
}

main();