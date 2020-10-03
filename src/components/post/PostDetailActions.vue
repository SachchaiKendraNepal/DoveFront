<template>
	<v-row
		align="center"
		justify="space-between"
		class="ma-0 px-2 py-2"
		style="background-color: aliceblue"
	>
		<v-btn
			v-if="isLiked"
			depressed
			color="blue lighten-5"
			@click="isLiked = false"
		>
			<v-icon left>
				mdi-heart
			</v-icon>
			Love
		</v-btn>
		<v-btn
			v-else
			depressed
			@click="isLiked = true"
		>
			<v-icon left>
				mdi-heart-outline
			</v-icon>
			Love
		</v-btn>
		<v-btn depressed>
			<v-icon left>
				mdi-comment-outline
			</v-icon>
			Comment
		</v-btn>
		<v-btn depressed>
			<v-icon left>
				mdi-share-variant-outline
			</v-icon>
			Share
		</v-btn>
		<v-btn
			v-if="!isBookmarked"
			depressed
			@click="isBookmarked = true"
		>
			<v-icon left>
				mdi-bookmark-outline
			</v-icon>
			Bookmark
		</v-btn>
		<v-btn
			v-if="isBookmarked"
			color="blue lighten-5"
			depressed
			@click="isBookmarked = false"
		>
			<v-icon left>
				mdi-bookmark
			</v-icon>
			Bookmark
		</v-btn>
	</v-row>
</template>
<script>
export default {
	name: "PostDetailActionsComponent",
	data: () => ({
		isLiked: false,
		isBookmarked: false,
	})
}
</script>
