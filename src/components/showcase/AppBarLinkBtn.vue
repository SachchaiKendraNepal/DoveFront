<template>
	<v-item
		v-slot="{ active, toggle }"
	>
		<v-btn
			class="ma-1 link-button"
			depressed
			:color="active ? 'primary' : 'transparent'"
			@click="toggle"
		>
			<v-icon
				v-if="$vuetify.breakpoint.smAndDown"
				size="22"
				:color="active ? 'teal darken-3' : 'black'"
			>
				{{ icon }}
			</v-icon>
			<span
				v-if="$vuetify.breakpoint.mdAndUp"
				class="pt-1 pl-1"
				:style="active ? 'color: teal; border-bottom: 2px dotted #00808066; border-width: 10px;': 'color: black'"
			>{{ text }}</span>
		</v-btn>
	</v-item>
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
<style lang="sass" scoped>
.link-button
	background-color: transparent !important
.link-text
	color: black !important
.text-active
		color: white !important
.active
	background-color: #426acb !important
</style>
