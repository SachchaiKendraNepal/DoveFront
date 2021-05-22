<template>
	<tab-item-card>
		<template #content>
			<v-row class="pa-0 ma-0">
				<v-col
					cols="12"
					xl="4"
					lg="4"
					md="4"
					class="pa-0"
				>
					<intro-card />
					<peek-photos />
				</v-col>
				<v-col
					id="post-column"
					cols="12"
					xl="8"
					lg="8"
					md="8"
					class="pa-md-1 pt-md-2 px-2 py-0"
				>
					<!--					<div class="mb-2">-->
					<!--						<article-post :post="articlePost" />-->
					<!--					</div>-->
					<!--					<div class="mb-2">-->
					<!--						<multimedia :post="multimediaPost" />-->
					<!--					</div>-->
				</v-col>
			</v-row>
		</template>
	</tab-item-card>
</template>
<script>
export default {
	name: "ProfilePostsTabView",
	components: {
		IntroCard: () => import("@/views/profile/Intro"),
		PeekPhotos: () => import("@/views/profile/PeekPhotos"),
		TabItemCard: () => import("@/components/ProfileTabItem"),
		// ArticlePost: () => import("@/components/Article"),
		// Multimedia: () => import("@/components/Multimedia"),
	},
	data: () => ({
		loading: false,
	}),

}
</script>
<style lang="sass" scoped>
#post-column
	overflow-y: auto
	height: 93vh
	-ms-overflow-style: none
	scrollbar-width: none
#post-column::-webkit-scrollbar
	display: none
</style>

