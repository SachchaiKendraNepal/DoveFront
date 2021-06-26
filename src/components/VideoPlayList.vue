<template>
	<v-col
		v-if="nowPlaying"
		cols="12"
		class="ma-0 pa-0"
	>
		<v-card height="400">
			<video
				height="400"
				width="100%"
				controls
				crossorigin="anonymous"
				:src="nowPlaying"
			/>
		</v-card>
		<v-list>
			<v-list-item v-for="(video) in videos"
				:key="video.id"
				@click="1"
			>
				<v-list-item-avatar>
					<v-avatar color="purple lighten-3">
						<b><span class="white--text">{{ video.id }}</span></b>
					</v-avatar>
				</v-list-item-avatar>
				<v-list-item-content>
					<div class="video-list-name cursor"
						@click="nowPlaying = video.video"
					>
						{{ video.title }}
						<v-icon
							v-if="!(nowPlaying === video.video)"
							class="slight-up"
						>
							mdi-play
						</v-icon>
						<v-icon v-else
							color="green"
							class="slight-up"
						>
							mdi-play
						</v-icon>
					</div>
				</v-list-item-content>
				<v-list-item-action>
					<v-btn
						v-if="$helper.ifWriterIsCurrentUser(creator.username)"
						class="ma-2"
						fab
						x-small
						@click="openAdminDeleteItemDialog(video.id, 'uploaded-video')"
					>
						<v-icon color="error">
							mdi-delete
						</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>
		<admin-delete-item-dialog
			:model-name="modelName"
			:delete-action="deleteAction"
		/>
	</v-col>
</template>

<script>
import Snack from "@/mixins/Snack.js";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin.js";
export default {
	name: "VideoPlayList",
	mixins: [Snack, AdminTableDeleteItemMixin],
	props: {
		creator: {
			type: Object,
			required: true
		},
		videos: {
			type: Array,
			required: true
		},
		modelName: {
			type: String,
			required: true
		},
		deleteAction: {
			type: String,
			required: true
		}
	},
	data: () => ({
		nowPlaying: null,
	}),
	created() {
		if (this.videos.length > 0) {
			this.nowPlaying = this.videos[0].video
		}
	}
}
</script>
