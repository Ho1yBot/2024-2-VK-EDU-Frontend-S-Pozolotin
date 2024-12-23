import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginTypeScript from "@typescript-eslint/eslint-plugin";
import parserTypeScript from "@typescript-eslint/parser";

export default [
  {
    // Конфигурация для JavaScript файлов
    files: ["**/*.{js,mjs,cjs,jsx}", "!eslint.config.js", "!src/ts/**/*.js"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/prop-types": "off", // Отключаем правило для пропсов
      "react/react-in-jsx-scope": "off", // Отключаем правило для JSX
    },
  },
  {
    // Конфигурация для TypeScript файлов
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: parserTypeScript,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./src/ts/utils/tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": pluginTypeScript,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": "warn",
      "react/prop-types": "off", // Отключаем правило для пропсов
      "react/react-in-jsx-scope": "off", // Отключаем правило для JSX
    },
  },
  {
    // Конфигурация для Node.js файлов
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "commonjs",
      },
    },
    rules: {
      "no-undef": "off", // Отключаем правило для неопределенных переменных
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
