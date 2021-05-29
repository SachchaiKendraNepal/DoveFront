<template>
	<v-card height="125"
		class="ma-3 pa-3 add-new-event"
		color="indigo lighten-4"
	>
		<div class="top-section">
			<div class="add-event-text"
				@click="openAddEventFormDialog"
			>
				<v-icon size="60"
					class="px-1"
				>
					mdi-calendar-plus
				</v-icon>
				Register a new event
			</div>
			<event-form-dialog :fullscreen="false" />
		</div>
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
	border-radius: 10px !important;
	.top-section {
		background-color: #abb8e2;
		height: 100px;
		border-radius: 16px !important;
		.add-event-text {
			height: 100px;
			font-family: "Acme", sans-serif;
			font-size: 1.8rem;
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
		background-color: #deb3ff;
		border-radius: 16px !important;
		height: 70px;
		.info-text {
			color: #616161;
			font-size: .875rem;
			height: 70px;
			max-width: 500px;
			margin: auto auto;
			display: flex;
			justify-content: start;
			align-items: center;
			text-align: center;
		}
	}
}
</style>
