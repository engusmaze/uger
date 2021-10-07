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
	constructor(element: HTMLElement, properties?: string) {
		this.element = element;
		this.style = this.element.style;
		if (properties !== undefined) this._(properties);
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
	add<K extends keyof HTMLElementTagNameMap>(
		tagName: K,
		properties?: string
	) {
		let e = new Elem(document.createElement(tagName), properties);
		this.appendChild(e);
		return e;
	}
	styles(css: OptionalCSSStyles): this {
		Object.assign(this.style, css);
		return this;
	}
	removeChild(child: Elem) {
		if (this.children.includes(child)) {
			child.element.remove();
			this.children.splice(this.children.indexOf(child), 1);
		}
	}
	remove() {
		if (this.parent !== undefined) this.parent.removeChild(this);
		else this.element.remove();
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

	appendChild(elem: Elem) {
		elem.parent = this;
		this.element.appendChild(elem.element);
		this.children.push(elem);
	}
	on<K extends keyof HTMLElementEventMap>(
		type: K,
		listener: (ev: HTMLElementEventMap[K], elem: Elem) => any,
		options?: boolean | AddEventListenerOptions
	): this {
		const self = this;
		this.element.addEventListener(
			type,
			(ev) => {
				listener(ev, self);
			},
			options
		);
		return this;
	}
	once<K extends keyof HTMLElementEventMap>(
		type: K,
		listener: (ev: HTMLElementEventMap[K], elem: Elem) => any
	): this {
		const self = this;
		this.element.addEventListener(
			type,
			(ev) => {
				listener(ev, self);
			},
			{ once: true }
		);
		return this;
	}
}
export const body: Elem =
	document.body !== undefined
		? new Elem(document.body)
		: new Elem(document.createElement("body"));
