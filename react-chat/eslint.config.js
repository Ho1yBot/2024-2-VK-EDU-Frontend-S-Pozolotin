import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser, // добавлены глобальные переменные для браузера
      parserOptions: {
        ecmaVersion: 2021, // настройка для современных фич ECMAScript
        sourceType: "module", // поддержка модулей
        ecmaFeatures: {
          jsx: true, // поддержка JSX
        },
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  
];
