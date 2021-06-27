<template>
	<v-col cols="12">
		<v-card
			:loading="loading"
			class="mx-auto"
			max-width="1000"
			flat
			color="transparent"
		>
			<v-card-title class="event-title">
				{{ event.title }}
				<span>
					<v-card-actions>
						<v-chip
							v-if="event.is_main"
							label
							dark
							color="blue"
							class="mr-2 mb-1"
						>
							<v-icon left>
								mdi-map-marker-star
							</v-icon>
							<b v-show="$vuetify.breakpoint.smAndUp">Main Event</b>
							<v-icon right>
								mdi-church
							</v-icon>
						</v-chip>
						<v-chip
							v-if="event.type === 'General Meeting'"
							label
							dark
							class="mb-1"
							color="green lighten-1"
						>
							<v-icon
								left
								color="white"
							>
								mdi-clipboard-account
							</v-icon>
							<b v-show="$vuetify.breakpoint.smAndUp">General Meeting</b>
							<v-icon right>
								mdi-city
							</v-icon>
						</v-chip>
						<v-chip
							v-if="event.type === 'Board Meeting'"
							label
							dark
							class="mb-1"
							color="indigo lighten-1"
						>
							<v-icon
								left
								color="white"
							>
								mdi-clock-time-eleven
							</v-icon>
							<b v-show="$vuetify.breakpoint.smAndUp">Board Meeting</b>
							<v-icon right>
								mdi-city
							</v-icon>
						</v-chip>
						<v-chip
							v-if="event.type === 'Satsang'"
							label
							dark
							class="mb-1"
						>
							<v-icon
								left
								color="white"
							>
								mdi-dove
							</v-icon>
							<b v-show="$vuetify.breakpoint.smAndUp">Satsang</b>
							<v-icon right>
								mdi-city
							</v-icon>
						</v-chip>
					</v-card-actions>
				</span>
			</v-card-title>
			<v-card-subtitle v-if="event.description"
				class="event-description"
			>
				{{ event.description }}
			</v-card-subtitle>
			<v-card-subtitle class="event-subtitle">
				{{ $moment(event.start_date).format('MMMM Do YYYY') }} ●
				{{ event.timeOfDay }} ●
				{{ event.duration }} days ●
				{{ event.venue }}
			</v-card-subtitle>
		</v-card>
	</v-col>
</template>

<script>
export default {
	name: "TopInfoColumn",
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		loading: true,
	})
}
</script>

<style scoped>

</style>
