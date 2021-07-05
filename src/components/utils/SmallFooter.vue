<template>
	<v-footer padless
		:color="color"
	>
		<v-col
			class="text-center"
			cols="12"
			style="font-size: 12px"
		>
			©️ {{ new Date().getFullYear() }} — <strong>Ishworiya Marg Bhajan Mandal Sachchai Kendra Nepal</strong>
		</v-col>
	</v-footer>
</template>

<script>
export default {
	name: "SmallFooter",
	props: {
		color: {
			type: String,
			default: null
		}
	}
}
</script>

<style scoped>

</style>
