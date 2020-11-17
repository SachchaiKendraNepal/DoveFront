<template>
	<v-main class="grey lighten-3">
		<v-container>
			<v-row class="ma-0 pa-0 pt-3"
				justify="center" align="start"
			>
				<v-col
					class="ma-0 pa-0 d-flex justify-center"
					cols="12"
					xl="3"
					lg="3"
					md="4"
					sm="4"
					xs="6"
				>
					<v-sheet
						rounded="lg"
						color="grey lighten-3"
						width="85%"
						class="pb-3"
					>
						<user-clip />
						<quick-links />
					</v-sheet>
				</v-col>

				<v-col
					class="ma-0 pa-0"
					xl="9"
					lg="9"
					md="8"
					sm="8"
					xs="6"
				>
					<v-sheet
						color="grey lighten-3"
						min-height="70vh"
						rounded="lg"
					>
						<v-row
							align="start"
							class="mx-4"
						>
							<v-col
								id="post-column"
								class="ma-0 pa-0 px-4"
								cols="12"
								xl="6"
								lg="6"
								style="overflow-y: auto; height: 88vh;"
							>
								<add-post-box />
								<article-post :post="articlePost" />
								<article-post :post="articlePost" />
								<multimedia :post="multimediaPost" />
								<article-post :post="articlePost" />
								<multimedia :post="multimediaPost" />
							</v-col>
						</v-row>
					</v-sheet>
				</v-col>
			</v-row>
		</v-container>
	</v-main>
</template>

<script>
export default {
	name: "HomeComponent",
	components: {
		ArticlePost: () => import("@/components/Article"),
		Multimedia: () => import("@/components/Multimedia"),
		AddPostBox: () => import("@/views/home_layout/AddPostBox"),
		UserClip: () => import("@/views/home_layout/UserClip"),
		QuickLinks: () => import("@/components/home/QuickLinks")
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
	-ms-overflow-style: none
	scrollbar-width: none
#post-column::-webkit-scrollbar
	display: none
</style>
