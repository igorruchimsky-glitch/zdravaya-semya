import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Создаем инстанс совместимости для корректного импорта старых конфигов Next.js во Flat Config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  // 1. Правильный синтаксис Глобальных исключений (Игнорируемые директории)
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "node_modules/**",
      "public/mockServiceWorker.js" // Если используете серworker-ы
    ],
  },

  // 2. Подключение конфигурации Next.js Core Web Vitals с поддержкой TypeScript
  ...compat.extends("next/core-web-vitals"),

  // 3. Дополнительные строгие правила для медицинской кодовой базы
  {
    rules: {
      // Предотвращает появление забытых логов `console.log` в продакшене
      "no-console": ["warn", { allow: ["warn", "error"] }],
      
      // Запрещает оставлять неиспользуемые переменные (кроме тех, что начинаются с _)
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
      
      // Настоятельно рекомендует использовать константы
      "prefer-const": "error"
    }
  }
];

export default eslintConfig;