<template>
	<v-card
		flat
		color="transparent"
		class="mx-auto pa-0"
		max-width="1000"
	>
		<v-row
			class="ma-0 pa-0"
			align="start"
			justify="center"
		>
			<v-col
				id="post-column"
				class="ma-0 pa-0 pt-3"
				cols="12"
				xl="8"
				lg="8"
				md="8"
				sm="8"
			>
				<add-post-box />
				<template v-for="item of articles">
					<!-- eslint-disable-next-line vue/no-v-for-template-key-on-child-->
					<div :key="item.id"
						class="mb-2"
					>
						<article-post :post="item" />
					</div>
				</template>
				<template v-for="item of multimedia">
					<!-- eslint-disable-next-line vue/no-v-for-template-key-on-child-->
					<div :key="item.id"
						class="mb-2"
					>
						<multimedia-post :post="item" />
					</div>
				</template>
			</v-col>
			<v-col
				cols="12"
				xl="4"
				lg="4"
				md="4"
				sm="4"
			>
				<home-ads-column-view />
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import HomeAdsColumnView from "@/views/home/Ads";
import {mapGetters} from "vuex";
export default {
	name: "HomeComponent",
	components: {
		HomeAdsColumnView,
		ArticlePost: () => import("@/components/Article"),
		MultimediaPost: () => import("@/components/Multimedia"),
		AddPostBox: () => import("@/views/home_layout/AddPostBox")
	},
	data: () => ({
		loading: false,
	}),
	computed: {
		...mapGetters({
			articles: "article/allArticles",
			multimedia: "article/allMultimedia"
		})
	},
	async created() {
		this.$bus.on("reload-multimedia", this.initMultimedia)
		this.$bus.on("reload-articles", this.initArticles)
		this.loading = true
		await this.initArticles()
		await this.initMultimedia()
		this.loading = false
	},
	beforeUnmount() {
		this.$bus.off("reload-multimedia")
		this.$bus.off("reload-articles")
	},
	methods: {
		async initArticles() {
			await this.$store.dispatch("article/getAll")
		},
		async initMultimedia() {
			await this.$store.dispatch("article/getAllM")
		}
	}
}
</script>
<style lang="sass" scoped>
.sticky
	position: sticky
	top: 140px
#post-column
	overflow-y: auto
	height: 93vh
	-ms-overflow-style: none
	scrollbar-width: none
#post-column::-webkit-scrollbar
	display: none
</style>
