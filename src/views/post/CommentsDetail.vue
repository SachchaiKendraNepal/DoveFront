<template>
	<v-card
		dark
		:loading="loading"
	>
		<v-toolbar height="50">
			<v-toolbar-title class="comment-headline">
				Comments
			</v-toolbar-title>
		</v-toolbar>
		<v-list v-if="comments.count > 0"
			two-line
			color="grey darken-3"
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
						<v-avatar size="45"
							tile
							class="d-flex justify-content-center ma-2 elevation-4 comment-avatar"
							:color="colors[index % 10]"
							:style="'border: ' + colors[index % 10]"
							style="border-radius: 4px !important;"
						>
							<span class="white--text headline">
								{{ $helper.getUsernameInitials(item.writer) }}
							</span>
						</v-avatar>
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
							class="d-flex align-items-center"
						>
							<code class="detail-code">
								<v-icon size="16"
									class="detail-icon"
								>
									mdi-account-circle
								</v-icon>
								{{ item.writer.username }}
							</code>
							<span class="detail-icon px-1">
								<v-btn
									x-small
									icon
									@click="openUpdateCommentDialog(item.comment)"
								>
									<v-icon color="primary">
										mdi-pencil
									</v-icon>
								</v-btn>
							</span>
							<v-spacer />
							<code class="detail-code">
								<v-icon
									color="grey darken-4"
									size="16"
									class="detail-icon"
								>
									mdi-history
								</v-icon>
								{{ $moment(item.created_at).fromNow() }}
							</code>
						</v-list-item-title>
						<v-list-item-subtitle class="comment">
							{{ item.comment }}
						</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action class="comment-actions">
						<v-btn v-if="$helper.ifWriterIsCurrentUser(item.writer.username) || $helper.isCurrentUserSuperAdmin() "
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
	</v-card>
</template>
<script>
import Snack from "@/mixins/Snack";

export default {
	name: "CommentsDetailComponent",
	mixins: [Snack],
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
			const response = await this.$store.dispatch(
				"multimedia/fetchCommentsForId",
				{ id: this.postId }
			)
			if (response) {
				this.comments = response
				this.loading = false
			}
		},
		async updateMyComment(commentId) {
			const updated = await this.$store.dispatch("multimedia/updateComment", {
				id: commentId,
				comment: this.updateComment.comment
			})
			if (updated) {
				this.closeUpdateCommentDialog()
				await this.init()
			} else {
				await this.openSnack("Failed to comment. Please try again later.")
			}
		},
		async removeComment(commentId) {
			const removed = await this.$store.dispatch("multimedia/deleteComment", {id: commentId})
			if (removed) {
				await this.openSnack("Comment remove success", "success")
				await this.init()
			} else {
				await this.openSnack("Failed to remove comment. Please try again later.")
			}
		},
	}
}
</script>
<style lang="sass" scoped>
.comment
	background-color: #6d6d6f
	font-size: .87rem
	border-radius: 4px
	padding: 10px
	white-space: normal
.comment-text-box
	background-color: #d2e4f5
	border-radius: 10px
	font-size: 14px
	padding: 5px
	text-align: justify
::v-deep .v-subheader
	height: 15px
::v-deep.v-list-item__title
	white-space: normal
.empty-comment-message
	padding: 20px
	color: grey
.comment-headline
	font-size: 16px
.detail-code
	font-size: .6rem
	letter-spacing:  .5px
.detail-icon
	margin-top: -2px
</style>
