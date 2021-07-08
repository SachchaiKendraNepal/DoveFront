<template>
	<div
		class="comment-container mx-2"
	>
		<v-list v-if="comments"
			class="comment-histories"
			two-line
			dense
		>
			<v-list-item v-for="(item) in comments"
				:key="item.id"
				class="pl-0"
			>
				<v-avatar size="45"
					tile
					class="d-flex justify-content-center ma-2 elevation-4 comment-avatar"
					:color="$constants.pickBackgroundColor()"
				>
					<span class="white--text headline">
						{{ $helper.getUsernameInitials(item.writer) }}
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
				@keydown.enter="addCommentToPost"
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
		}
	},
	data: () => ({
		comment: {
			comment: null,
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
			response = await this.$store.dispatch(
				"multimedia/fetchCommentsForId",
				{id: this.postId}
			)
			// only show 2 comments in comment history
			if (response.count === 0) response = []
			else if (response.count <= 6) response = response.results
			else if (response.count > 6) response = response.results.slice(0, 6)
			this.comments = response
		},
		async addCommentToPost() {
			this.comment.multimedia = this.postId
			const posted = await this.$store.dispatch("multimedia/postComment", { body: this.comment })
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
