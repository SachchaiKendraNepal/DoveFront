<template>
	<v-card-actions class="pa-2 pt-0 flex-wrap justify-space-between">
		<v-btn
			:small="$vuetify.breakpoint.width < 400"
			:x-small="$vuetify.breakpoint.width < 330"
			class="ma-1"
			depressed
			color="#953b93"
			dark
			@click="dialog=true"
		>
			<v-icon
				:small="$vuetify.breakpoint.width < 400"
			>
				mdi-pencil
			</v-icon>
		</v-btn>
		<v-btn depressed
			class="ma-1"
			:small="$vuetify.breakpoint.width < 400"
			:x-small="$vuetify.breakpoint.width < 330"
		>
			<v-icon
				:small="$vuetify.breakpoint.width < 400"
			>
				mdi-heart-outline
			</v-icon>
		</v-btn>
		<v-btn depressed
			class="ma-1"
			:small="$vuetify.breakpoint.width < 400"
			:x-small="$vuetify.breakpoint.width < 330"
		>
			<v-icon
				:small="$vuetify.breakpoint.width < 400"
			>
				mdi-comment-outline
			</v-icon>
		</v-btn>
		<v-btn depressed
			class="ma-1"
			:small="$vuetify.breakpoint.width < 400"
			:x-small="$vuetify.breakpoint.width < 330"
		>
			<v-icon
				:small="$vuetify.breakpoint.width < 400"
			>
				mdi-share
			</v-icon>
		</v-btn>
		<v-spacer />
		<v-btn depressed
			class="ma-1"
			:small="$vuetify.breakpoint.width < 400"
			:x-small="$vuetify.breakpoint.width < 330"
		>
			<v-icon
				:small="$vuetify.breakpoint.width < 400"
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
	computed: {},
	methods: {}
}
</script>

<style scoped>

</style>
