<template>
	<v-col
		v-if="nowPlaying"
		cols="12"
		class="ma-0 pa-0"
	>
		<v-card height="400">
			<youtube-iframe :video-url="nowPlaying"
				height="400"
			/>
		</v-card>
		<v-list>
			<v-list-item v-for="(videoUrl) in videoUrls"
				:key="videoUrl.id"
				@click="1"
			>
				<v-list-item-avatar tile>
					<v-img class="thumbnail-radius"
						:src="videoUrl['yt_info']['thumbnail_url']"
					/>
				</v-list-item-avatar>
				<v-list-item-content>
					<div class="video-list-name cursor"
						@click="nowPlaying = videoUrl.video_url"
					>
						{{ videoUrl['yt_info']['title'] }}
						<v-icon v-if="!(nowPlaying === videoUrl.video_url)"
							class="slight-up"
						>
							mdi-play
						</v-icon>
						<v-icon
							v-else
							class="slight-up"
							color="green"
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
						@click="openAdminDeleteItemDialog(videoUrl.id, videoUrl['yt_info']['title'])"
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
			@reload="$emit('reload')"
		/>
	</v-col>
</template>

<script>
import Snack from "@/mixins/Snack.js";
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin.js";

export default {
	name: "YoutubePlayList",
	components: {
		YoutubeIframe: () => import("@/components/multimedia/YoutubeIframe.vue")
	},
	mixins: [Snack, AdminTableDeleteItemMixin],
	props: {
		creator: {
			type: Object,
			required: true
		},
		videoUrls: {
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
	emits: ["reload"],
	data() {
		return {
			nowPlaying: null,
			titleArray: [],
		}
	},
	created() {
		if (this.videoUrls.length > 0) {
			this.nowPlaying = this.videoUrls[0].video_url
		}
	}
}
</script>

<style scoped>
.thumbnail-radius {
	border-radius: 5px;
}
</style>
