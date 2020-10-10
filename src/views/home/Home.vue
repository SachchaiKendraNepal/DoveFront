<template>
	<div
		id="sacchai-home-container"
		class="px-2"
	>
		<v-row class="ma-0 pa-0 mx-2">
			<v-col
				v-show="$route.name === 'SACHCHAI NEPAL HOME'"
				class="mb-0 pb-0"
				sm="3"
				md="3"
				lg="4"
				xl="4"
			>
				<div :class="
					$vuetify.breakpoint.mdAndUp
						? 'sticky'
						: 'sticky'
				"
				>
					<v-spacer />
					<user-clip />
				</div>
			</v-col>
			<v-col
				class="mb-0 pb-0"
				sm="6"
				md="6"
				lg="4"
				xl="4"
			>
				<add-post-box />
				<article-post :post="articlePost" />
				<article-post :post="articlePost" />
				<multimedia :post="multimediaPost" />
				<multimedia :post="multimediaPost" />
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	name: "HomeComponent",
	components: {
		ArticlePost: () => import("@/components/Article"),
		Multimedia: () => import("@/components/Multimedia"),
		AddPostBox: () => import("@/views/home_layout/AddPostBox"),
		UserClip: () => import("@/views/home_layout/UserClip")
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
			description: "Alice, now 19 years old, follows a rabbit in a blue coat to a magical wonderland from her dreams where she is reunited with her friends who make her realise her true destiny."
		}
	})
}
</script>
<style lang="sass" scoped>
.sticky
	position: sticky
	top: 80px
</style>
