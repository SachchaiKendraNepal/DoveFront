<template>
	<div
		class="comment-container mx-2"
	>
		<v-list v-if="comments"
			class="comment-histories"
			two-line
			dense
		>
			<v-list-item v-for="(item, index) in comments"
				:key="item.id"
				class="pl-0"
			>
				<v-avatar size="40"
					tile
					class="d-flex justify-content-center ma-2 elevation-4 comment-avatar"
					:color="colors[index % 10]"
					:style="'border: ' + colors[index % 10]"
				>
					<span class="white--text headline">
						{{ item.writer.username[0].toUpperCase() }}
					</span>
				</v-avatar>
				<v-list-item-content class="pl-0">
					<v-list-item-title>
						<code v-if="item.writer"
							class="comment-writer mx-1"
						>
							{{ item.writer.username }}
						</code>
						<code
							class="comment-created-at mx-1"
						>
							{{ item.created_at }}
						</code>
						<v-icon small>
							mdi-reply-circle
						</v-icon>
					</v-list-item-title>
					<v-list-item-subtitle class="comment-text">
						{{ item.comment }}
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>
		<v-divider class="my-2" />
		<div class="comment-box pb-2">
			<v-text-field
				v-model="comment.comment"
				class="comment"
				outlined
				dense
				hide-details="auto"
				placeholder="Add a comment"
				@keyup="submitIfEnterIsPressed"
			>
				<template #append>
					<v-icon class="send-icon-button"
						color="primary"
						@click="addCommentToPost"
					>
						mdi-send
					</v-icon>
				</template>
			</v-text-field>
		</div>
	</div>
</template>

<script>
export default {
	name: "CommentComponent",
	props: {
		postId: {
			type: Number,
			required: true
		},
		isArticle: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	data: () => ({
		colors: [
			"#1F7087",
			"#731231",
			"#254f0d",
			"#6d190d",
			"#952175",
			"#64410d",
			"#952175",
			"#105414",
			"#60250f",
			"#10405f",
		],
		comment: {
			comment: null,
			article: null,
			multimedia: null
		},
		latestCommentTime: null,
		comments: null
	}),
	async created() {
		await this.init()
	},
	methods: {
		async init() {

			let response
			if (this.isArticle) {
				response = await this.$store.dispatch(
					"article/fetchCommentsForId",
					{id: this.postId}
				)
			} else {
				response = await this.$store.dispatch(
					"multimedia/fetchCommentsForId",
					{id: this.postId}
				)
			}
			// only show 2 comments in comment history
			if (response.count === 0) response = []
			else if (response.count <= 6) response = response.results
			else if (response.count > 6) response = response.results.slice(0, 6)
			this.comments = response
		},
		async submitIfEnterIsPressed(e) {
			if (e.keyCode === 13) {
				await this.addCommentToPost()
			}
		},
		async addCommentToPost() {
			if (this.isArticle) {
				this.comment.article = this.postId
				delete this.comment.multimedia
			}
			else {
				this.comment.multimedia = this.postId
				delete this.comment.article
			}
			const posted = await this.$store.dispatch("post/postComment", {body: this.comment})
			if (posted === true) {
				this.comment.comment = ""
				await this.init()
			} else if (posted === 500) {
				await this.openSnack("Internal server error. Please try again later")
			} else {
				await this.openSnack(posted.comment[0])
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.comment-text {
	padding: 10px;
	background: aliceblue;
	border-radius: 10px;
	margin: 5px;
}
.comment-writer {
	font-family: Roboto, sans-serif;
	font-weight: bold;
	color: #686868 !important;
}
.comment-created-at {
	font-family: Roboto, sans-serif;
	font-weight: bold;
	color: #686868 !important;
	background: #eaeaea !important;
}
.comment-avatar {
	border-radius: 5px !important;
}
</style>
