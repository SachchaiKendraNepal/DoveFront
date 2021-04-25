<template>
	<!--	TODO: make dark implementation too -->
	<v-card
		color="white"
	>
		<v-list-item>
			<v-list-item-avatar size="54"
				class="author-avatar"
			>
				<v-img contain
					src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
				/>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title
					class="headline cursor"
					@click="routeToPostDetail(post)"
				>
					{{ post.title }}
				</v-list-item-title>
				<v-list-item-subtitle v-if="post.uploaded_by">
					<code>{{ post.uploaded_by.username }}</code>
				</v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-action>
				<v-icon v-if="!post.isArticle"
					color="purple"
				>
					mdi-video
				</v-icon>
				<v-icon v-else
					color="teal darken-2"
				>
					mdi-newspaper
				</v-icon>
			</v-list-item-action>
		</v-list-item>

		<slot name="media" />

		<v-card-text class="post-description my-0 pt-2 pb-0">
			{{ post.description }}
		</v-card-text>

		<v-row class="ma-0 post-actions-row"
			align="center"
		>
			<v-card-actions class="ma-0 pa-0">
				<v-btn
					v-if="isLiked"
					icon
					color="black"
					@click="isLiked = false"
				>
					<v-icon>mdi-heart</v-icon>
				</v-btn>
				<v-btn
					v-else
					icon
					color="black"
					@click="isLiked = true"
				>
					<v-icon>mdi-heart-outline</v-icon>
				</v-btn>
			</v-card-actions>
			<v-card-actions class="ma-0 pa-0">
				<v-btn icon
					color="black"
				>
					<v-icon>mdi-comment-outline</v-icon>
				</v-btn>
			</v-card-actions>
			<v-card-actions class="ma-0 pa-0">
				<v-btn icon
					color="black"
				>
					<v-icon>mdi-share-variant-outline</v-icon>
				</v-btn>
			</v-card-actions>
			<v-spacer class="post-action-spacer" />
			<v-card-actions class="ma-0 pa-0">
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
		</v-row>
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
		routeToPostDetail(post) {
			if (this.isArticle) router.push({name: "SACHCHAI NEPAL ARTICLE", params: { id: post.id }})
			else router.push({name: "SACHCHAI NEPAL MULTIMEDIA", params: { id: post.id }})
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
	font-size: 1.4rem !important
.bookmark-avatar
	cursor: pointer
	opacity: .8
.post-action-spacer
	display: block
	@media only screen and (max-width: 250px)
		display: none
.author-avatar
	background-color: goldenrod
	border: 2px solid goldenrod
</style>
<style lang="scss">
.post-actions-row {
	height: 40px;
	padding: 0 4px 0 8px !important;
}
</style>
