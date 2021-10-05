/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./elem.js":
/*!*****************!*\
  !*** ./elem.js ***!
  \*****************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.CSSImport = exports.CSS = exports.body = void 0;\r\nclass Elem {\r\n    /**\r\n     * HTML element that was passed to the constructor of this object\r\n     */\r\n    element;\r\n    /**\r\n     * Style of html element\r\n     */\r\n    style;\r\n    children = [];\r\n    parent;\r\n    constructor(element) {\r\n        this.element = element;\r\n        this.style = this.element.style;\r\n    }\r\n    _(properties) {\r\n        for (const property of properties.split(\" \")) {\r\n            switch (property[0]) {\r\n                case \".\":\r\n                    this.element.className = property.slice(1, property.length);\r\n                    break;\r\n                case \"#\":\r\n                    this.element.id = property.slice(1, property.length);\r\n                    break;\r\n                default:\r\n                    this.element.setAttribute(\"name\", property);\r\n                    break;\r\n            }\r\n        }\r\n    }\r\n    add(tagName) {\r\n        let e = new Elem(document.createElement(tagName));\r\n        this.element.appendChild(e.element);\r\n        return e;\r\n    }\r\n    styles(css) {\r\n        Object.assign(this.style, css);\r\n        return this;\r\n    }\r\n    removeChild(child) {\r\n        if (this.children.includes(child))\r\n            this.children.splice(this.children.indexOf(child), 1);\r\n    }\r\n    remove() {\r\n        if (this.parent !== undefined)\r\n            this.parent.removeChild(this);\r\n    }\r\n    id(id) {\r\n        this.element.id = id;\r\n        return this;\r\n    }\r\n    getId() {\r\n        return this.element.id;\r\n    }\r\n    class(className) {\r\n        this.element.className = className;\r\n        return this;\r\n    }\r\n    getClass() {\r\n        return this.element.className;\r\n    }\r\n    text(text) {\r\n        this.element.innerText = text;\r\n        return this;\r\n    }\r\n    getText() {\r\n        return this.element.innerText;\r\n    }\r\n    on(type, listener, options) {\r\n        this.element.addEventListener(type, listener, options);\r\n        return this;\r\n    }\r\n}\r\nexports.body = document.body !== undefined\r\n    ? new Elem(document.body)\r\n    : new Elem(document.createElement(\"body\"));\r\nconst StyleElement = document.body.appendChild(document.createElement(\"style\"));\r\nconst CSSElements = [];\r\nfunction updateCSS() {\r\n    let cssCode = \"\";\r\n    for (const elem of CSSElements)\r\n        cssCode += elem.cssCode;\r\n    StyleElement.innerText = cssCode;\r\n    // console.log(\"updateCSS\", cssCode);\r\n}\r\nclass CSSElement {\r\n    cssCode = \"\";\r\n    constructor() {\r\n        CSSElements.push(this);\r\n    }\r\n    /** Updates css code of this element */\r\n    update() { }\r\n    /** Removes this css element */\r\n    remove() {\r\n        if (CSSElements.includes(this))\r\n            CSSElements.splice(CSSElements.indexOf(this), 1);\r\n        updateCSS();\r\n    }\r\n}\r\nclass CSSImportElem extends CSSElement {\r\n    importUrl;\r\n    additionalProperties;\r\n    constructor(importUrl, additionalProperties) {\r\n        super();\r\n        this.importUrl = importUrl;\r\n        this.additionalProperties = additionalProperties;\r\n        this.update();\r\n    }\r\n    update() {\r\n        this.cssCode = `@import url(${this.importUrl})${this.additionalProperties !== undefined\r\n            ? \" \" + this.additionalProperties\r\n            : \"\"};`;\r\n        updateCSS();\r\n    }\r\n}\r\nclass CSSDeclaration extends CSSElement {\r\n    selector;\r\n    style;\r\n    /**\r\n     * @param selector css selector, for example \"p .bold\", \"#canvas\"\r\n     * @param style some css properties with values\r\n     */\r\n    constructor(selector, style) {\r\n        super();\r\n        this.selector = selector;\r\n        this.style = style;\r\n        this.update();\r\n    }\r\n    update() {\r\n        this.cssCode = \"\";\r\n        let converted = {};\r\n        for (const [property, value] of Object.entries(this.style))\r\n            if (value != undefined)\r\n                converted[camelToKebabCase(property)] = value.toString();\r\n        this.cssCode += this.selector + \" {\";\r\n        for (const [key2, value2] of Object.entries(converted)) {\r\n            this.cssCode += key2 + \":\" + value2 + \";\";\r\n        }\r\n        this.cssCode += \"}\";\r\n        // console.log(\"update\", this.cssCode);\r\n        updateCSS();\r\n        // \tStyleElement.innerText += cssCode;\r\n    }\r\n}\r\nfunction CSS(selector, style) {\r\n    return new CSSDeclaration(selector, style);\r\n}\r\nexports.CSS = CSS;\r\nfunction CSSImport(importUrl) {\r\n    return new CSSImportElem(importUrl);\r\n}\r\nexports.CSSImport = CSSImport;\r\nconst camelToKebabCase = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);\r\n\n\n//# sourceURL=webpack://newlf/./elem.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst elem_1 = __webpack_require__(/*! ./elem */ \"./elem.js\");\r\n(0, elem_1.CSS)(\".a\", {\r\n    color: \"red\",\r\n});\r\n// My new framework\r\nelem_1.body.add(\"p\")\r\n    .class(\"a\")\r\n    .text(\"SUKA\")\r\n    .on(\"click\", () => elem_1.body.add(\"p\").text(\"Wow you clicked\").styles({ color: \"yellow\" }));\r\n// Vanilla js\r\n// let el = document.body.appendChild(document.createElement(\"p\"));\r\n// el.style.color = \"red\";\r\n// el.innerText = \"SUKA\";\r\n// el.addEventListener(\"click\", () => {\r\n// \tlet p = document.body.appendChild(document.createElement(\"p\"));\r\n// \tp.style.color = \"yellow\";\r\n// \tp.innerText = \"Wow you clicked\";\r\n// });\r\n\n\n//# sourceURL=webpack://newlf/./index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;