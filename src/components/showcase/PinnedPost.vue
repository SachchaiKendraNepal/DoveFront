<template>
	<v-card
		dark
		width="285"
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
				id="parallax-actions"
				no-gutters
			>
				<v-col cols="12"
					class="ma-0 pa-0 d-flex justify-space-around"
					style="height: 40px; margin-top: 30px !important;"
				>
					<v-btn icon>
						<v-icon
							large
							color="#cebfbf"
						>
							mdi-image
						</v-icon>
						<v-chip dense
							class="ml-1"
						>
							5
						</v-chip>
					</v-btn>
					<v-btn icon>
						<v-icon
							large
							color="#cebfbf"
						>
							mdi-music
						</v-icon>
						<v-chip dense
							class="ml-1"
						>
							5
						</v-chip>
					</v-btn>
				</v-col>
				<v-col cols="12"
					class="ma-0 pa-0 d-flex justify-center"
					style="height: 40px; margin-top: -120px !important;"
				>
					<v-btn icon>
						<v-icon
							large
							color="#cebfbf"
						>
							mdi-video-box
						</v-icon>
						<v-chip dense
							class="ml-2"
						>
							5
						</v-chip>
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
