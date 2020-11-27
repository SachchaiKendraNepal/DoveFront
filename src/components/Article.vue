<template>
	<base-post-card
		:post="post"
		:is-article="true"
	>
		<template #media>
			<v-row class="ma-0 pa-0">
				<v-col v-for="(item, index) of images.slice(0,3)"
					:key="item.id"
					class="ma-0 pa-0 pb-1"
					:class="
						images.slice(0,3).length === 1
							? ''
							: images.slice(0,3).length === 2 && index === 1
								? 'pl-1'
								: images.slice(0,3).length === 3 && index === 1
									? 'px-1'
									: ''
					"
					:cols="
						(images.slice(0,3).length === 1)
							? '12'
							: (images.slice(0,3).length === 2)
								? '6'
								: '4'
					"
				>
					<v-img
						:src="item.image"
						height="100%"
						max-height="200"
					/>
				</v-col>
			</v-row>
			<!--			// second row-->
			<v-row
				v-if="images.length > 3"
				class="ma-0 pa-0"
			>
				<v-col
					v-for="(item,index) of images.slice(3, 5)"
					:key="item.id"
					class="ma-0 pa-0"
					:cols="
						(images.slice(3, 5).length === 1)
							? '12'
							: (images.slice(3, 5).length === 2)
								? '6'
								: '4'
					"
					:class="
						(images.slice(3, 5).length === 1)
							? ''
							: (images.slice(3, 5).length === 2) && (index === 1)
								? 'pl-1'
								: ''
					"
				>
					<v-img
						:src="item.image"
						height="100%"
						max-height="200"
					/>
				</v-col>
			</v-row>
		</template>
	</base-post-card>
</template>

<script>
import $api from "@/handler/axios"
import urls from "@/urls.json"
const util = require("util")

export default {
	name: "ArticleComponent",
	components: {
		BasePostCard: () => import("@/components/post/_post"),
	},
	props: {
		post: {
			required: true,
			type: Object
		}
	},
	data: () => ({
		loading: false,
		images: []
	}),
	async created() {
		this.loading = true
		await this.initArticleImages()
		this.loading = false
	},
	methods: {
		async initArticleImages() {
			const response = await $api.get(util.format(urls.article.imageList, this.post.id))
			this.images = response.data
		}
	}
};
</script>

<style lang="sass" scoped>
.v-icon
	color: #0e0d0d !important

.comment-history
	font-size: 13px
</style>
