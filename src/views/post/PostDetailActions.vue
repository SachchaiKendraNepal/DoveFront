<template>
	<v-row
		id="post-admin-action"
		no-gutters
		align="center"
		justify="space-around"
	>
		<v-tooltip
			bottom
		>
			<template #activator="{ on, attrs }">
				<v-btn
					depressed
					small
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
					@click="togglePostLoveStatus"
				>
					<v-icon v-if="!extraStatus.loved">
						mdi-heart
					</v-icon>
					<v-icon v-else>
						mdi-heart-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Love</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template #activator="{ on, attrs }">
				<v-btn
					depressed
					small
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
				>
					<v-icon>
						mdi-comment-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Comment</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template #activator="{on, attrs}">
				<v-btn depressed
					small
					v-bind="attrs"
					class="ma-2 py-6"
					v-on="on"
				>
					<v-icon>
						mdi-share-variant-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Share</span>
		</v-tooltip>
		<v-tooltip
			bottom
		>
			<template #activator="{on, attrs}">
				<v-btn
					small
					depressed
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
					@click="toggleBookmarkStatus"
				>
					<v-icon v-if="extraStatus.bookmarked">
						mdi-bookmark
					</v-icon>
					<v-icon v-else>
						mdi-bookmark-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Bookmark</span>
		</v-tooltip>
	</v-row>
</template>
<script>
export default {
	name: "PostDetailActionsComponent",
	props: {
		target: {
			type: Object,
			required: true
		},
		isArticle: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data() {
		return {
			extraStatus: {
				loved: null,
				bookmarked: null,
				love_count: null
			}
		}
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			const postId = this.$route.params.id
			if (this.isArticle) {
				this.extraStatus = await this.$store.dispatch("article/fetchExtraStatus", {id: postId})
			} else {
				this.extraStatus = await this.$store.dispatch("multimedia/fetchExtraStatus", {id: postId})
			}
		},
		async togglePostLoveStatus() {
			if (this.isArticle) {
				await this.$store.dispatch("article/toggleLoveStatus", {id: this.target.id})
			} else {
				await this.$store.dispatch("multimedia/toggleLoveStatus", {id: this.target.id})
			}
			await this.init()
		},
		async toggleBookmarkStatus() {
			if (this.isArticle) {
				await this.$store.dispatch("article/toggleBookmarkStatus", {id: this.target.id})
			} else {
				await this.$store.dispatch("multimedia/toggleBookmarkStatus", {id: this.target.id})
			}
			await this.init()
		},
	}
}
</script>
