<template>
	<v-tab-item value="tab-about"
		transition="fade-transition"
		reverse-transition="fade-transition"
	>
		<v-card
			v-if="event"
			flat
			elevation="24"
			class="event-tab"
		>
			<v-card-text class="why-idk">
				Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada.s
			</v-card-text>
			<v-list
				class="about-event-list"
				two-line
				color="transparent"
			>
				<v-list-item
					v-for="(item, index) in aboutEventInfo"
					:key="item.field"
				>
					<v-list-item-avatar><v-icon>{{ item.icon }}</v-icon></v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title class="grey--text text--darken-3">
							{{ item.field.toUpperCase() }}
						</v-list-item-title>
						<v-list-item-subtitle>
							<div>
								<p class="mb-0">
									{{ item.value }}
								</p>
							</div>
						</v-list-item-subtitle>
						<v-divider v-if="index !== aboutEventInfo.length"
							class="mt-1"
						/>
					</v-list-item-content>
				</v-list-item>
			</v-list>
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
			if (!this.event.branch) return []
			return [
				{
					icon: "mdi-star",
					field: "Interested",
					value: (this.statistics["interested_count"] === 0)
						? "No followers are interested yet"
						: (this.statistics["interested_count"] === 1)
							? "One follower is interested"
							: `${this.statistics["interested_count"]} followers are interested`
				},
				{
					icon: "mdi-account-group",
					field: "I want to go",
					value: (this.statistics["going_count"] === 0)
						? "No followers are attending yet"
						: (this.statistics["going_count"] === 1)
							? "One follower is attending"
							: `${this.statistics["going_count"]} followers are attending`
				},
				{
					icon: "mdi-clock",
					field: "Date-Time",
					value: this.event.start_date + " for " + this.event.duration + ` ${(this.event.duration > 1) ? "days" : "day"}`
				},
				{icon: "mdi-home", field: "Venue", value: this.event.venue},
				{
					icon: "mdi-earth",
					field: "Organizer",
					value: this.event.branch.name
				},
				{
					icon: "mdi-account-plus",
					field: "Registered by",
					value: this.event.created_by.username
				},
				{
					icon: "mdi-web", field: "Event Type", value: this.event.type
				}
			]
		}
	}
}
</script>
<style lang="sass" scoped>
.field-title
	font-size: .875rem
.about-event-list
	color: #3b3b3b !important
</style>
