<template>
	<v-card min-height="85vh"
		flat
	>
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
		<v-row no-gutters>
			<v-col v-for="event in myEvents"
				:key="event.id"
				cols="12"
			>
				<event-home-card :event="event" />
			</v-col>
		</v-row>
	</v-card>
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

