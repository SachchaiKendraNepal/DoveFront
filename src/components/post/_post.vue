<template>
	<v-card class="mx-auto mb-4">
		<v-list-item>
			<v-list-item-avatar>
				<v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title
					class="headline cursor"
					@click="routeToPostDetail(post.id)"
				>
					{{ post.title }}
				</v-list-item-title>
				<v-list-item-subtitle>by&nbsp;{{ post.author }}</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<slot name="media" />

		<v-card-text class="post-description my-0 pt-2 pb-0">
			{{ post.description }}
		</v-card-text>

		<v-card-actions class="post-actions my-0 pt-1 pb-0">
			<v-btn
				v-if="isLiked"
				icon
				@click="isLiked = false"
			>
				<v-icon>mdi-heart</v-icon>
			</v-btn>
			<v-btn
				v-else
				icon
				@click="isLiked = true"
			>
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
				v-if="!isBookmarked"
				v-ripple
				tile
				class="bookmark-avatar"
				@click="isBookmarked = true"
			>
				<v-img
					:src="bookmarkImage"
					height="70"
				/>
			</v-avatar>
			<v-avatar
				v-else
				v-ripple
				tile
				class="bookmark-avatar bookmarked"
				@click="isBookmarked = false"
			>
				<v-img
					:src="bookmarkedImage"
					height="70"
				/>
			</v-avatar>
		</v-card-actions>
		<p class="mb-1 mx-4 love-count">
			<span>{{ loveCount }}</span>&nbsp;Love Reacts
			<v-icon size="20">
				mdi-heart
			</v-icon>
		</p>
		<post-comment />
	</v-card>
</template>

<script>
import router from "@/router"

export default {
	name: "BasePostComponent",
	components: {
		PostComment: () => import("@/components/post/_comment")
	},
	props: {
		post: {
			type: Object,
			required: true
		},
		isArticle: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data: () => ({
		loveCount: 15,
		isLiked: false,
		isBookmarked: false,
		bookmarkImage: require("@/assets/bookmark-ribbon.png"),
		bookmarkedImage: require("@/assets/bookmarked-ribbon.png")
	}),
	methods: {
		routeToPostDetail(postId) {
			if (this.isArticle) router.push({name: "SACHCHAI NEPAL ARTICLE", params: { id: postId }})
			else router.push({name: "SACHCHAI NEPAL MULTIMEDIA", params: { id: postId }})
		}
	}
}
</script>

<style lang="sass" scoped>
.cursor
	cursor: pointer
.love-count
	font-size: 14px
	font-family: 'Fira Sans', sans-serif
	font-weight: 500
	span
		font-size: 16px
	span:hover
		color: #c40909
		zoom: 120%
.headline
	font-weight: 300
.bookmark-avatar
	cursor: pointer
	opacity: .8
.v-icon
	color: #0e0d0d !important
</style>
