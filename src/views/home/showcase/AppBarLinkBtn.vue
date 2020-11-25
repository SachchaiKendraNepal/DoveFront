<template>
	<v-item
		v-slot="{ active, toggle }"
	>
		<v-btn
			class="ma-1 link-button"
			depressed
			color="transparent"
			@click="toggle"
		>
			<v-icon
				size="22"
				:color="active ? 'teal darken-2' : 'black'"
			>
				{{ icon }}
			</v-icon>
			<span
				v-if="$vuetify.breakpoint.mdAndUp"
				class="pt-1 pl-1 link-text"
				:class="active ? 'active-link-text': 'non-active-link-text'"
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
.link-text
	font-size: 14px
.active-link-text
	color: green
	border-bottom: 10px dotted forestgreen
.non-active-link-text
	color: black

</style>
