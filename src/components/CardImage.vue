<template>
	<v-card
		dark
		:height="height"
		:max-width="maxWidth"
	>
		<v-dialog v-model="fullscreen">
			<v-card>
				<v-img :src="src">
					<v-btn fab
						dark
						x-small
						color="grey darken-4"
						class="ma-2"
						@click="fullscreen=false"
					>
						<v-icon>mdi-close</v-icon>
					</v-btn>
				</v-img>
			</v-card>
		</v-dialog>
		<v-img
			class="card-image"
			:src="src"
			:height="height"
			contain
		>
			<template #default>
				<v-btn icon
					color="white"
					class="action-btn"
					@click="fullscreen=true"
				>
					<v-icon>mdi-fullscreen</v-icon>
				</v-btn>
				<slot />
			</template>
		</v-img>
	</v-card>
</template>

<script>
export default {
	name: "CardImage",
	props: {
		src: {
			required: true,
			type: String,
		},
		height: {
			type: String,
			default: ""
		},
		maxWidth: {
			type: String,
			default: "100%"
		}
	},
	data: () => ({
		fullscreen: false
	})
}
</script>

<style lang="scss">
.card-image {
	transition: visibility ease 1s;
	.action-btn {
		visibility: hidden;
	}
}
.card-image:hover {
	.action-btn {
		visibility: visible;
	}
}
</style>
