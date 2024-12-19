"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCacheKey = buildCacheKey;
exports.fetchTranslation = fetchTranslation;
exports.getFromCache = getFromCache;
exports.setToCache = setToCache;
exports.handleErrors = handleErrors;
var localCache = new Map();
function buildCacheKey(text, fromLanguage, toLanguage) {
    return "".concat(fromLanguage, "|").concat(toLanguage, ":").concat(text);
}
function fetchTranslation(query, fromLanguage, toLanguage) {
    var api = "https://api.mymemory.translated.net/get?q=".concat(encodeURIComponent(query), "&langpair=").concat(fromLanguage, "|").concat(toLanguage);
    return fetch(api)
        .then(function (response) {
        if (!response.ok)
            throw new Error("Network response was not ok");
        return response.json();
    })
        .then(function (data) {
        if (data.responseStatus !== 200)
            throw new Error(data.responseDetails);
        return data.responseData.translatedText;
    });
}
function getFromCache(key) {
    return localCache.get(key);
}
function setToCache(key, value) {
    localCache.set(key, value);
}
function handleErrors(fn) {
    return fn().catch(function (err) {
        console.error("Error occurred:", err);
        return null;
    });
}
