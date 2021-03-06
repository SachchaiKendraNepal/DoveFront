<template>
	<v-card flat
		class="event-tab"
	>
		<v-dialog
			v-model="updateCommentDialog"
			max-width="600"
		>
			<v-card dark
				class="mx-auto"
			>
				<v-textarea
					v-model="commentToUpdate"
					auto-grow
					solo
					hide-details
				>
					<template #append>
						<v-btn icon
							small class="send-icon-button"
							color="primary"
							@click="updateComment"
						>
							<v-icon>mdi-send</v-icon>
						</v-btn>
					</template>
				</v-textarea>
			</v-card>
		</v-dialog>
		<div class="pa-2">
			<v-text-field
				v-model="myComment"
				class="pa-4"
				solo
				background-color="transparent"
				prepend-inner-icon="mdi-comment"
				clearable
				label="Add your comment..."
				hide-details="auto"
			>
				<template #append>
					<v-icon class="send-icon-button"
						color="primary"
						@click="makeComment"
					>
						mdi-send
					</v-icon>
				</template>
			</v-text-field>
		</div>
		<v-list
			v-if="discussions.count > 0"
			color="transparent"
			three-line
		>
			<v-list-item v-for="(item, index) in discussions.results"
				:key="index"
			>
				<v-avatar size="48"
					class="d-flex justify-content-center ma-2"
				>
					<span class="white--text headline">{{ $helper.getCurrentUserInitials(item.writer) }}</span>
				</v-avatar>

				<v-list-item-content>
					<v-list-item-title style="white-space: normal;">
						<code>{{ item.writer.username }}</code>
						<span class="comment-date">{{ $moment(item.created_at).fromNow() }}</span>
						<span v-if="$helper.ifWriterIsCurrentUser(item.writer.username)"><v-icon x-small
							color="primary"
							@click="openUpdateComment(item.comment, item.id)"
						>mdi-pencil</v-icon></span>
					</v-list-item-title>
					<v-list-item-subtitle class="comment">
						{{ item.comment }}
					</v-list-item-subtitle>
				</v-list-item-content>
				<v-list-item-action
					v-if="$helper.ifWriterIsCurrentUser(item.writer.username)"
					class="ma-0 mt-7"
				>
					<v-btn icon>
						<v-icon color="red lighten-1">
							mdi-delete
						</v-icon>
					</v-btn>
				</v-list-item-action>
			</v-list-item>
		</v-list>
		<v-list
			v-else
			three-line
			style="background-color: aliceblue;"
		>
			<v-list-item>
				<v-list-item-content>
					<v-list-item-title class="grey--text darken-1">
						Be the first to add comment!
					</v-list-item-title>
					<v-list-item-subtitle class="grey--text">
						No discussions made yet.
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";
import Snack from "@/mixins/Snack";

export default {
	name: "EventDiscussion",
	mixins: [Snack],
	data: () => ({
		loading: false,
		updateCommentDialog: false,
		commentToUpdate: null,
		commentIdToUpdate: null,
		myComment: ""
	}),
	computed: {
		...mapGetters({
			event: "event/detail",
			discussions: "event/commentsList"
		})
	},
	methods: {
		async init() {
			this.loading = true
			await this.$store.dispatch("event/fetchCommentsFor", {id: this.event.id})
			this.loading = false
		},
		async makeComment() {
			if (this.myComment === null) return
			const posted = await this.$store.dispatch("event/addCommentFor", {
				body: {
					event: this.event.id,
					comment: this.myComment
				}
			})
			if (posted) {
				await this.init()
			}
			else await this.openSnack("Comment post failed")
		},
		async updateComment() {
			if (this.commentToUpdate === null) return
			const posted = await this.$store.dispatch("event/updateComment", {
				id: this.commentIdToUpdate,
				body: {
					comment: this.commentToUpdate
				}
			})
			if (posted) {
				this.commentToUpdate = null
				this.commentIdToUpdate = null
				this.updateCommentDialog = false
				await this.init()
			}
			else await this.openSnack("Comment post failed")
		},
		async openUpdateComment(commentText, commentId) {
			this.updateCommentDialog = true
			this.commentToUpdate = commentText
			this.commentIdToUpdate = commentId
		}
	}
}
</script>
<style scoped lang="scss">
.comment {
	background-color: #e6bdfc;
	border-radius: 10px;
	padding: 10px;
	-webkit-line-clamp: unset !important;
}
.comment-date {
	font-size: 10px;
	padding: 2px;
	margin: 2px;
	background: aliceblue;
	border-radius: 5px;
}
</style>
