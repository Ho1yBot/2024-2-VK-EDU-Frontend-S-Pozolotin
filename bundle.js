/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./index.css?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);\n\nvar form = document.querySelector('form');\nvar input = document.querySelector('.form-input');\nvar messagesDiv = document.getElementById('messages');\nform.addEventListener('submit', handleSubmit);\nform.addEventListener('keypress', handleKeyPress);\n\n// Загрузка сообщений из localStorage при загрузке страницы\nwindow.addEventListener('DOMContentLoaded', loadMessages);\nfunction handleSubmit(event) {\n  event.preventDefault();\n  var messageText = input.value.trim();\n  if (!messageText) return; // Игнорируем пустые сообщения\n\n  var message = {\n    text: messageText,\n    sender: 'Вы',\n    time: new Date().toLocaleTimeString([], {\n      hour: '2-digit',\n      minute: '2-digit'\n    })\n  };\n  saveMessage(message);\n  addMessageToDOM(message);\n  input.value = ''; // Очистка поля ввода после отправки\n}\nfunction handleKeyPress(event) {\n  if (event.key === 'Enter') {\n    form.dispatchEvent(new Event('submit'));\n  }\n}\nfunction saveMessage(message) {\n  // Получаем данные из localStorage или создаем пустой массив\n  var messages = [];\n\n  // Проверяем, существуют ли сообщения в localStorage\n  var storedMessages = localStorage.getItem('messages');\n\n  // Если сообщения существуют, пытаемся их разобрать\n  if (storedMessages) {\n    try {\n      messages = JSON.parse(storedMessages);\n    } catch (error) {\n      console.error(\"Ошибка при парсинге сообщений из localStorage:\", error);\n      // Если ошибка, очищаем localStorage\n      localStorage.removeItem('messages');\n    }\n  }\n\n  // Добавляем новое сообщение\n  messages.push(message);\n\n  // Сохраняем обновленные данные обратно в localStorage\n  localStorage.setItem('messages', JSON.stringify(messages));\n}\nfunction loadMessages() {\n  var messages = [];\n\n  // Проверяем наличие сообщений в localStorage\n  var storedMessages = localStorage.getItem('messages');\n\n  // Если сообщения существуют, пытаемся их разобрать\n  if (storedMessages) {\n    try {\n      messages = JSON.parse(storedMessages);\n    } catch (error) {\n      console.error(\"Ошибка при парсинге сообщений из localStorage:\", error);\n      // Если ошибка, очищаем localStorage\n      localStorage.removeItem('messages');\n    }\n  }\n\n  // Отображаем все сообщения в DOM\n  messages.forEach(addMessageToDOM);\n}\nfunction addMessageToDOM(message) {\n  var messageElement = document.createElement('div');\n  messageElement.classList.add('message-container');\n  var senderElement = document.createElement('div');\n  senderElement.classList.add('message-sender');\n  senderElement.textContent = message.sender;\n  var textElement = document.createElement('div');\n  textElement.classList.add('message-text');\n  textElement.textContent = message.text;\n  var timeElement = document.createElement('div');\n  timeElement.classList.add('message-time');\n  timeElement.textContent = message.time;\n  messageElement.appendChild(senderElement);\n  messageElement.appendChild(textElement);\n  messageElement.appendChild(timeElement);\n  messagesDiv.appendChild(messageElement);\n\n  // Прокрутка вниз для отображения последнего сообщения\n  messagesDiv.scrollTop = messagesDiv.scrollHeight;\n}\n\n// Проверка деплоя\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });