<template>
	<div
		class="no-post"
	>
		<div class="py-3" />
		<v-chip color="purple lighten-5"
			label
		>
			There are no approved Sachchai posts now. Please visit us later.
		</v-chip>
		<v-card height="200"
			max-width="500"
			class="ma-4 mx-auto"
			color="transparent"
		>
			<v-img
				height="200"
				src="https://media.giphy.com/media/1O2BRZcDgIfDsKMTbG/giphy.gif"
			/>
		</v-card>
		<v-chip color="blue lighten-4">
			Contribute to Sachchai Kendra Nepal by sharing your great moments with us.
		</v-chip>
	</div>
</template>

<script>
export default {
	name: "NoHomeData"
}
</script>

<style scoped lang="sass">
.no-post
	text-align: center
	color: lightslategrey
	font-size: .875rem
</style>
