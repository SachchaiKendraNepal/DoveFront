<template>
	<v-card
		dark
		width="300"
		height="400"
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
		<v-parallax
			class="ma-0 pa-0"
			height="298"
			width="300"
			dark
			src="https://linkpicture.com/q/mass_clapping.jpg"
		>
			<v-row
				class="ma-0 pa-0"
				align="center"
			>
				<v-col cols="6"
					class="d-flex justify-center ma-0 pa-0"
				>
					<v-btn
						color="#2e2626d9"
						depressed
						large
						class="py-5 mx-0 px-2"
					>
						<v-chip dense>
							2
						</v-chip>
						<v-icon>
							mdi-image
						</v-icon>
					</v-btn>
				</v-col>
				<v-col cols="6"
					class="d-flex justify-center ma-0 pa-0"
				>
					<v-btn
						color="#2e2626d9"
						depressed
						large
						class="py-5 mx-0 px-2"
					>
						<v-chip dense>
							1
						</v-chip>
						<v-icon>
							mdi-music
						</v-icon>
					</v-btn>
				</v-col>
				<v-col cols="12"
					class="d-flex justify-center ma-0 pa-0"
				>
					<v-btn
						color="#2e2626d9"
						depressed
						large
						class="py-5 mx-0 px-2"
					>
						<v-chip dense>
							5
						</v-chip>
						<v-icon>
							mdi-video-box
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>
		</v-parallax>
		<v-card-actions class="d-flex justify-space-around">
			<v-btn
				depressed
				small
			>
				<v-icon
					small
				>
					mdi-heart
				</v-icon>
			</v-btn>
			<v-btn
				depressed
				small
			>
				<v-icon
					small
				>
					mdi-comment
				</v-icon>
			</v-btn>
			<v-btn
				depressed
				small
			>
				<v-icon small>
					mdi-share
				</v-icon>
			</v-btn>
			<v-btn
				depressed
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
import router from "@/router"
import $ from "jquery"

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
</style>
