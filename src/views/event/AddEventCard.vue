<template>
	<v-card
		max-width="500"
		class="mx-ato add-new-event"
		color="orange lighten-4"
	>
		<div class="top-section">
			<div class="add-event-text"
				@click="openAddEventFormDialog"
			>
				<v-icon size="40"
					class="px-1"
				>
					mdi-calendar-plus
				</v-icon>
				<span>Register a new event</span>
			</div>
			<v-divider />
			<div class="bottom-section">
				Events need to be approved to be visible for all the followers <span class="px-1"><v-icon color="green">mdi-check-circle</v-icon></span>
			</div>
		</div>
		<event-form-dialog :fullscreen="false" />
	</v-card>
</template>

<script>
export default {
	name: "AddEventCard",
	components: {
		EventFormDialog: () => import("@/views/event/EventFormDialog")
	},
	methods: {
		openAddEventFormDialog() {
			this.$bus.emit("open-event-form-dialog-add-item")
		},
	}
}
</script>

<style scoped lang="scss">
.add-new-event {
	margin: 20px auto;
	border-radius: 4px !important;
	.top-section {
		border-radius: 16px !important;
		.add-event-text {
			min-height: 100px;
			font-family: "Acme", sans-serif;
			font-size: 1.6rem;
			color: #686868;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			@media only screen and (max-width: 360px) {
				font-size: 1.2rem;
			}
		}
	}
	.bottom-section {
		height: 70px;
		color: #616161;
		font-size: .875rem;
		min-height: 70px;
		max-width: 500px;
		margin: auto auto;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}
}
</style>
