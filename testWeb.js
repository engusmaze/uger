const express = require("express");
const app = express();
const port = 80;

app.use(
	express.static("test", {
		dotfiles: "ignore",
		etag: false,
		extensions: ["html"],
		maxAge: "1d",
		redirect: false,
	})
);

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
