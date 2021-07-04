<template>
	<v-main>
		<div class="py-6" />
		<v-card min-height="500"
			max-width="1000"
			class="ma-auto"
		>
			<v-card
				dark
				height="400"
				class="red lighten-2"
			>
				<div class="fill-height d-flex align-center justify-center">
					<h1 class="text-center">
						You are not authorized to view this page.
					</h1>
				</div>
			</v-card>
			<v-card-actions class="d-flex justify-space-around align-center flex-wrap pa-4">
				<v-btn @click="$router.go(-1)">
					Go Back
				</v-btn>
				<v-btn
					@click="$router.push({name: 'SACHCHAI SHOWCASE'})"
				>
					Showcase
				</v-btn>
				<v-btn @click="$router.push({name: 'HOME'})">
					Feeds
				</v-btn>
				<v-btn @click="$router.push({name: 'ABOUT ME'})">
					Profile
				</v-btn>
			</v-card-actions>
			<v-divider class="mx-4" />
		</v-card>
	</v-main>
</template>

<script>
export default {
	name: "Unauthorized",
	props: {},
	data: () => ({}),
	computed: {},
	methods: {}
}
</script>

<style scoped>

</style>
