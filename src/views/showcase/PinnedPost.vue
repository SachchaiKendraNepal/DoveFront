<template>
	<div v-if="!loading">
		<v-list-item dark>
			<v-list-item-avatar v-if="userHasProfileImage">
				<v-img :src="getUploaderImage" />
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title
					class="title cursor"
					@click="routeToPostDetail()"
				>
					{{ post.title }}
				</v-list-item-title>
				<v-list-item-subtitle class="subtitle">
					by&nbsp;{{ post.uploaded_by.username }}
				</v-list-item-subtitle>
			</v-list-item-content>
			<span>
				<v-avatar size="30"
					color="grey lighten-2"
					class="elevation-3"
				>
					<v-icon v-ripple
						color="grey darken-4"
					>mdi-bullseye-arrow</v-icon>
				</v-avatar>
			</span>
		</v-list-item>
		<v-carousel
			:show-arrows="false"
			vertical-delimiters="true"
			height="298"
			class="bottom-round-touch"
		>
			<div v-if="postImages.length > 0">
				<v-carousel-item
					v-for="(item, index) in postImages"
					:key="index + 5 * 7"
					:src="item.image"
					transition="fade-transition"
					reverse-transition="fade-transition"
				/>
			</div>
			<div v-else>
				<v-img height="298"
					:src="require('@/assets/pinned_post.jpg')"
				/>
			</div>
		</v-carousel>
	</div>
</template>
<script>
import router from "@/router"

export  default {
	name: "PinnedPostComponent",
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
	data: () =>({
		loading: false,
		postImages: [],
		postVideos: [],
		postVideoUrls: []
	}),
	computed: {
		userHasProfileImage() {
			if (!this.post) return false
			return this.post["uploaded_by"].profile["profile_images"].length > 0
		},
		getUploaderImage() {
			if (this.userHasProfileImage) {
				return this.post["uploaded_by"].profile["profile_images"][0].image
			} else return "None"
		}
	},
	created() {
		this.init()
	},
	methods: {
		init() {
			this.loading = true
			if (this.post) {
				if (this.post["article_images"]) this.postImages = this.post["article_images"]
				else {
					this.postImages = this.post["multimedia_images"]
				}
			}
			this.loading = false
		},
		routeToPostDetail() {
			this.isArticle
				? router.push({name: "SACHCHAI NEPAL ARTICLE", params: { id: this.post.id }})
				: router.push({name: "SACHCHAI NEPAL MULTIMEDIA", params: { id: this.post.id }})
		},
	}
}
</script>
<style lang="sass" scoped>
.cursor
	cursor: pointer
.title
	font-size: 14px!important
#parallax-actions
	cursor: pointer
.bottom-round-touch
	border-radius: 0 0 4px 4px
</style>
