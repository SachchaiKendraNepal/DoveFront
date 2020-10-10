<template>
	<base-post-detail
		:target="post"
		:is-article="true"
	>
		<template #imageCarousel>
			<v-carousel height="100vh">
				<v-carousel-item
					v-for="(item,i) in articleImages"
					:key="i"
					:src="item.src"
					reverse-transition="fade-transition"
					transition="fade-transition"
				/>
			</v-carousel>
		</template>
		<template #comments>
			<comments-detail :id="post.id" />
		</template>
	</base-post-detail>
</template>
<script>
export default {
	name: "ArticleDetailView",
	components: {
		BasePostDetail: () => import("@/components/post/_postDetail"),
		CommentsDetail: () => import("@/components/post/CommentsDetail"),
	},
	data: () => ({
		now: null,
		selection: 1,
		loading: false,
		articleImages: [
			{
				src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
			},
			{
				src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
			},
			{
				src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
			},
			{
				src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
			},
		],
		post: {
			id: 1,
			title: "How beautiful is nature?",
			description: "Nature The word nature is a commonly used word." +
				"This word is used in a variety of contexts. Perhaps the most important reference is the multiple " +
				"species of plants, animals, wildlife, and all that the earth contains from topography such as " +
				"mountains, valleys, beaches, and seas. , And forests. The beauty of nature The nature of man is " +
				"characterized by its beauty resulting mainly from the wonderful diversity of living organisms that " +
				"exist in various parts of the earth, as well as the unique terrain of mountains, water, plateaus and " +
				"forests. Each of these features is distinguished by a special beauty that distinguishes it from Other " +
				"terrain, and this great diversity gave people wide spaces to seek calm, tranquility, and tranquility.",
			uploaded_by: "Kiran Parajuli",
			uploaded_at: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
			updated_at: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
			is_approved: true,
			approved_by: "Kiran Parajuli",
			approved_at: new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")
		},
	})
}
</script>
