<template>
	<div class="comment-container mx-4">
		<div v-if="comments"
			class="comment-histories"
		>
			<template v-for="(item) in comments">
				<!-- eslint-disable-next-line vue/no-v-for-template-key-on-child-->
				<p :key="item.id"
					class="my-0 last-comments"
				>
					<span v-if="item.writer"
						class="commenter"
					>{{ item.writer.username }}: </span>
					<span class="comment-history">{{ item.comment }}</span>
					<v-icon
						class="reply-comment"
						size="16"
					>
						mdi-reply-circle
					</v-icon>
				</p>
			</template>
			<p v-if="latestCommentTime"
				class="mb-0 last-commented-ago"
			>
				{{ latestCommentTime }}
				<v-icon size="16">
					mdi-history
				</v-icon>
			</p>
		</div>
		<v-divider class="my-2" />
		<div class="comment-box pb-2">
			<v-text-field
				v-model="comment.comment"
				class="comment"
				outlined
				dense
				hide-details="auto"
				placeholder="Add a comment"
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
					"article/fetchComments",
					{id: this.postId}
				)
			} else {
				response = await this.$store.dispatch(
					"multimedia/fetchComments",
					{id: this.postId}
				)
			}
			// only show 2 comments in comment history
			if (response.data.length === 0) response = []
			else if (response.data.length <= 2) response = response.data
			else if (response.data.length > 2) response = response.data.slice(0, 2)
			this.comments = response
			this.calculateLatestTimeString()
		},
		calculateLatestTimeString() {
			if (this.comments.length === 0) {
				return
			}
			let latestCommentTime = this.comments[0].created_at
			latestCommentTime = new Date(latestCommentTime)

			const now = this.$moment(new Date())
			const yearDiff = now.diff(latestCommentTime, "years")
			const montDiff = now.diff(latestCommentTime, "months")
			const daysDiff = now.diff(latestCommentTime, "days")
			const hoursDiff = now.diff(latestCommentTime, "hours")
			const minutesDiff = now.diff(latestCommentTime, "minutes")
			const secondsDiff = now.diff(latestCommentTime, "seconds")

			if (secondsDiff < 60) {
				this.latestCommentTime = `${secondsDiff} seconds ago`
			} else if (minutesDiff < 60 && minutesDiff > 0) {
				this.latestCommentTime = `${minutesDiff} minutes ago`
			} else if (hoursDiff && hoursDiff > 0) {
				this.latestCommentTime = `${hoursDiff} hours ago`
			} else if (daysDiff < 30 && daysDiff > 0) {
				this.latestCommentTime = `${daysDiff} days ago`
			} else if (montDiff < 12 && montDiff > 0) {
				this.latestCommentTime = `${montDiff} months ago`
			} else if (yearDiff < 30 && yearDiff > 0) {
				this.latestCommentTime = `${yearDiff} years ago`
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
			await this.$store.dispatch("post/postComment", {body: this.comment})
			this.comment.comment = ""
			await this.init()
		}
	}
}
</script>

<style lang="sass" scoped>
.comment-histories
	font-size: 13px

	.last-commented-ago
		font-weight: bold

	.commenter
		font-size: 14px
		font-weight: bold

	.reply-comment
		opacity: .8
		cursor: pointer
.send-icon-button
	transform: rotate(-60deg) !important
</style>
