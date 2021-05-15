<template>
	<div v-if="!loading">
		<v-list-item dark>
			<v-list-item-avatar>
				<v-img :src="getUploaderImage" />
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title
					class="title cursor"
					@click="routeToPostDetail(post.id, isArticle)"
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
			<div v-if="images.data.length > 0">
				<v-carousel-item
					v-for="(item, index) in images.data"
					:key="index + 5 * 7"
					:src="item.image"
					transition="fade-transition"
					reverse-transition="fade-transition"
				/>
			</div>
			<div v-if="videos && videos.data.length > 0">
				<v-carousel-item v-for="item in videos.data"
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
			<div v-if="videoUrls && videoUrls.data.length > 0">
				<v-carousel-item v-for="item in videoUrls.data"
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
		images: null,
		videos: null,
		videoUrls: null,
		defaultProfileImage: "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50",
	}),
	computed: {
		getUploaderImage() {
			if (this.post["uploaded_by"].profile["profile_images"].length > 0) {
				return this.post["uploaded_by"].profile["profile_images"][0].image
			} else return this.defaultProfileImage
		}
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading = true
			if (this.isArticle) {
				this.images = await this.$store.dispatch("article/fetchImagesForArticle", {id: this.post.id})
			} else {
				this.images = await this.$store.dispatch("multimedia/fetchImagesFor", {id: this.post.id})
				this.videos = await this.$store.dispatch("multimedia/fetchVideosFor", {id: this.post.id})
				this.videoUrls = await this.$store.dispatch("multimedia/fetchVideoUrlsFor", {id: this.post.id})
			}
			this.loading = false
		},
		routeToPostDetail(itemID, isArticle) {
			isArticle
				? router.push({name: "SACHCHAI NEPAL ARTICLE", params: { id: itemID }})
				: router.push({name: "SACHCHAI NEPAL MULTIMEDIA", params: { id: itemID }})
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
