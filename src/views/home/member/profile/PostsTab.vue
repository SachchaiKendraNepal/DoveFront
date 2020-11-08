<template>
	<tab-item-card value="tab-Posts">
		<template #content>
			<v-row class="pa-0 pt-lg-2 pt-xl-2 mx-3 mx-lg-0 mx-xl-0">
				<v-col
					cols="12"
					xl="4"
					lg="4"
				>
					<intro-card />
					<peek-photos />
				</v-col>
				<v-col cols="12"
					xl="8"
					lg="8"
				>
					<article-post :post="articlePost" />
					<multimedia :post="multimediaPost" />
					<article-post :post="articlePost" />
					<multimedia :post="multimediaPost" />
				</v-col>
			</v-row>
		</template>
	</tab-item-card>
</template>
<script>
export default {
	name: "ProfilePostsTabView",
	components: {
		IntroCard: () => import("@/views/home/member/profile/Intro"),
		PeekPhotos: () => import("@/views/home/member/profile/PeekPhotos"),
		TabItemCard: () => import("@/components/ProfileTabItem"),
		ArticlePost: () => import("@/components/Article"),
		Multimedia: () => import("@/components/Multimedia"),
	},
	data: () => ({
		articlePost: {
			id: 1,
			title: "Our Changing Planet",
			author: "Kurt Wagner",
			description: "Visit ten places on our planet that are undergoing the biggest changes today."
		},
		multimediaPost: {
			id: 1,
			title: "Alice in the Wonderland",
			author: "Kiran Parajuli",
			description: "Alice, now 19 years old, follows a rabbit in a blue coat to a magical wonderland" +
				" from her dreams where she is reunited with her friends who make her realise her true destiny."
		},
	})
}
</script>

