<template>
	<v-card color="transparent"
		flat
		:loading="loading"
	>
		<v-list v-if="comments"
			two-line
			dense
		>
			<v-list-item
				v-if="comments.results.length === 0"
				style="border-radius: 4px;"
			>
				Be the first to comment!
			</v-list-item>
			<v-list-item v-for="(item, index) in comments.results" v-else
				:key="item.id"
			>
				<v-avatar size="45"
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
							{{ $moment(item.created_at).fromNow() }}
						</code>
						<v-icon small>
							mdi-reply-circle
						</v-icon>
					</v-list-item-title>
					<v-list-item-subtitle class="comment-text">
						{{ item.comment }}
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action
					v-if="$helper.ifWriterIsCurrentUser(item.writer.username)"
				>
					<v-btn icon
						color="red lighten-1"
						@click="deleteConfirmMyComment(item)"
					>
						<v-icon>mdi-delete</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>
		<v-divider class="my-2" />
		<div class="comment-box pb-2">
			<v-text-field
				v-model="comment.comment"
				class="comment"
				solo
				hide-details="auto"
				placeholder="Add a comment"
				@keyup="submitIfEnterIsPressed"
			>
				<template #append>
					<v-icon class="send-icon-button"
						color="primary"
						@click="postComment"
					>
						mdi-send
					</v-icon>
				</template>
			</v-text-field>
		</div>
	</v-card>
</template>

<script>
import Snack from "@/mixins/Snack";

export default {
	name: "ArticleCommentsView",
	mixins: [Snack],
	data: () => ({
		loading: false,
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
			article: null
		},
		comments: null
	}),
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading = true
			let response
			response = await this.$store.dispatch(
				"article/fetchCommentsForId",
				{ id: this.$route.params.id }
			)
			this.comments = response
			this.loading = false
		},
		async submitIfEnterIsPressed(e) {
			if (e.keyCode === 13) {
				await this.addCommentToPost()
			}
		},
		async postComment() {
			this.comment.article = this.$route.params.id
			const posted = await this.$store.dispatch("article/postComment", { body: this.comment })
			if (posted === true) {
				this.comment.comment = ""
				await this.init()
			} else if (posted === 500) {
				await this.openSnack("Internal server error. Please try again later")
			} else {
				await this.openSnack(posted.comment[0])
			}
		},
		async deleteMyComment(item) {
			const resp = await this.$store.dispatch("article/removeComment", {id: item.id})
			if (resp) {
				await this.openSnack("Your comment removed successfully.", "success")
				await this.init()
			} else {
				await this.openSnack("Comment remove failed. Please try again.")
			}
		},
		async deleteConfirmMyComment(item) {
			if (this.$helper.ifWriterIsCurrentUser(item.writer.username)) {
				confirm("Are you sure you want to delete your comment?") && await this.deleteMyComment(item)
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
