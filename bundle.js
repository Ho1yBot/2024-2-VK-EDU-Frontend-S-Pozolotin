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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/ChatList.js":
/*!********************************!*\
  !*** ./components/ChatList.js ***!
  \********************************/
/*! exports provided: ChatList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ChatList\", function() { return ChatList; });\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ \"./components/storage.js\");\n/* harmony import */ var _message__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./message */ \"./components/message.js\");\n// import './../styles/chatList.css';\n\n\nfunction ChatList() {\n  var chatContainer = document.createElement('div');\n  chatContainer.classList.add('chat-container');\n  var chats = [{\n    id: 1,\n    avatar: './static/images/user-icon.svg',\n    title: 'Чат с Андреем',\n    lastMessage: 'Последнее сообщение...',\n    time: '14:23',\n    isRead: true\n  }\n  // Добавьте больше чатов...\n  ];\n  chats.forEach(function (chat) {\n    var chatItem = document.createElement('button');\n    chatItem.classList.add('chat-item');\n    chatItem.innerHTML = \"\\n            <div class=\\\"chat-info-wrp\\\">\\n                <img src=\\\"\".concat(chat.avatar, \"\\\" alt=\\\"\\u0410\\u0432\\u0430\\u0442\\u0430\\u0440\\u043A\\u0430\\\">\\n                <div class=\\\"chat-info\\\">\\n                    <h3>\").concat(chat.title, \"</h3>\\n                    <p>\").concat(chat.lastMessage, \"</p>\\n                </div>\\n            </div>\\n            <div class=\\\"chat-time\\\">\\n                <span>\").concat(chat.time, \"</span>\\n                \").concat(chat.isRead ? '<span class=\"read-status\">✓✓</span>' : '', \"\\n            </div>\");\n    chatItem.addEventListener('click', function () {\n      return openChat(chat.id, chat.title);\n    });\n    chatContainer.appendChild(chatItem);\n  });\n\n  // Функция для открытия чата\n  function openChat(chatId, chatTitle) {\n    setCurrentChat(chatId); // Сохраняем текущий чат\n\n    // Скрываем кнопку добавления чата\n    var addChatButton = document.getElementById('floating-button-component');\n    if (addChatButton) {\n      addChatButton.style.display = 'none';\n    }\n    var chatListComponent = document.getElementById('chat-list-component');\n    chatListComponent.style.display = 'none';\n    var chatComponent = document.createElement('div');\n    chatComponent.classList.add('chat-window', 'center');\n    chatComponent.innerHTML = \"\\n            <div class=\\\"chat-header\\\">\\n                <button class=\\\"back-button\\\">\\u041D\\u0430\\u0437\\u0430\\u0434</button>\\n                <h3>\".concat(chatTitle, \"</h3>\\n            </div>\\n            <div class=\\\"messages-container\\\"></div>\\n    \\n            <form class=\\\"form\\\" action=\\\"/\\\">\\n                <textarea class=\\\"form-input\\\" name=\\\"message-text\\\" placeholder=\\\"\\u0412\\u0432\\u0435\\u0434\\u0438\\u0442\\u0435 \\u0441\\u043E\\u043E\\u0431\\u0449\\u0435\\u043D\\u0438\\u0435\\\" type=\\\"text\\\"></textarea>\\n                <button class=\\\"attach\\\"><img src=\\\"./static/images/attach-file-icon.svg\\\" alt=\\\"\\u0414\\u043E\\u0431\\u0430\\u0432\\u043B\\u0435\\u043D\\u0438\\u0435 \\u0444\\u0430\\u0439\\u043B\\u0430\\\"></button>\\n                <button type=\\\"submit\\\"><img src=\\\"./static/images/send-icon.svg\\\" alt=\\\"\\u041E\\u0442\\u043F\\u0440\\u0430\\u0432\\u043A\\u0430 \\u0441\\u043E\\u043E\\u0431\\u0449\\u0435\\u043D\\u0438\\u044F\\\"></button>\\n            </form>\");\n    var header = document.getElementById('header-component');\n    header.insertAdjacentElement('afterend', chatComponent);\n\n    // Возврат к списку чатов\n    chatComponent.querySelector('.back-button').addEventListener('click', closeChat);\n\n    // Загрузка сообщений в DOM\n    loadMessagesToDOM(chatId);\n\n    // Обработка формы\n    var form = chatComponent.querySelector('form');\n\n    // Предотвращаем перезагрузку страницы при отправке формы\n    form.addEventListener('submit', function (event) {\n      event.preventDefault(); // Предотвращаем стандартное поведение формы\n      Object(_message__WEBPACK_IMPORTED_MODULE_1__[\"handleSubmit\"])(event);\n    });\n  }\n  function closeChat() {\n    var chatComponent = document.querySelector('.chat-window');\n    chatComponent.remove();\n    var chatListComponent = document.getElementById('chat-list-component');\n    chatListComponent.style.display = 'flex';\n\n    // Показываем кнопку добавления чата при возврате к списку чатов\n    var addChatButton = document.getElementById('floating-button-component');\n    if (addChatButton) {\n      addChatButton.style.display = 'block';\n    }\n  }\n\n  // Функция загрузки сообщений в DOM\n  // ChatList.js\n  function loadMessagesToDOM(chatId) {\n    var messages = Object(_storage_js__WEBPACK_IMPORTED_MODULE_0__[\"loadMessages\"])(chatId); // Загружаем сообщения по chatId\n    var messagesDiv = document.querySelector('.messages-container');\n    messages.forEach(function (message) {\n      return Object(_message__WEBPACK_IMPORTED_MODULE_1__[\"addMessageToDOM\"])(message, messagesDiv);\n    }); // Добавляем каждое сообщение в DOM\n  }\n\n  // Функция для сохранения текущего чата\n  function setCurrentChat(chatId) {\n    localStorage.setItem('currentChat', chatId);\n  }\n\n  // Функция для получения текущего чата\n  function getCurrentChat() {\n    return localStorage.getItem('currentChat');\n  }\n  return chatContainer;\n}\n\n//# sourceURL=webpack:///./components/ChatList.js?");

