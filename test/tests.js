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

/***/ "./build/css.js":
/*!**********************!*\
  !*** ./build/css.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.CSSImport = exports.Styles = exports.CSS = void 0;\r\nconst camelToKebabCase = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);\r\nconst StyleElement = document.body.appendChild(document.createElement(\"style\"));\r\nconst CSSElements = [];\r\nfunction updateCSS() {\r\n    let cssCode = \"\";\r\n    for (const elem of CSSElements)\r\n        cssCode += elem.cssCode;\r\n    StyleElement.innerText = cssCode;\r\n    // console.log(\"updateCSS\", cssCode);\r\n}\r\nclass CSSElement {\r\n    cssCode = \"\";\r\n    constructor() {\r\n        CSSElements.push(this);\r\n    }\r\n    /** Updates css code of this element */\r\n    update() { }\r\n    /** Removes this css element */\r\n    remove() {\r\n        if (CSSElements.includes(this))\r\n            CSSElements.splice(CSSElements.indexOf(this), 1);\r\n        updateCSS();\r\n    }\r\n}\r\nclass CSSImportElem extends CSSElement {\r\n    importUrl;\r\n    additionalProperties;\r\n    constructor(importUrl, additionalProperties) {\r\n        super();\r\n        this.importUrl = importUrl;\r\n        this.additionalProperties = additionalProperties;\r\n        this.update();\r\n    }\r\n    update() {\r\n        this.cssCode = `@import url(${this.importUrl})${this.additionalProperties !== undefined\r\n            ? \" \" + this.additionalProperties\r\n            : \"\"};`;\r\n        updateCSS();\r\n    }\r\n}\r\nclass CSSDeclaration extends CSSElement {\r\n    selector;\r\n    style;\r\n    /**\r\n     * @param selector css selector, for example \"p .bold\", \"#canvas\"\r\n     * @param declaration some css properties with values\r\n     */\r\n    constructor(selector, declaration) {\r\n        super();\r\n        this.selector = selector;\r\n        this.style = declaration;\r\n        this.update();\r\n    }\r\n    update() {\r\n        this.cssCode = \"\";\r\n        let converted = {};\r\n        for (const [property, value] of Object.entries(this.style))\r\n            if (value != undefined)\r\n                converted[camelToKebabCase(property)] = value.toString();\r\n        this.cssCode += this.selector + \" {\";\r\n        for (const [key2, value2] of Object.entries(converted)) {\r\n            this.cssCode += key2 + \":\" + value2 + \";\";\r\n        }\r\n        this.cssCode += \"}\";\r\n        // console.log(\"update\", this.cssCode);\r\n        updateCSS();\r\n        // \tStyleElement.innerText += cssCode;\r\n    }\r\n}\r\nfunction CSS(selector, declaration) {\r\n    return new CSSDeclaration(selector, declaration);\r\n}\r\nexports.CSS = CSS;\r\nfunction Styles(styles) {\r\n    let declarationArr = [];\r\n    for (const [selector, declaration] of Object.entries(styles))\r\n        declarationArr.push(new CSSDeclaration(selector, declaration));\r\n    return declarationArr;\r\n}\r\nexports.Styles = Styles;\r\nfunction CSSImport(importUrl) {\r\n    return new CSSImportElem(importUrl);\r\n}\r\nexports.CSSImport = CSSImport;\r\n\n\n//# sourceURL=webpack://uger/./build/css.js?");

/***/ }),

