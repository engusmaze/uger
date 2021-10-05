export type OptionalCSSStyles = {
	[P in keyof CSSStyleDeclaration]?: CSSStyleDeclaration[P];
};
