<template>
	<div class="d-flex justify-center align-center">
		<v-menu rounded offset-y>
			<template v-slot:activator="{ attrs, on }">
				<v-card
					class="rounded-b-circle"
					img="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
					height="40"
					width="40"
					v-bind="attrs"
					v-on="on"
				></v-card>
			</template>

			<v-list>
				<v-list-item v-for="item in items" :key="item" link>
					<v-list-item-title v-text="item"></v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
export default {
	data: () => ({
		btns: [["Removed", "0"]],
		colors: ["teal darken-1"],
		items: [...Array(4)].map((_, i) => `Item ${i}`)
	})
}
</script>
