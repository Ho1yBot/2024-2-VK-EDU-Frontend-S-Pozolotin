import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser, // добавляем глобальные переменные для браузера
    },
  },
  pluginJs.configs.recommended, // Используем рекомендации для JavaScript
  pluginReact.configs.recommended, // Используем рекомендации для React
  {
    settings: {
      react: {
        version: "detect", // Автоматически определяет версию React
      },
    },
    rules: {
      // Ваши кастомные правила
      "no-console": "warn", // Пример: не использовать console.log
      "react/prop-types": "off", // Отключаем правило проверки prop-types (если не используете)
    },
  },
];
