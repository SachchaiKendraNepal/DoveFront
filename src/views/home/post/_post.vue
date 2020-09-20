<template>
	<v-card class="mx-auto mb-4">
		<v-list-item>
			<v-list-item-avatar>
				<v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title class="headline"
					>Our Changing Planet</v-list-item-title
				>
				<v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<slot name="media" />

		<v-card-text class="post-description my-0 pt-2 pb-0">
			Visit ten places on our planet that are undergoing the biggest changes
			today.
		</v-card-text>

		<v-card-actions class="post-actions my-0 pt-1 pb-0">
			<v-btn icon v-if="isLiked" v-on:click="isLiked = false">
				<v-icon>mdi-heart</v-icon>
			</v-btn>
			<v-btn icon v-else v-on:click="isLiked = true">
				<v-icon>mdi-heart-outline</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-comment-outline</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon>mdi-share-variant-outline</v-icon>
			</v-btn>
			<v-spacer />
			<v-avatar
				tile
				v-if="!isBookmarked"
				class="bookmark-avatar"
				v-on:click="isBookmarked = true"
				v-ripple
			>
				<v-img :src="bookmarkImage" height="70" />
			</v-avatar>
			<v-avatar
				tile
				v-else
				class="bookmark-avatar bookmarked"
				v-on:click="isBookmarked = false"
				v-ripple
			>
				<v-img :src="bookmarkedImage" height="70" />
			</v-avatar>
		</v-card-actions>
		<div class="comment-history">
			<template v-for="(item, index) in items">
				<p class="mx-4 my-0 last-comments" :key="index">
					<span class="commenter">{{ item.title }}: </span
					><span>{{ item.subtitle }}</span>
					<v-icon class="reply-comment" size="16">mdi-reply-circle</v-icon>
				</p>
			</template>
			<p class="mx-4 mb-0 last-commented-ago">
				13 minutes ago <v-icon size="16">mdi-history</v-icon>
			</p>
		</div>
		<v-divider class="my-2" />
		<div class="d-flex justify-space-around ml-2">
			<v-text-field
				class="comment mb-2"
				dense
				outlined
				placeholder="Add a comment"
				hide-details
			/>
			<v-btn text color="blue darken-3" class="mt-1"> Post </v-btn>
		</div>
	</v-card>
</template>
<style lang="sass" scoped>
	.bookmark-avatar
		cursor: pointer

	.v-icon
		color: #0e0d0d !important

	.comment-history
		font-size: 13px
		.last-commented-ago
			opacity: .7
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
		name: "BasePostComponent",
		data() {
			return {
				comment: "",
				isLiked: false,
				isBookmarked: false,
				bookmarkImage: require("@/assets/bookmark-ribbon.png"),
				bookmarkedImage: require("@/assets/bookmarked-ribbon.png"),
				items: [
					{ title: "kiran589", subtitle: "Wow, amazing!" },
					{ title: "bot25", subtitle: "010110101" }
				]
			}
		}
	}
</script>
