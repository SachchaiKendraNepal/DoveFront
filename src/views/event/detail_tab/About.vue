<template>
	<v-tab-item value="tab-about"
		transition="fade-transition"
		reverse-transition="fade-transition"
	>
		<v-card v-if="event"
			flat
		>
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
import {mapGetters} from "vuex";

export default {
	name: "EventDetailAboutTabContent",
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	computed: {
		...mapGetters({
			statistics: "event/statisticsDetail",
		}),
		aboutEventInfo() {
			if (!this.event) return []
			if (!this.event.created_by) return []
			if (!this.event.organizer) return []
			return [
				{
					index: 0,
					icon: "mdi-star",
					field: "I am interested",
					value: this.statistics["interested_count"] + " people are interested"
				},
				{
					index: 1,
					icon: "mdi-account-group",
					field: "I want to go",
					value: this.statistics["going_count"] + " people wants to attend"
				},
				{
					index: 2,
					icon: "mdi-clock",
					field: "Date-Time",
					value: this.event.start_date + " for " + this.event.duration + ` ${(this.event.duration > 1) ? "days" : "day"}`
				},
				{index: 3, icon: "mdi-home", field: "Venue", value: this.event.venue},
				{
					index: 4,
					icon: "mdi-earth",
					field: "Organizer",
					value: "Registered by " + this.event.created_by.username + " from " + this.event.organizer.name
				},
				{index: 5, icon: "mdi-web", field: "Event Type", value: this.event.type}
			]
		}
	}
}
</script>
