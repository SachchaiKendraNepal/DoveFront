<template>
	<v-card :loading="loading"
		class="ma-0 pa-0 elevation-0 rounded-0"
	>
		<div id="comment-toolbar">
			<v-toolbar
				dark
				height="50"
			>
				<v-toolbar-title style="font-size: 16px">
					Comments
				</v-toolbar-title>
			</v-toolbar>
		</div>
		<div
			class="ma-0 pa-0 scrollable-y-comments"
		>
			<v-list v-if="comments.count > 0"
				two-line
			>
				<template v-for="(item, index) in comments.results">
					<v-subheader
						v-if="item.header"
						:key="index"
						v-text="item.header"
					/>

					<v-divider
						v-else-if="item.divider"
						:key="index"
						:inset="item.inset"
					/>

					<v-list-item
						v-else
						:key="index"
						class="pl-3 pr-1 comment-item"
					>
						<div v-if="$helper.ifWriterIsCurrentUser(item.writer.username)">
							<v-btn
								icon
								@click="openUpdateCommentDialog(item.comment)"
							>
								<v-icon color="primary">
									mdi-pencil
								</v-icon>
							</v-btn>
							<v-dialog
								v-model="updateCommentDialog"
								max-width="500"
							>
								<v-card class="edit-comment-card">
									<v-card-title class="headline grey lighten-2">
										Update your comment
									</v-card-title>
									<div class="py-4" />

									<v-card-text>
										<v-textarea
											v-model="updateComment.comment"
											filled
											label="Comment"
										/>
									</v-card-text>

									<v-divider />

									<v-card-actions>
										<v-btn
											color="grey"
											text
											@click="updateCommentDialog = false"
										>
											Cancel
										</v-btn>
										<v-spacer />
										<v-btn
											color="primary"
											text
											@click="updateMyComment(item.id)"
										>
											Update
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</div>
						<v-list-item-content>
							<v-list-item-title v-if="item.writer"
								class="d-flex justify-space-between align-items-center"
							>
								<code>{{ item.writer.username }}</code>
								<code>{{ item.created_at }}</code>
							</v-list-item-title>
							<v-list-item-subtitle class="comment">
								{{ item.comment }}
							</v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-action class="comment-actions">
							<v-btn v-if="ifWriterIsCurrentUser(item.writer.username) || $helper.isCurrentUserSuperAdmin() "
								icon
								@click="removeComment(item.id)"
							>
								<v-icon
									color="red darken-1"
								>
									mdi-delete
								</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</template>
			</v-list>
			<div v-else
				class="fill-height empty-comment-message"
			>
				<i>Be the first to comment.</i>
			</div>
		</div>
	</v-card>
</template>
<script>
import $ from "jquery"

export default {
	name: "CommentsDetailComponent",
	props: {
		isArticle: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data: () => ({
		updateCommentDialog: false,
		updateComment: {
			comment: null
		},
		comments: [],
		loading: false
	}),
	async created() {
		await this.init()
		this.$bus.on("refresh-comment-in-details-page", this.init)
	},
	beforeUnmount() {
		this.$bus.off("refresh-comment-in-details-page")
	},
	mounted() {
		this.calculateCommentBoxHeight()
	},
	methods: {
		openUpdateCommentDialog(comment) {
			this.updateCommentDialog = true
			this.updateComment.comment = comment
		},
		closeUpdateCommentDialog() {
			this.updateCommentDialog = false
		},
		async init() {
			this.loading = true
			this.postId = parseInt(this.$route.params.id)
			let response
			if (this.isArticle) {
				response = await this.$store.dispatch("article/fetchCommentsForId", {id: this.postId})
			} else {
				response = await this.$store.dispatch("multimedia/fetchCommentsForId", {id: this.postId})
			}
			this.comments = response
			this.loading = false
		},
		async openSnack(text, color = "error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async updateMyComment(commentId) {
			const updated = await this.$store.dispatch("post/updateComment", {
				id: commentId,
				comment: this.updateComment.comment
			})
			if (updated) {
				this.closeUpdateCommentDialog()
				await this.init()
			} else {
				await this.openSnack("Failed to comment. Try again later.")
			}
		},
		async removeComment(commentId) {
			const removed = await this.$store.dispatch("post/deleteComment", {id: commentId})
			if (removed) {
				await this.openSnack("Comment removed", "success")
				await this.init()
			} else {
				await this.openSnack("Comment remove failed")
			}
		},
		calculateCommentBoxHeight() {
			const commentToolbarHeight = 50
			console.log("mounted")
			$(document).ready(function () {
				const commentPostBox = $("#post-comment-from-detail").css("height")
				const magicBoxHeight = $("#magic").height()
				const topSectionHeight = magicBoxHeight + commentToolbarHeight + parseInt(commentPostBox)
				$(".scrollable-y-comments").height($(window).height() - topSectionHeight)
			})
			$(window).resize(function () {
				const commentPostBox = $("#post-comment-from-detail").css("height")
				$(".scrollable-y-comments").height($(window).height() -
					$("#magic").height() - commentToolbarHeight - parseInt(commentPostBox))
			})
		}
	}
}
</script>
<style lang="sass" scoped>
.comment
	background-color: #d9ebfa
	border-radius: 10px
	padding: 10px 5px
	white-space: normal
.comment-text-box
	background-color: #d2e4f5
	border-radius: 10px
	font-size: 14px
	padding: 5px
	text-align: justify
.scrollable-y-comments
	overflow-y: auto
::v-deep .v-subheader
	height: 15px
.wrap-text
	-webkit-line-clamp: unset !important
::v-deep.v-list-item__title
	white-space: normal
.empty-comment-message
	padding: 20px
	color: grey
</style>
