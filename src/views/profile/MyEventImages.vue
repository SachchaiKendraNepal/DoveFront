<template>
	<v-card flat>
		<div class="py-2" />
		<event-form-dialog :fullscreen="false" />
		<v-btn block
			height="45"
			@click="$bus.emit('open-event-form-dialog-add-item')"
		>
			<v-icon>mdi-calender-plus</v-icon>
			add new event
		</v-btn>
		<v-card v-if="myEvents.length === 0">
			<v-chip>No events uploaded yet.</v-chip>
		</v-card>
		<v-row v-else
			no-gutters
		>
			<v-col
				v-for="event in myEvents"
				:key="event.id"
				cols="12"
			>
				<v-toolbar
					color="green lighten-4"
					height="40"
					class="my-4 elevation-2 rounded"
				>
					<v-app-bar-nav-icon>
						<v-avatar
							color="green lighten-2"
							size="30"
						>
							<span>{{ event.id }}</span>
						</v-avatar>
					</v-app-bar-nav-icon>
					<v-toolbar-title class="img-toolbar"
						@click="$router.push({name: 'EVENT DETAIL HOME', params: {id: event.id}})"
					>
						{{ event.title }}
					</v-toolbar-title>
					<v-spacer />
					<v-icon
						:color="(event.is_approved) ? 'green': 'error'"
					>
						{{ (event.is_approved) ? 'mdi-check-decagram': 'mdi-check-decagram-outline' }}
					</v-icon>
				</v-toolbar>
				<v-col v-if="event['images'].length === 0"
					cols="12"
				>
					<v-card class="mx-auto">
						<div class="d-flex justify-center align-center py-4">
							<v-chip>No images for this event</v-chip>
						</div>
					</v-card>
				</v-col>
				<v-row v-else
					no-gutters
				>
					<v-col
						v-for="img in event['multimedia_images']"
						:key="img.id"
						cols="12"
						xl="3"
						lg="3"
						md="4"
						sm="6"
						class="pa-1"
					>
						<card-image
							height="200"
							:src="img.image"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-card>
</template>

<script>
import CardImage from "@/components/multimedia/CardImage.vue";
import EventFormDialog from "@/views/event/EventFormDialog.vue";

export default {
	name: "MyEventImages",
	components: {EventFormDialog, CardImage},
	computed: {
		myEvents() {
			return this.$helper.getCurrentUser()["my_events"]
		}
	}
}
</script>

<style scoped>

</style>
