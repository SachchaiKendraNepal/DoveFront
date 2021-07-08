<template>
	<v-card-actions class="pa-2 pt-0 flex-wrap justify-space-between">
		<v-btn
			:small="ifScreenWidthIsLessThanSmall"
			:x-small="ifScreenWidthIsLessThanXSmall"
			class="ma-1"
			depressed
			color="#953b93"
			dark
			@click="dialog=true"
		>
			<v-icon
				:small="ifScreenWidthIsLessThanSmall"
			>
				mdi-pencil
			</v-icon>
		</v-btn>
		<v-btn depressed
			class="ma-1"
			:small="ifScreenWidthIsLessThanSmall"
			:x-small="ifScreenWidthIsLessThanXSmall"
		>
			<v-icon
				:small="ifScreenWidthIsLessThanSmall"
			>
				mdi-heart-outline
			</v-icon>
		</v-btn>
		<v-btn depressed
			class="ma-1"
			:small="ifScreenWidthIsLessThanSmall"
			:x-small="ifScreenWidthIsLessThanXSmall"
		>
			<v-icon
				:small="ifScreenWidthIsLessThanSmall"
			>
				mdi-comment-outline
			</v-icon>
		</v-btn>
		<v-btn depressed
			class="ma-1"
			:small="ifScreenWidthIsLessThanSmall"
			:x-small="ifScreenWidthIsLessThanXSmall"
		>
			<v-icon
				:small="ifScreenWidthIsLessThanSmall"
			>
				mdi-share
			</v-icon>
		</v-btn>
		<v-spacer />
		<v-btn depressed
			class="ma-1"
			:small="ifScreenWidthIsLessThanSmall"
			:x-small="ifScreenWidthIsLessThanXSmall"
		>
			<v-icon
				:small="ifScreenWidthIsLessThanXSmall"
			>
				mdi-bookmark-outline
			</v-icon>
		</v-btn>
	</v-card-actions>
</template>

<script>
export default {
	name: "MultimediaAction",
	props: {},
	data: () => ({}),
	computed: {
		ifScreenWidthIsLessThanXSmall() {
			return this.$vuetify.breakpoint.width < 330
		},
		ifScreenWidthIsLessThanSmall() {
			return this.$vuetify.breakpoint.width < 400
		}
	},
	methods: {}
}
</script>

<style scoped>

</style>