/***/ }),

/***/ "./components/FloatingButton.js":
/*!**************************************!*\
  !*** ./components/FloatingButton.js ***!
  \**************************************/
/*! exports provided: FloatingButton */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FloatingButton\", function() { return FloatingButton; });\nfunction FloatingButton() {\n  var button = document.createElement('button');\n  button.classList.add('floating-button');\n  button.innerHTML = '<img src=\"./static/images/create-chat.svg\" alt=\"Создать чат\">';\n  button.onclick = function () {\n    // Logic to create a new chat or navigate\n  };\n  return button;\n}\n\n//# sourceURL=webpack:///./components/FloatingButton.js?");

/***/ }),

/***/ "./components/Header.js":
/*!******************************!*\
  !*** ./components/Header.js ***!
  \******************************/
/*! exports provided: Header */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Header\", function() { return Header; });\nfunction Header() {\n  var header = document.createElement('div');\n  header.classList.add('header', 'center');\n  var backButton = \"<button class=\\\"header_burger-menu\\\"><img src=\\\"./static/images/burger-menu.svg\\\" alt=\\\"\\u041A\\u043D\\u043E\\u043F\\u043A\\u0430 \\u043C\\u0435\\u043D\\u044E\\\"></button>\";\n  var userInfo = \"\\n        <button class=\\\"header_title\\\">\\n            <div class=\\\"header_title-text\\\">Messanger</div>\\n        </button>\";\n  var navButtons = \"\\n        <nav class=\\\"header_nav\\\">\\n            <button class=\\\"header_search\\\"><img src=\\\"./static/images/search-icon.svg\\\" alt=\\\"Search\\\"></button>\\n        </nav>\";\n  header.innerHTML = backButton + userInfo + navButtons;\n  return header;\n}\n\n//# sourceURL=webpack:///./components/Header.js?");

/***/ }),

/***/ "./components/fileUpload.js":
/*!**********************************!*\
  !*** ./components/fileUpload.js ***!
  \**********************************/
/*! exports provided: fileInput, initFileUpload, handleFileUpload */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fileInput\", function() { return fileInput; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"initFileUpload\", function() { return initFileUpload; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleFileUpload\", function() { return handleFileUpload; });\nvar fileInput = document.createElement('input');\nfileInput.type = 'file';\nfileInput.style.display = 'none';\nfunction initFileUpload() {\n  fileInput.addEventListener('change', handleFileUpload);\n}\nfunction handleFileUpload(event) {\n  var file = event.target.files[0];\n  if (file) {\n    console.log('Файл загружен:', file.name);\n    // Здесь можно добавить логику обработки файла\n  }\n}\n\n//# sourceURL=webpack:///./components/fileUpload.js?");

/***/ }),

/***/ "./components/message.js":
/*!*******************************!*\
  !*** ./components/message.js ***!
  \*******************************/
