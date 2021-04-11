<template>
	<v-row
		id="post-admin-action"
		no-gutters
		align="center"
		justify="space-around"
	>
		<v-tooltip
			v-if="isLiked"
			bottom
		>
			<template #activator="{ on, attrs }">
				<v-btn

					depressed
					small
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
					@click="isLiked = false"
				>
					<v-icon>
						mdi-heart
					</v-icon>
				</v-btn>
			</template>
			<span>Hate</span>
		</v-tooltip>
		<v-tooltip
			v-else
			bottom
		>
			<template #activator="{ on, attrs }">
				<v-btn
					v-if="!isLiked"
					class="ma-2 py-6"
					depressed
					small
					v-bind="attrs"
					v-on="on"
					@click="isLiked = true"
				>
					<v-icon>
						mdi-heart-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Love</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template #activator="{ on, attrs }">
				<v-btn
					depressed
					small
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
				>
					<v-icon>
						mdi-comment-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Comment</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template #activator="{on, attrs}">
				<v-btn depressed
					small
					v-bind="attrs"
					class="ma-2 py-6"
					v-on="on"
				>
					<v-icon>
						mdi-share-variant-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Share</span>
		</v-tooltip>
		<v-tooltip
			v-if="!isBookmarked"
			bottom
		>
			<template #activator="{on, attrs}">
				<v-btn
					small
					depressed
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
					@click="isBookmarked = true"
				>
					<v-icon>
						mdi-bookmark-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Bookmark</span>
		</v-tooltip>
		<v-tooltip
			v-else
			bottom
		>
			<template #activator="{ on, attrs }">
				<v-btn
					v-if="isBookmarked"
					color="blue lighten-5"
					depressed
					small
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
					@click="isBookmarked = false"
				>
					<v-icon>
						mdi-bookmark
					</v-icon>
				</v-btn>
			</template>
			<span>UnBookmark</span>
		</v-tooltip>
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
