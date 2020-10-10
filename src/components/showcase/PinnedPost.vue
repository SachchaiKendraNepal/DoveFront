<template>
	<v-card
		dark
		max-width="250"
	>
		<v-list-item dark>
			<v-list-item-avatar>
				<v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title
					class="title cursor"
					@click="routeToPostDetail(post.id, isArticle)"
				>
					{{ post.title }}
				</v-list-item-title>
				<v-list-item-subtitle class="subtitle">
					by&nbsp;{{ post.uploaded_by }}
				</v-list-item-subtitle>
			</v-list-item-content>
			<span>
				<v-avatar size="30"
					color="grey"
					class="elevation-3"
				>
					<v-icon v-ripple
						dark
						class="pt-1"
					>mdi-pin</v-icon>
				</v-avatar>
			</span>
		</v-list-item>
		<v-img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
			height="200"
			class="bordered mb-1"
		/>
		<v-card-actions>
			<v-btn depressed
				small
			>
				<v-icon small>
					mdi-heart
				</v-icon>
			</v-btn>
			<v-btn depressed
				small
			>
				<v-icon small>
					mdi-comment-outline
				</v-icon>
			</v-btn>
			<v-btn depressed
				small
			>
				<v-icon small>
					mdi-share-outline
				</v-icon>
			</v-btn>
			<v-btn depressed
				small
			>
				<v-icon small>
					mdi-bookmark
				</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>
import router from "@/router";

export  default {
	name: "PinnedPostComponent",
	props: {
		post: {
			type: Object,
			required: true
		},
		isArticle: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	methods: {
		routeToPostDetail(itemID, isArticle) {
			console.log(isArticle)
			isArticle
				? router.push({name: "SACHCHAI NEPAL ARTICLE", params: { id: itemID }})
				: router.push({name: "SACHCHAI NEPAL MULTIMEDIA", params: { id: itemID }})
		}
	}
}
</script>
<style lang="sass" scoped>
.cursor
	cursor: pointer
.title
	font-size: 14px!important
</style>
