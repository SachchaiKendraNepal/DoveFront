<template>
	<v-card
		flat
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
				class="ma-0"
				cols="12"
				xl="8"
				lg="8"
				md="8"
				sm="8"
			>
				<add-post-box />
				<article-post :post="articlePost" />
				<article-post :post="articlePost" />
				<multimedia :post="multimediaPost" />
				<article-post :post="articlePost" />
				<multimedia :post="multimediaPost" />
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
export default {
	name: "HomeComponent",
	components: {
		HomeAdsColumnView,
		ArticlePost: () => import("@/components/Article"),
		Multimedia: () => import("@/components/Multimedia"),
		AddPostBox: () => import("@/views/home_layout/AddPostBox")
	},
	data: () => ({
		loading: false,
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
