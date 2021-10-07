import { OptionalCSSStyles } from "./formats";

const camelToKebabCase = (str: string) =>
	str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const StyleElement = document.body.appendChild(document.createElement("style"));

const CSSElements: CSSElement[] = [];

function updateCSS() {
	let cssCode = "";
	for (const elem of CSSElements) cssCode += elem.cssCode;
	StyleElement.innerText = cssCode;
	// console.log("updateCSS", cssCode);
}

class CSSElement {
	cssCode = "";
	constructor() {
		CSSElements.push(this);
	}
	/** Updates css code of this element */
	update() {}
	/** Removes this css element */
	remove() {
		if (CSSElements.includes(this))
			CSSElements.splice(CSSElements.indexOf(this), 1);
		updateCSS();
	}
}

class CSSImportElem extends CSSElement {
	importUrl: string;
	additionalProperties?: string;
	constructor(importUrl: string, additionalProperties?: string) {
		super();
		this.importUrl = importUrl;
		this.additionalProperties = additionalProperties;
		this.update();
	}
	update() {
		this.cssCode = `@import url(${this.importUrl})${
			this.additionalProperties !== undefined
				? " " + this.additionalProperties
				: ""
		};`;
		updateCSS();
	}
}
class CSSDeclaration extends CSSElement {
	selector: string;
	style: OptionalCSSStyles;
	/**
	 * @param selector css selector, for example "p .bold", "#canvas"
	 * @param declaration some css properties with values
	 */
	constructor(selector: string, declaration: OptionalCSSStyles) {
		super();
		this.selector = selector;
		this.style = declaration;
		this.update();
	}
	update() {
		this.cssCode = "";
		let converted: { [key: string]: string } = {};
		for (const [property, value] of Object.entries(this.style))
			if (value != undefined)
				converted[camelToKebabCase(property)] = value.toString();
		this.cssCode += this.selector + " {";
		for (const [key2, value2] of Object.entries(converted)) {
			this.cssCode += key2 + ":" + value2 + ";";
		}
		this.cssCode += "}";
		// console.log("update", this.cssCode);
		updateCSS();
		// 	StyleElement.innerText += cssCode;
	}
}

export function CSS(
	selector: string,
	declaration: OptionalCSSStyles
): CSSDeclaration {
	return new CSSDeclaration(selector, declaration);
}
export function Styles(styles: { [selector: string]: OptionalCSSStyles }) {
	let declarationArr: CSSDeclaration[] = [];
	for (const [selector, declaration] of Object.entries(styles))
		declarationArr.push(new CSSDeclaration(selector, declaration));
	return declarationArr;
}
export function CSSImport(importUrl: string): CSSImportElem {
	return new CSSImportElem(importUrl);
}
