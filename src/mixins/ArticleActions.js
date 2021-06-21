const ArticleActions = {
	methods: {
		async initStatus() {
			this.loading = true
			this.status = await this.$store.dispatch(
				"article/fetchMyStatus",
				{ id: this.article.id }
			)
			this.loading = false
		},
		async bookmark() {
			const res = this.$store.dispatch("article/bookmark", {id: this.article.id})
			if (res) {
				await this.openSnack("Article bookmarked successfully.", "success")
				await this.initStatus()
			}
			else await this.openSnack(("Article bookmark failed. Pleas try again."))
		},
		async revokeBookmark() {
			const res = this.$store.dispatch("article/revokeBookmark", {id: this.article.id})
			if (res) {
				await this.openSnack("Article bookmark revoked successfully.", "success")
				await this.initStatus()
			}
			else await this.openSnack("Article bookmark revoke failed. Pleas try again.")
		},
		async love() {
			const res = this.$store.dispatch("article/love", {id: this.article.id})
			if (res) {
				await this.openSnack("Article loved successfully.", "success")
				await this.initStatus()
			}
			else await this.openSnack("Article reaction set failed. Pleas try again.")
		},
		async unsetLove() {
			const res = this.$store.dispatch("article/unsetLove", {id: this.article.id})
			if (res) {
				await this.openSnack("Article love revoked successfully.", "success")
				await this.initStatus()
			}
			else await this.openSnack("Article reaction revoke failed. Pleas try again.")
		},
	}
}

export default ArticleActions
