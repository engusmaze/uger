const path = require("path");

module.exports = {
	mode: "development",
	entry: {
		tests: "./tests.js",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "test"),
	},
	watch: true,
};
