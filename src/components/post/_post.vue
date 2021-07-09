<template>
	<!--	TODO: make dark implementation too -->
	<v-card
		color="white"
	>
		<v-list-item>
			<v-list-item-avatar v-if="post['uploaded_by']['active_profile_image']"
				size="50"
				class="elevation-4"
			>
				<v-img
					:src="post['uploaded_by']['active_profile_image']"
				/>
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title
					class="headline cursor"
					@click="routeToPostDetail"
				>
					{{ post.title }}
				</v-list-item-title>
				<v-list-item-subtitle v-if="post['uploaded_by']">
					<code>{{ post['uploaded_by']['username'] }}</code>
					<span class="subtitle-chip">{{ $moment(post['uploaded_at']).format("MMMM Do YYYY") }}</span>
					<span class="subtitle-chip">{{ (isArticle) ? 'article' : 'multimedia' }}</span>
				</v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-action>
				<v-btn v-if="post.is_pinned"
					icon
					@click="revokePin"
				>
					<v-icon
						color="indigo"
						class="tilt-pin"
					>
						mdi-pin
					</v-icon>
				</v-btn>
				<v-btn v-else
					icon
					@click="setPin"
				>
					<v-icon
						color="indigo"
						class="tilt-pin"
					>
						mdi-pin-outline
					</v-icon>
				</v-btn>
			</v-list-item-action>
		</v-list-item>

		<slot name="media" />

		<v-card-text v-if="post.description"
			class="post-description my-0 pt-2 pb-0"
		>
			{{ post.description }}
		</v-card-text>

		<v-row class="ma-0 post-actions-row"
			align="center"
		>
			<v-card-actions class="ma-0 pa-0">
				<v-btn
					v-if="extraStatus.loved"
					icon
					color="black"
					@click="revokeLove"
				>
					<v-icon>
						mdi-heart
					</v-icon>
				</v-btn>
				<v-btn
					v-else
					icon
					color="black"
					@click="love"
				>
					<v-icon>
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
				<v-btn
					v-if="!extraStatus.bookmarked"
					icon
					@click="setBookmark"
				>
					<v-icon>mdi-bookmark-outline</v-icon>
				</v-btn>
				<v-btn
					v-else
					icon
					@click="removeBookmark"
				>
					<v-icon>mdi-bookmark</v-icon>
				</v-btn>
			</v-card-actions>
		</v-row>
		<p v-if="extraStatus.love_count > 0"
			class="mb-0 mx-4 love-count"
		>
			<span>{{ extraStatus.love_count }}</span>&nbsp;Love {{ (extraStatus.love_count > 1) ? 'Reacts' : 'React' }}
		</p>
		<post-comment :post-id="post.id" />
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
			this.extraStatus = await this.$store.dispatch(
				"multimedia/fetchMyStatus",
				{ id: this.post.id }
			)
		},
		async performPostAction(actionText) {
			const fullActionText = `multimedia/${actionText}`
			await this.$store.dispatch(fullActionText, {id: this.post.id})
			await this.init()
		},
		routeToPostDetail() {
			const routeName = (this.isArticle) ? "SACHCHAI NEPAL ARTICLE" : "SACHCHAI NEPAL MULTIMEDIA"
			router.push({name: routeName, params: { id: this.post.id }})
		},
		async love() {
			await this.performPostAction("setLove")
		},
		async revokeLove() {
			await this.performPostAction("revokeLove")
		},
		async setBookmark() {
			await this.performPostAction("setBookmark")
		},
		async removeBookmark() {
			await this.performPostAction("removeBookmark")
		},
		async setPin() {
			await this.$store.dispatch("multimedia/pin", { id: this.post.id })
			await this.$store.dispatch("multimedia/filter", {is_approved: true})
		},
		async revokePin() {
			await this.$store.dispatch("multimedia/revokePinStatus", { id: this.post.id })
			await this.$store.dispatch("multimedia/filter", {is_approved: true})
		}
	}
}
</script>

<style lang="sass" scoped>
.cursor
	cursor: pointer
.love-count
	font-size: 12px
	font-family: 'Fira Sans', sans-serif
	font-weight: 500
	span
		font-size: 14px
	span:hover
		color: #c40909
		zoom: 120%
.headline
	font-weight: 300
	font-size: 1.4rem !important
	line-height: 2.2rem !important
.bookmark-avatar
	cursor: pointer
	opacity: .8
.post-action-spacer
	display: block
	@media only screen and (max-width: 250px)
		display: none
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
