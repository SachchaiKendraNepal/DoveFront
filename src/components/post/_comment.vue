<template>
	<div class="comment-container mx-4">
		<div class="comment-histories">
			<template v-for="(item, index) in items">
				<!-- eslint-disable-next-line vue/no-v-for-template-key-on-child-->
				<p :key="index"
					class="my-0 last-comments"
				>
					<span class="commenter">{{ item.title }}: </span>
					<span class="comment-history">{{ item.subtitle }}</span>
					<v-icon
						class="reply-comment"
						size="16"
					>
						mdi-reply-circle
					</v-icon>
				</p>
			</template>
			<p class="mb-0 last-commented-ago">
				13 minutes ago
				<v-icon size="16">
					mdi-history
				</v-icon>
			</p>
		</div>
		<v-divider class="my-2" />
		<div class="comment-box pb-2">
			<v-text-field
				class="comment"
				outlined
				dense
				hide-details="auto"
				placeholder="Add a comment"
			>
				<template #append>
					<v-icon class="send-icon-button"
						color="primary"
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
	data: () => ({
		comment: "",
		items: [
			{ title: "kiran589", subtitle: "Wow, amazing!" },
			{ title: "bot25", subtitle: "010110101" }
		]
	})
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
