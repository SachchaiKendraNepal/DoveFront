<template>
	<div class="comment-container">
		<div class="comment-histories">
			<template v-for="(item, index) in items">
				<p class="mx-4 my-0 last-comments" :key="index">
					<span class="commenter">{{ item.title }}: </span>
					<span class="comment-history">{{ item.subtitle }}</span>
					<v-icon class="reply-comment" size="16">mdi-reply-circle</v-icon>
				</p>
			</template>
			<p class="mx-4 mb-0 last-commented-ago">
				13 minutes ago <v-icon size="16">mdi-history</v-icon>
			</p>
		</div>
		<v-divider class="my-2" />
		<div class="comment-box d-flex justify-space-around ml-2">
			<v-text-field class="comment mb-2" dense outlined placeholder="Add a comment" hide-details />
			<v-btn text color="blue darken-3" class="font-weight-bold mt-1"> Post </v-btn>
		</div>
	</div>
</template>
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
</style>
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