/***/ "./build/elem.js":
/*!***********************!*\
  !*** ./build/elem.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.body = void 0;\r\nclass Elem {\r\n    /**\r\n     * HTML element that was passed to the constructor of this object\r\n     */\r\n    element;\r\n    /**\r\n     * Style of html element\r\n     */\r\n    style;\r\n    children = [];\r\n    parent;\r\n    constructor(element, properties) {\r\n        this.element = element;\r\n        this.style = this.element.style;\r\n        if (properties !== undefined)\r\n            this._(properties);\r\n    }\r\n    _(properties) {\r\n        for (const property of properties.split(\" \")) {\r\n            switch (property[0]) {\r\n                case \".\":\r\n                    this.element.className = property.slice(1, property.length);\r\n                    break;\r\n                case \"#\":\r\n                    this.element.id = property.slice(1, property.length);\r\n                    break;\r\n                default:\r\n                    this.element.setAttribute(\"name\", property);\r\n                    break;\r\n            }\r\n        }\r\n    }\r\n    add(tagName, properties) {\r\n        let e = new Elem(document.createElement(tagName), properties);\r\n        this.appendChild(e);\r\n        return e;\r\n    }\r\n    styles(css) {\r\n        Object.assign(this.style, css);\r\n        return this;\r\n    }\r\n    removeChild(child) {\r\n        if (this.children.includes(child)) {\r\n            child.element.remove();\r\n            this.children.splice(this.children.indexOf(child), 1);\r\n        }\r\n    }\r\n    remove() {\r\n        if (this.parent !== undefined)\r\n            this.parent.removeChild(this);\r\n        else\r\n            this.element.remove();\r\n    }\r\n    id(id) {\r\n        this.element.id = id;\r\n        return this;\r\n    }\r\n    getId() {\r\n        return this.element.id;\r\n    }\r\n    class(className) {\r\n        this.element.className = className;\r\n        return this;\r\n    }\r\n    getClass() {\r\n        return this.element.className;\r\n    }\r\n    text(text) {\r\n        this.element.innerText = text;\r\n        return this;\r\n    }\r\n    getText() {\r\n        return this.element.innerText;\r\n    }\r\n    appendChild(elem) {\r\n        elem.parent = this;\r\n        this.element.appendChild(elem.element);\r\n        this.children.push(elem);\r\n    }\r\n    on(type, listener, options) {\r\n        const self = this;\r\n        this.element.addEventListener(type, (ev) => {\r\n            listener(ev, self);\r\n        }, options);\r\n        return this;\r\n    }\r\n    once(type, listener) {\r\n        const self = this;\r\n        this.element.addEventListener(type, (ev) => {\r\n            listener(ev, self);\r\n        }, { once: true });\r\n        return this;\r\n    }\r\n}\r\nexports.body = document.body !== undefined\r\n    ? new Elem(document.body)\r\n    : new Elem(document.createElement(\"body\"));\r\n\n\n//# sourceURL=webpack://uger/./build/elem.js?");

/***/ }),

/***/ "./build/tests.js":
/*!************************!*\
  !*** ./build/tests.js ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst uger_1 = __webpack_require__(/*! ./uger */ \"./build/uger.js\");\r\n(0, uger_1.Styles)({\r\n    body: {\r\n        backgroundColor: \"black\",\r\n    },\r\n    \".a\": {\r\n        color: \"white\",\r\n    },\r\n    \".b\": {\r\n        color: \"yellow\",\r\n    },\r\n});\r\nuger_1.body.add(\"p\", \".a\")\r\n    .text(\"SUKA\")\r\n    .on(\"click\", () => {\r\n    uger_1.body.add(\"p\", \".b\")\r\n        .text(\"Wow you clicked\")\r\n        .once(\"click\", (ev, elem) => elem.remove());\r\n});\r\n\n\n//# sourceURL=webpack://uger/./build/tests.js?");

/***/ }),

/***/ "./build/uger.js":
/*!***********************!*\
  !*** ./build/uger.js ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.body = exports.Styles = exports.CSSImport = exports.CSS = void 0;\r\nconst css_1 = __webpack_require__(/*! ./css */ \"./build/css.js\");\r\nObject.defineProperty(exports, \"CSS\", ({ enumerable: true, get: function () { return css_1.CSS; } }));\r\nObject.defineProperty(exports, \"CSSImport\", ({ enumerable: true, get: function () { return css_1.CSSImport; } }));\r\nObject.defineProperty(exports, \"Styles\", ({ enumerable: true, get: function () { return css_1.Styles; } }));\r\nconst elem_1 = __webpack_require__(/*! ./elem */ \"./build/elem.js\");\r\nObject.defineProperty(exports, \"body\", ({ enumerable: true, get: function () { return elem_1.body; } }));\r\n\n\n//# sourceURL=webpack://uger/./build/uger.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./build/tests.js");
/******/ 	
/******/ })()
;