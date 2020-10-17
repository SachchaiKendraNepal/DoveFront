<template>
	<v-btn depressed
		color="transparent"
	>
		<v-icon v-if="$vuetify.breakpoint.smAndDown">
			{{ icon }}
		</v-icon>
		<span
			v-if="$vuetify.breakpoint.mdAndUp"
			class="pt-1 pl-1"
		>{{ text }}</span>
	</v-btn>
</template>
<script>
export default {
	name: "LinkButtonComponent",
	props: {
		icon: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		}
	}
}
</script>
