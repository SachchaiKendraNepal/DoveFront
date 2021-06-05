<template>
	<!--	TODO: make dark implementation too -->
	<v-card
		color="white"
	>
		<v-list-item>
			<v-list-item-avatar v-if="post.uploaded_by.profile['profile_images'].length > 0"
				size="54"
				class="author-avatar"
			>
				<v-img
					:src="post.uploaded_by.profile['profile_images'][0].image"
				/>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title
					class="headline cursor"
					@click="routeToPostDetail"
				>
					{{ post.title }}
				</v-list-item-title>
				<v-list-item-subtitle v-if="post.uploaded_by">
					<code>{{ post.uploaded_by.username }}</code>
					<span class="subtitle-chip">{{ $moment(post.uploaded_at).format("MMMM Do YYYY") }}</span>
					<span class="subtitle-chip">{{ (isArticle) ? 'article' : 'multimedia' }}</span>
				</v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-action>
				<v-btn icon
					@click="togglePinStatus"
				>
					<v-icon v-if="extraStatus.pinned"
						color="indigo"
						class="tilt-pin"
					>
						mdi-pin
					</v-icon>
					<v-icon v-else
						color="indigo"
						class="tilt-pin"
					>
						mdi-pin-outline
					</v-icon>
				</v-btn>
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
					icon
					color="black"
					@click="togglePostLoveStatus"
				>
					<v-icon v-if="extraStatus.loved">
						mdi-heart
					</v-icon>
					<v-icon v-else>
						mdi-heart-outline
					</v-icon>
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
					v-ripple
					tile
					class="bookmark-avatar"
					@click="toggleBookmarkStatus"
				>
					<v-img
						v-if="!extraStatus.bookmarked"
						:src="bookmarkImage"
						height="70"
					/>
					<v-img
						v-else
						:src="bookmarkedImage"
						height="70"
					/>
				</v-avatar>
			</v-card-actions>
		</v-row>
		<p v-if="extraStatus.love_count > 0"
			class="mb-1 mx-4 love-count"
		>
			<span>{{ extraStatus.love_count }}</span>&nbsp;Love Reacts
			<v-icon size="20">
				mdi-heart
			</v-icon>
		</p>
		<post-comment :post-id="post.id"
			:is-article="isArticle"
		/>
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
		bookmarkImage: require("@/assets/bookmark-ribbon.png"),
		bookmarkedImage: require("@/assets/bookmarked-ribbon.png"),
		extraStatus: {
			loved: null,
			bookmarked: null,
			love_count: null
		}
	}),
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			if (this.isArticle) {
				this.extraStatus = await this.$store.dispatch("article/fetchExtraStatus", {id: this.post.id})
			} else {
				this.extraStatus = await this.$store.dispatch("multimedia/fetchExtraStatus", {id: this.post.id})
			}
		},
		routeToPostDetail() {
			if (this.isArticle) router.push({name: "SACHCHAI NEPAL ARTICLE", params: { id: this.post.id }})
			else router.push({name: "SACHCHAI NEPAL MULTIMEDIA", params: { id: this.post.id }})
		},
		async togglePostLoveStatus() {
			if (this.isArticle) {
				await this.$store.dispatch("article/toggleLoveStatus", {id: this.post.id})
			} else {
				await this.$store.dispatch("multimedia/toggleLoveStatus", {id: this.post.id})
			}
			await this.init()
		},
		async toggleBookmarkStatus() {
			if (this.isArticle) {
				await this.$store.dispatch("article/toggleBookmarkStatus", {id: this.post.id})
			} else {
				await this.$store.dispatch("multimedia/toggleBookmarkStatus", {id: this.post.id})
			}
			await this.init()
		},
		async togglePinStatus() {
			if (this.isArticle) {
				await this.$store.dispatch("article/togglePinStatus", {id: this.post.id})
			} else {
				await this.$store.dispatch("multimedia/togglePinStatus", {id: this.post.id})
			}
			await this.init()
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
.tilt-pin {
	transform: rotate(30deg) !important
}

.subtitle-chip {
	font-size: .8rem;
	margin: 2px;
	padding: 2px;
	background-color: aliceblue;
	border-radius: 4px;
}
</style>
