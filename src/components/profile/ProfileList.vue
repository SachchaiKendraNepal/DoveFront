<template>
	<v-list two-line>
		<v-list-item-group
			v-for="(item, i) in items"
			:key="i"
		>
			<v-list-item>
				<v-list-item-icon v-show="
					$vuetify.breakpoint.width > 405
				"
				>
					<v-icon
						color="indigo"
					>
						{{ item.icon }}
					</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title class="wrap-title">
						{{ item.value }}
					</v-list-item-title>
					<v-list-item-subtitle>{{ item.field.toUpperCase() }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider
				v-if="i < items.length - 1"
				:key="i"
				inset
			/>
		</v-list-item-group>
	</v-list>
</template>

<script>
export default {
	name: "ProfileList",
	props: {
		items: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped>

</style>
