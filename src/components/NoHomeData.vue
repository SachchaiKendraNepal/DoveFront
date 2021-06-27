<template>
	<v-card
		color="transparent"
		class="no-post py-3"
		flat
		min-height="73vh"
	>
		<v-chip color="purple lighten-5"
			label
		>
			{{ topText }}
		</v-chip>
		<v-card height="200"
			max-width="500"
			class="ma-4 mx-auto"
			color="transparent"
		>
			<v-img
				height="200"
				:src="image"
			/>
		</v-card>
		<v-chip color="blue lighten-4">
			{{ bottomText }}
		</v-chip>
	</v-card>
</template>

<script>
export default {
	name: "NoHomeData",
	props: {
		image: {
			type: String,
			default: "https://media.giphy.com/media/1O2BRZcDgIfDsKMTbG/giphy.gif"
		},
		topText: {
			type: String,
			default: "There are no approved Sachchai posts now. Please visit us later."
		},
		bottomText: {
			type: String,
			default: "Contribute to Sachchai Kendra Nepal by sharing your great moments with us."
		}
	}
}
</script>

<style scoped lang="sass">
.no-post
	text-align: center
	color: lightslategrey
	font-size: .875rem
</style>
