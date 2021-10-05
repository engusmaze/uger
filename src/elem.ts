import { OptionalCSSStyles } from "./formats";

class Elem {
	/**
	 * HTML element that was passed to the constructor of this object
	 */
	element: HTMLElement;
	/**
	 * Style of html element
	 */
	style: CSSStyleDeclaration;
	children: Elem[] = [];
	parent: Elem | undefined;
	constructor(element: HTMLElement) {
		this.element = element;
		this.style = this.element.style;
	}
	_(properties: string) {
		for (const property of properties.split(" ")) {
			switch (property[0]) {
				case ".":
					this.element.className = property.slice(1, property.length);
					break;
				case "#":
					this.element.id = property.slice(1, property.length);
					break;
				default:
					this.element.setAttribute("name", property);
					break;
			}
		}
	}
	add<K extends keyof HTMLElementTagNameMap>(tagName: K) {
		let e = new Elem(document.createElement(tagName));
		this.element.appendChild(e.element);
		return e;
	}
	styles(css: OptionalCSSStyles): this {
		Object.assign(this.style, css);
		return this;
	}
	removeChild(child: Elem) {
		if (this.children.includes(child))
			this.children.splice(this.children.indexOf(child), 1);
	}
	remove() {
		if (this.parent !== undefined) this.parent.removeChild(this);
	}

	id(id: string): this {
		this.element.id = id;
		return this;
	}
	getId() {
		return this.element.id;
	}

	class(className: string): this {
		this.element.className = className;
		return this;
	}
	getClass() {
		return this.element.className;
	}

	text(text: string) {
		this.element.innerText = text;
		return this;
	}
	getText() {
		return this.element.innerText;
	}

	on<K extends keyof HTMLElementEventMap>(
		type: K,
		listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions
	): this {
		this.element.addEventListener(type, listener, options);
		return this;
	}
}
export const body: Elem =
	document.body !== undefined
		? new Elem(document.body)
		: new Elem(document.createElement("body"));
