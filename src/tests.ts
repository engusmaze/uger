import { body, CSS } from "./uger";

CSS(".a", {
	color: "red",
});

body.add("p")
	.class("a")
	.text("SUKA")
	.on("click", () =>
		body.add("p").text("Wow you clicked").styles({ color: "yellow" })
	);
