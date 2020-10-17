<template>
	<v-footer
		padless
		elevation="3"
	>
		<v-card
			color="rgb(255 242 202)"
			flat
			tile
			class="text-center"
		>
			<v-card-text>
				<v-btn
					v-for="(item, index) in icons"
					:key="index"
					class="mx-4"
					icon
				>
					<v-icon
						size="24px"
						:color="item.color"
					>
						{{ item.icon }}
					</v-icon>
				</v-btn>
			</v-card-text>

			<v-card-text class="pt-0">
				Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo
				interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed
				massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi
				vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui
				sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque
				penatibus et magnis dis parturient montes, nascetur ridiculus mus.
			</v-card-text>

			<v-divider />

			<v-card-text>
				{{ new Date().getFullYear() }} — <strong>Sacchai Nepal</strong>
			</v-card-text>
		</v-card>
	</v-footer>
</template>

<script>
export default {
	name: "HomeFooter",
	data: () => ({
		icons: [
			{color: "#3a80ec", icon: "mdi-facebook"},
			{color: "#f71701", icon: "mdi-youtube"},
			{color: "#bb2d71", icon: "mdi-instagram"},
			{color: "rgb(62 161 242)", icon: "mdi-twitter"}
		]
	})
}
</script>

<style lang="sass">
.gradient
	background: rgb(93, 19, 91) !important
</style>
