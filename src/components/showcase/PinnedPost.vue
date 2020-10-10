<template>
	<v-card
		dark
		max-width="300"
	>
		<v-list-item dark>
			<v-list-item-avatar>
				<v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" />
			</v-list-item-avatar>
			<v-list-item-content>
				<v-list-item-title
					class="title cursor"
					@click="routeToPostDetail(post.id)"
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
		<v-img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
			height="200"
			class="bordered"
		/>
		<v-card-actions>
			<v-btn depressed>
				<v-icon>mdi-heart</v-icon>
			</v-btn>
			<v-btn depressed>
				<v-icon>mdi-comment-outline</v-icon>
			</v-btn>
			<v-btn depressed>
				<v-icon>mdi-share-outline</v-icon>
			</v-btn>
			<v-btn depressed>
				<v-icon>mdi-bookmark</v-icon>
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>
export  default {
	name: "PinnedPostComponent",
	props: {
		post: {
			type: Object,
			required: true
		}
	},
}
</script>
<style lang="sass" scoped>
.title
	font-size: 14px!important
//.bordered
//	border: 2px solid black
</style>
