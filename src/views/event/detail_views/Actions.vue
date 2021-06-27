<template>
	<v-col cols="12">
		<v-card flat
			max-width="1000"
			color="transparent"
			class="d-flex justify-center align-center flex-wrap mx-auto"
		>
			<v-card-actions>
				<v-btn
					:loading="interestedLoading"
					depressed
					@click="toggleInterestedStatus"
				>
					<v-icon small
						color="purple"
						class="px-1"
					>
						mdi-star-circle
					</v-icon>
					<span v-if="statistics['interested']"
						class="button-span red--text text--lighten-1 event-action-btn-text"
					>Remove Interest</span>
					<span v-else
						class="purple--text event-action-btn-text"
					>Add Interest</span>
				</v-btn>
			</v-card-actions>
			<v-card-actions>
				<v-btn
					:loading="approvalLoading"
					depressed
					@click="toggleApproval"
				>
					<v-icon
						class="px-1"
						color="green"
						small
					>
						mdi-check-circle
					</v-icon>
					<span
						v-if="event.is_approved"
						class="event-action-btn-text red--text text--lighten-1"
					>Dis-approve</span>
					<span
						v-else
						class="event-action-btn-text green--text text-darken-2"
					>Approve</span>
				</v-btn>
			</v-card-actions>
			<v-card-actions>
				<v-btn
					:loading="goingLoading"
					depressed
					@click="toggleGoingStatus"
				>
					<v-icon
						color="indigo"
						small
					>
						mdi-walk
					</v-icon>
					<span v-if="statistics['going']"
						class="button-span red--text text--lighten-1 event-action-btn-text"
					>Not Going</span>
					<span v-else
						class="indigo--text event-action-btn-text"
					>I Am Going</span>
				</v-btn>
			</v-card-actions>
			<v-spacer />
			<v-card-actions>
				<v-tooltip bottom>
					<template #activator="{ on, attrs }">
						<v-btn icon v-bind="attrs"
							v-on="on"
						>
							<v-icon color="red darken-2">
								mdi-delete
							</v-icon>
						</v-btn>
					</template>
					<span>Delete Event</span>
				</v-tooltip>
			</v-card-actions>
		</v-card>
	</v-col>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "Actions",
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		interestedLoading: false,
		goingLoading: false,
		approvalLoading: false,
	}),
	computed: {
		...mapGetters({
			statistics: "event/statisticsDetail",
		})
	},
	methods: {
		async toggleInterestedStatus() {
			this.interestedLoading = true
			const toggled = await this.$store.dispatch("event/toggleInterestedStatus", {id: this.event.id})
			if (toggled) await this.$store.dispatch("event/fetchStatistics", { id: this.$route.params.id})
			else await this.openSnack("Added interest to event failed.")
			this.interestedLoading = false
		},
		async toggleGoingStatus() {
			this.goingLoading = true
			const toggled = await this.$store.dispatch("event/toggleGoingStatus", {id: this.event.id})
			if (toggled) await this.$store.dispatch("event/fetchStatistics", { id: this.$route.params.id})
			else await this.openSnack("Added interest to event failed.")
			this.goingLoading = false
		},
		async toggleApproval() {
			this.approvalLoading = true
			const toggled = await this.$store.dispatch("event/toggleApproval", {id: this.event.id})
			if (toggled) await this.$store.dispatch("event/fetchSingle", { id: this.$route.params.id})
			else await this.openSnack("Added interest to event failed.")
			this.approvalLoading = false
		},
	}
}
</script>

<style scoped>

</style>
