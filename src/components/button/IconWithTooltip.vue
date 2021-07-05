<template>
	<v-tooltip bottom>
		<template #activator="{ on, attrs }">
			<v-icon
				v-ripple
				v-bind="attrs"
				:color="color"
				v-on="on"
			>
				{{ icon }}
			</v-icon>
		</template>
		<span>{{ tooltip }}</span>
	</v-tooltip>
</template>
<script>
export default {
	name: "IconWithTooltip",
	props: {
		color: {
			type: String,
			required: true
		},
		icon: {
			type: String,
			required: true
		},
		tooltip: {
			type: String,
			required: true
		}
	}
}
</script>
