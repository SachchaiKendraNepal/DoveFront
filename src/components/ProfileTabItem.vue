<template>
	<v-card
		max-width="1000"
		flat
		class="mx-auto tab-item-card-wrapper"
		color="transparent"
	>
		<slot name="content" />
	</v-card>
</template>
<script>
export default {
	name: "ProfileTabItemCardComponent",
}
</script>
<style lang="sass" scoped>
.profile-tab-item
	background-color: #f1ebfc // tab card ko margin le deko space
	.tab-item-card-wrapper
		border-radius: 0
</style>
