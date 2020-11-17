<template>
	<v-tab-item value="tab-about">
		<v-card flat>
			<v-list two-line>
				<v-list-item
					v-for="item in aboutEventInfo"
					:key="item.index"
					@click="1"
				>
					<v-list-item-avatar><v-icon>{{ item.icon }}</v-icon></v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title>{{ item.field }}</v-list-item-title>
						<v-list-item-subtitle>
							<div>
								<p class="mb-0">
									{{ item.value }}
								</p>
							</div>
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
			<v-card-text>{{ event.description }}</v-card-text>
		</v-card>
	</v-tab-item>
</template>
<script>
export default {
	name: "EventDetailAboutTabContent",
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	computed: {
		aboutEventInfo() {
			return [
				{index: 0, icon: "mdi-account-group", field: "Audiences", value: this.event.no_of_responses + " people responded"},
				{index: 1, icon: "mdi-clock", field: "Date-Time", value: this.event.start_date + " for " + this.event.duration + " days"},
				{index: 2, icon: "mdi-home", field: "Venue", value: this.event.venue},
				{index: 3, icon: "mdi-earth", field: "Organizer", value: "Registred by " + this.event.created_by + " from " + this.event.organizer},
				{index: 4, icon: "mdi-web", field: "Event Type", value: this.event.type}
			]
		}
	}
}
</script>
