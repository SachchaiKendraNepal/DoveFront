<template>
	<div>
		<not-found v-if="postNotAvailable" />
		<v-card
			v-else
			:loading="loading"
			class="ma-0 pa-0 elevation-0"
		>
			<base-post-detail
				v-if="postId"
				:target="article"
				:is-article="true"
			>
				<template #imageCarousel>
					<v-carousel height="100vh">
						<v-carousel-item
							v-for="item in article['article_images']"
							:key="item.id"
							reverse-transition="fade-transition"
							transition="fade-transition"
						>
							<template #default>
								<v-card height="100vh"
									class="rounded-0"
								>
									<v-img :src="item.image"
										height="100vh"
										contain
									/>
								</v-card>
							</template>
						</v-carousel-item>
					</v-carousel>
				</template>
				<template
					#comments
				>
					<comments-detail
						:is-article="true"
					/>
				</template>
			</base-post-detail>
		</v-card>
	</div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	name: "ArticleDetailView",
	components: {
		BasePostDetail: () => import("@/components/post/_postDetail"),
		CommentsDetail: () => import("@/views/post/CommentsDetail"),
	},
	data: () => ({
		loading: false,
		postId: null,
		postNotAvailable: false
	}),
	computed: {
		... mapGetters({
			article: "article/detail"
		})
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading = true
			this.postId = parseInt(this.$route.params.id)

			const fetched = await this.$store.dispatch("article/fetchSingle", {id: this.postId})
			this.postNotAvailable = !fetched;
			this.loading=false
		}
	}
}
</script>
