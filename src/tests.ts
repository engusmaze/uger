import { body, CSS, Styles } from "./uger";

Styles({
	body: {
		backgroundColor: "black",
	},
	".a": {
		color: "white",
	},
	".b": {
		color: "yellow",
	},
});

body.add("p", ".a")
	.text("SUKA")
	.on("click", () => {
		body.add("p", ".b")
			.text("Wow you clicked")
			.once("click", (ev, elem) => elem.remove());
	});
