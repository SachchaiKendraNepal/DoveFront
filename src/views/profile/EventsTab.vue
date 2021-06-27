<template>
	<div>
		<v-col
			cols="12"
			class="px-0"
		>
			<v-sheet
				elevation="10"
				class="py-4 pl-4 pr-1 rounded"
			>
				<v-chip-group
					multiple
					active-class="primary--text"
				>
					<v-chip
						v-for="tag in tags"
						:key="tag"
					>
						{{ tag }}
					</v-chip>
				</v-chip-group>
			</v-sheet>
		</v-col>
		<profile-no-content
			v-if="myEvents.length === 0"
			:text="noContentText"
		/>
		<v-row v-else
			no-gutters
		>
			<v-col v-for="event in myEvents"
				:key="event.id"
				cols="12"
			>
				<event-home-card :event="event" />
			</v-col>
		</v-row>
	</div>
</template>
<script>
import EventHomeCard from "@/views/event/EventHomeCard.vue";
export default {
	name: "ProfilePostsTabView",
	components: {
		EventHomeCard
	},
	data: () => ({
		loading: false,
		tags: [
			"Satsang",
			"General Meetings",
			"Kendra Meetings"
		],
		noContentText: "You do not have added event yet."
	}),
	computed: {
		myEvents() {
			return this.$helper.getCurrentUser()["my_events"]
		}
	}

}
</script>
<style lang="sass" scoped>
</style>

