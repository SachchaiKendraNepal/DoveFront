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
			class="round-touch"
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
			<div v-if="postVideos.length > 0">
				<v-carousel-item v-for="item in postVideos"
					:key="item.id + 7 * 11"
					transition="fade-transition"
					reverse-transition="fade-transition"
				>
					<template #default>
						<video-player
							:options="{
								fluid: true,
								fill: true,
								autoplay: false,
								controls: true,
								sources: [
									{
										src: item.video,
										type: 'video/mp4'
									}
								]
							}"
						/>
					</template>
				</v-carousel-item>
			</div>
			<div v-if="postVideoUrls > 0">
				<v-carousel-item v-for="item in postVideoUrls"
					:key="item.id + 11 * 13"
					transition="fade-transition"
					reverse-transition="fade-transition"
				>
					<template #default>
						<div class="video-container">
							<iframe :src="prepareEmbedUrl(item.video_url)"
								frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
								allowfullscreen
							/>
						</div>
					</template>
				</v-carousel-item>
			</div>
		</v-carousel>
	</div>
</template>
<script>
import router from "@/router"

export  default {
	name: "PinnedPostComponent",
	components: {
		VideoPlayer: () => import("@/components/VideoPlayer"),
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
				if (this.post.article_images) this.postImages = this.post.article_images
				else {
					this.postImages = this.post.multimedia_images
					this.postVideos = this.post.multimedia_videos
					this.postVideoUrls = this.post.multimedia_video_urls
				}
			}
			this.loading = false
		},
		routeToPostDetail() {
			this.isArticle
				? router.push({name: "SACHCHAI NEPAL ARTICLE", params: { id: this.post.id }})
				: router.push({name: "SACHCHAI NEPAL MULTIMEDIA", params: { id: this.post.id }})
		},
		getId(url) {
			return this.$helper.getVideoIdFromYoutubeURL(url)
		},
		prepareEmbedUrl(url) {
			return `https://www.youtube.com/embed/${this.getId(url)}`
		}
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
</style>