/*! exports provided: handleSubmit, handleKeyPress, addMessageToDOM */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleSubmit\", function() { return handleSubmit; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"handleKeyPress\", function() { return handleKeyPress; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addMessageToDOM\", function() { return addMessageToDOM; });\n/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ \"./components/storage.js\");\n\nfunction handleSubmit(event) {\n  event.preventDefault();\n  var input = document.querySelector('.form-input');\n  var messageText = input.value.trim();\n  if (!messageText) return;\n  var message = {\n    text: messageText,\n    sender: 'Вы',\n    time: new Date().toLocaleTimeString([], {\n      hour: '2-digit',\n      minute: '2-digit'\n    })\n  };\n\n  // Получаем текущий chatId и сохраняем сообщение в локальное хранилище\n  var chatId = localStorage.getItem('currentChat');\n  Object(_storage__WEBPACK_IMPORTED_MODULE_0__[\"saveMessage\"])(chatId, message);\n  addMessageToDOM(message);\n  input.value = '';\n}\nfunction handleKeyPress(event) {\n  var form = document.querySelector('form'); // Найти форму\n  if (event.key === 'Enter' && !event.shiftKey) {\n    event.preventDefault();\n    form.dispatchEvent(new Event('submit'));\n  }\n}\nfunction addMessageToDOM(message) {\n  var messagesDiv = document.querySelector('.messages-container'); // Находим контейнер сообщений\n\n  var messageElement = document.createElement('div');\n  messageElement.classList.add('message-container');\n  var senderElement = document.createElement('div');\n  senderElement.classList.add('message-sender');\n  senderElement.textContent = message.sender;\n  var textElement = document.createElement('div');\n  textElement.classList.add('message-text');\n  textElement.textContent = message.text;\n  var timeElement = document.createElement('div');\n  timeElement.classList.add('message-time');\n  timeElement.textContent = message.time;\n  messageElement.appendChild(senderElement);\n  messageElement.appendChild(textElement);\n  messageElement.appendChild(timeElement);\n  messagesDiv.appendChild(messageElement); // Добавляем сообщение в контейнер\n  messagesDiv.scrollTop = messagesDiv.scrollHeight; // Прокручиваем к последнему сообщению\n}\n\n//# sourceURL=webpack:///./components/message.js?");

/***/ }),

/***/ "./components/storage.js":
/*!*******************************!*\
  !*** ./components/storage.js ***!
  \*******************************/
