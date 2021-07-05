<template>
	<base-post-card
		:post="post"
		:is-article="true"
	>
		<template #media>
			<v-row class="ma-0 pa-0">
				<v-col cols="12"
					class="py-0"
				>
					<v-carousel :show-arrows="false"
						height="400"
						vertical-delimiters="true"
						class="round-touch"
					>
						<v-carousel-item
							v-for="item in post['article_images']"
							:key="item.id"
							:src="item.image"
							transition="fade-transition"
							reverse-transition="fade-transition"
						/>
					</v-carousel>
				</v-col>
			</v-row>
		</template>
	</base-post-card>
</template>

<script>
export default {
	name: "ArticleComponent",
	components: {
		BasePostCard: () => import("@/components/post/_post.vue"),
	},
	props: {
		post: {
			required: true,
			type: Object
		}
	},
};
</script>

<style lang="sass" scoped>
.v-icon
	color: #0e0d0d !important

.comment-history
	font-size: 13px
</style>
<style lang="scss" scoped>
::v-deep.v-carousel--vertical-delimiters .v-carousel__controls {
	width: 30px;
}
::v-deep.v-item-group {
	button {
		height: 14px;
		width: 14px;
	}
}
</style>
