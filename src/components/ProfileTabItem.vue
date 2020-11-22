<template>
	<v-tab-item
		:value="value"
		class="profile-tab-item"
	>
		<v-card
			max-width="1000"
			flat
			class="mx-auto tab-item-card-wrapper"
			color="transparent"
		>
			<slot name="content" />
		</v-card>
	</v-tab-item>
</template>
<script>
export default {
	name: "ProfileTabItemCardComponent",
	props: {
		value: {
			type: String,
			required: true
		}
	}
}
</script>
<style lang="sass" scoped>
.profile-tab-item
	background-color: #f1ebfc // tab card ko margin le deko space
	.tab-item-card-wrapper
		border-radius: 0
</style>
