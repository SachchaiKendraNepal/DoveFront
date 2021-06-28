module.exports = {
	BG_COLORS() {
		return [
			"#b82015",
			"#c21c53",
			"#9C27B0",
			"#673AB7",
			"#3F51B5",
			"#106892",
			"#055c68",
			"#208377",
			"#1a761d",
			"#476e1a",
			"#636d0b",
			"#8e5c11",
			"#795548",
			"#465a64",
		]
	},
	pickBackgroundColor() {
		const index = Math.floor(Math.random() * this.BG_COLORS().length)
		return this.BG_COLORS()[index]
	}
}
