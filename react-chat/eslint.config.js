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
    // Ваши кастомные правила
    rules: {
      // Пример: не использовать console.log
      "no-console": "warn",
      "react/prop-types": "off", // Отключаем правило проверки prop-types (если не используете)
      // Добавьте другие правила по мере необходимости
    },
  },
];
