<template>
	<div>
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
					color="grey lighten-2"
					class="elevation-3"
				>
					<v-icon v-ripple
						color="grey darken-4"
					>mdi-bullseye-arrow</v-icon>
				</v-avatar>
			</span>
		</v-list-item>
		<v-img
			class="ma-0 pa-0"
			height="298"
			dark
			src="https://linkpicture.com/q/mass_clapping.jpg"
		>
			<v-card-actions class="ma-0 pa-1"
				style="margin-top:260px !important"
			>
				<v-btn
					small
					icon
				>
					<v-icon v-ripple="true"
						color="grey lighten-2"
					>
						mdi-heart
					</v-icon>
				</v-btn>
				<v-btn small
					icon
				>
					<v-icon color="grey lighten-2">
						mdi-comment
					</v-icon>
				</v-btn>
				<v-btn small
					icon
				>
					<v-icon color="grey lighten-2">
						mdi-share
					</v-icon>
				</v-btn>
				<v-btn small
					icon
				>
					<v-icon color="grey lighten-2">
						mdi-bookmark
					</v-icon>
				</v-btn>
			</v-card-actions>
		</v-img>
	</div>
</template>
<script>
import router from "@/router"

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
#parallax-actions
	cursor: pointer
</style>
