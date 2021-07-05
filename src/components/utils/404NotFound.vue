<template>
	<v-card
		height="100vh"
		width="100vw"
		color="#aff0e4"
	>
		<div class="py-12" />
		<v-img
			height="250"
			width="350"
			class="mx-auto"
			:src="notFoundImage"
		/>
		<div class="text-center">
			<v-btn
				dark
				color="#65a095"
				depressed
				to="/home/feeds"
			>
				BACK TO HOME
			</v-btn>
		</div>
	</v-card>
</template>

<script>
export default {
	name: "NotFound",
	data: () => ({
		notFoundImage: "https://media.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif"
	})
}
</script>

<style scoped>

</style>
