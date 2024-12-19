// import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import parserTypeScript from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      globals: globals.browser, // добавлены глобальные переменные для браузера
      parser: parserTypeScript, // подключаем TypeScript парсер
      parserOptions: {
        ecmaVersion: 2021, // настройка для современных фич ECMAScript
        sourceType: "module", // поддержка модулей
        ecmaFeatures: {
          jsx: true, // поддержка JSX
        },
        project: "./tsconfig.json", // подключаем tsconfig
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "@typescript-eslint": pluginTypeScript, // подключаем плагин TypeScript
    },
    rules: {
      "react/prop-types": "off", // отключаем правило пропсов
      "@typescript-eslint/no-unused-vars": ["error"], // правило для неиспользуемых переменных
      "@typescript-eslint/no-explicit-any": "warn", // предостережение при использовании any
    },
  },
];