/*! exports provided: saveMessage, loadMessages, clearLocalStorage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveMessage\", function() { return saveMessage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"loadMessages\", function() { return loadMessages; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clearLocalStorage\", function() { return clearLocalStorage; });\nfunction saveMessage(chatId, message) {\n  var messages = JSON.parse(localStorage.getItem(\"messages_\".concat(chatId))) || [];\n  messages.push(message);\n  localStorage.setItem(\"messages_\".concat(chatId), JSON.stringify(messages));\n}\nfunction loadMessages(chatId) {\n  return JSON.parse(localStorage.getItem(\"messages_\".concat(chatId))) || []; // Загружаем сообщения для указанного чата\n}\nfunction clearLocalStorage() {\n  localStorage.clear();\n  clearMessagesFromDOM();\n}\nfunction clearMessagesFromDOM() {\n  messagesDiv.innerHTML = '';\n}\n\n//# sourceURL=webpack:///./components/storage.js?");

/***/ }),

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/storage */ \"./components/storage.js\");\n/* harmony import */ var _components_fileUpload__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/fileUpload */ \"./components/fileUpload.js\");\n/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/Header */ \"./components/Header.js\");\n/* harmony import */ var _components_ChatList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ChatList */ \"./components/ChatList.js\");\n/* harmony import */ var _components_FloatingButton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/FloatingButton */ \"./components/FloatingButton.js\");\n/* harmony import */ var _components_message__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/message */ \"./components/message.js\");\n\n// import './styles/chatList.css';\n\n\n\n\n\n\n\n// Загружаем компоненты в DOM\nvar headerComponent = document.getElementById('header-component');\nvar chatListComponent = document.getElementById('chat-list-component');\nvar floatingButtonComponent = document.getElementById('floating-button-component');\n\n// Добавляем компоненты\nheaderComponent.appendChild(Object(_components_Header__WEBPACK_IMPORTED_MODULE_3__[\"Header\"])());\nchatListComponent.appendChild(Object(_components_ChatList__WEBPACK_IMPORTED_MODULE_4__[\"ChatList\"])());\nfloatingButtonComponent.appendChild(Object(_components_FloatingButton__WEBPACK_IMPORTED_MODULE_5__[\"FloatingButton\"])());\n\n// Загрузка сообщений из локального хранилища\nObject(_components_storage__WEBPACK_IMPORTED_MODULE_1__[\"loadMessages\"])();\n\n// События формы отправки сообщений\nvar form = document.querySelector('form');\nvar input = document.querySelector('.form-input');\nform.addEventListener('submit', _components_message__WEBPACK_IMPORTED_MODULE_6__[\"handleSubmit\"]);\nform.addEventListener('keypress', _components_message__WEBPACK_IMPORTED_MODULE_6__[\"handleKeyPress\"]);\n\n// Загрузка сообщений при загрузке страницы\nfunction loadMessagesToDOM() {\n  var messages = Object(_components_storage__WEBPACK_IMPORTED_MODULE_1__[\"loadMessages\"])();\n  messages.forEach(_components_message__WEBPACK_IMPORTED_MODULE_6__[\"addMessageToDOM\"]);\n}\n\n// --- Логика меню ---\nvar menuOpen = false;\nvar attachFile = false;\nvar divMenu = null;\nvar divAttachFile = null;\n\n// Открытие/закрытие основного меню\nfunction toggleMenu() {\n  menuOpen ? closeMenu() : openMenu();\n}\nfunction openMenu() {\n  divMenu = document.createElement('div');\n  divMenu.classList.add('menu');\n  divMenu.innerHTML = \"\\n        <ul class=\\\"menu_list\\\">\\n            <li class=\\\"menu_item\\\"><button>Info</button></li>\\n            <li class=\\\"menu_item\\\"><button>Mute</button></li>\\n            <li class=\\\"menu_item\\\"><button id=\\\"clear-local-storage\\\">Clear localStorage</button></li>\\n        </ul>\";\n  document.querySelector('.header_menu').appendChild(divMenu);\n  document.addEventListener('click', handleClickOutsideMenu);\n  document.getElementById('clear-local-storage').addEventListener('click', clearLocalStorageFromDOM);\n  menuOpen = true;\n}\nfunction closeMenu() {\n  if (divMenu) {\n    document.querySelector('.header_menu').removeChild(divMenu);\n    divMenu = null;\n    document.removeEventListener('click', handleClickOutsideMenu);\n    menuOpen = false;\n  }\n}\nfunction handleClickOutsideMenu(event) {\n  if (divMenu && !divMenu.contains(event.target) && !document.querySelector('.header_menu').contains(event.target)) {\n    closeMenu();\n  }\n}\nfunction clearLocalStorageFromDOM() {\n  Object(_components_storage__WEBPACK_IMPORTED_MODULE_1__[\"clearLocalStorage\"])();\n  clearMessagesFromDOM();\n  loadMessagesToDOM();\n}\n\n// --- Логика прикрепления файлов ---\nfunction toggleAttach(event) {\n  event.preventDefault(); // Чтобы не отправлялась форма при нажатии на кнопку прикрепления\n  attachFile ? closeAttach() : openAttach();\n}\nfunction openAttach() {\n  divAttachFile = document.createElement('div');\n  divAttachFile.classList.add('attach_container');\n  divAttachFile.innerHTML = \"\\n        <ul class=\\\"attach_list\\\">\\n            <li class=\\\"attach_item\\\"><button id=\\\"photoVideo\\\">Photo or video</button></li>\\n            <li class=\\\"attach_item\\\"><button id=\\\"gallery\\\">Choose from gallery</button></li>\\n            <li class=\\\"attach_item\\\"><button id=\\\"file\\\">File</button></li>\\n        </ul>\";\n  document.querySelector('.attach').appendChild(divAttachFile);\n  document.addEventListener('click', handleClickOutsideAttach);\n  document.getElementById('photoVideo').addEventListener('click', function () {\n    return _components_fileUpload__WEBPACK_IMPORTED_MODULE_2__[\"fileInput\"].click();\n  });\n  document.getElementById('gallery').addEventListener('click', function () {\n    return _components_fileUpload__WEBPACK_IMPORTED_MODULE_2__[\"fileInput\"].click();\n  });\n  document.getElementById('file').addEventListener('click', function () {\n    return _components_fileUpload__WEBPACK_IMPORTED_MODULE_2__[\"fileInput\"].click();\n  });\n  attachFile = true;\n}\nfunction closeAttach() {\n  if (divAttachFile) {\n    document.querySelector('.attach').removeChild(divAttachFile);\n    divAttachFile = null;\n    document.removeEventListener('click', handleClickOutsideAttach);\n    attachFile = false;\n  }\n}\nfunction handleClickOutsideAttach(event) {\n  if (divAttachFile && !divAttachFile.contains(event.target) && !document.querySelector('.attach').contains(event.target)) {\n    closeAttach();\n  }\n}\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });