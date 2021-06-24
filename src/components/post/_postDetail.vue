<template>
	<v-card
		v-if="target"
		tile
		flat
		:loading="loading"
		class="mx-auto"
	>
		<v-row no-gutters>
			<v-col cols="12">
				<slot name="media" />
			</v-col>
			<v-col cols="12">
				<div id="postDetail">
					<div class="py-2" />
					<v-card-title
						v-if="target['uploaded_by']"
						class="pt-0 white--text display-1"
					>
						<div>
							{{ target.title }}
							<v-btn icon
								@click="openUpdateName"
							>
								<v-icon v-if="ifWriterIsCurrentUser"
									size="22"
									color="primary"
								>
									mdi-pencil
								</v-icon>
							</v-btn>
						</div>
					</v-card-title>
					<v-slide-y-transition>
						<v-text-field
							v-if="showTitleUpdate"
							v-model="titleToUpdate"
							class="px-2"
							counter="255"
							solo
							prepend-inner-icon="mdi-text"
						>
							<template #append>
								<v-btn
									class="send-icon-button"
									color="indigo"
									icon
									x-small
									@click="updateName"
								>
									<v-icon>
										mdi-send
									</v-icon>
								</v-btn>
							</template>
						</v-text-field>
					</v-slide-y-transition>
					<v-divider />
					<v-card-subtitle class="post-auth-subtitle">
						<span>
							<v-icon size="16"
								color="primary"
								class="post-auth-icon pr-1"
							>mdi-account-circle</v-icon>
						</span>
						<span v-if="target['uploaded_by']">{{ writer }}</span>
						<span>
							<v-icon size="16"
								color="teal"
								class="post-auth-icon pl-1"
							>mdi-calendar-plus</v-icon>
						</span>
						{{ formatDate(target['timestamp']) }}
						<span>
							<v-icon size="16"
								color="green"
								class="post-auth-icon"
							>mdi-calendar-check</v-icon>
						</span>
						{{ formatDate(target.approved_at) }}
					</v-card-subtitle>
					<v-card-text v-if="target.description"
						class="py-0 pb-2"
					>
						{{ target.description }}
						<span><v-btn
							x-small
							color="primary"
							icon
							@click="openUpdateDescription"
						><v-icon>mdi-pencil</v-icon></v-btn></span>
					</v-card-text>
					<v-slide-y-transition>
						<v-textarea
							v-if="showDescriptionUpdate"
							v-model="descriptionUpdate"
							class="mx-3"
							counter="10000"
							auto-grow solo
							prepend-inner-icon="mdi-text"
						>
							<template #append>
								<v-btn icon
									class="send-icon-button"
									color="indigo"
									x-small
									@click="updateDescription"
								>
									<v-icon>
										mdi-send
									</v-icon>
								</v-btn>
							</template>
						</v-textarea>
					</v-slide-y-transition>
					<v-divider />
					<v-card-text class="py-6 d-flex justify-center align-center">
						<span>
							<IconWithTooltip
								class="px-2"
								icon="mdi-check-decagram"
								:color="(target.is_approved) ? 'green darken-1' : 'grey darken-1'"
								tooltip="Approved"
							/>
							<IconWithTooltip
								class="px-2"
								icon="mdi-account-music"
								color="blue darken-1"
								tooltip="Follower"
							/>
							<IconWithTooltip
								v-if="ifWriterIsMember"
								class="px-1"
								icon="mdi-account-network"
								color="blue darken-1"
								tooltip="Member"
							/>
							<IconWithTooltip
								class="px-2"
								icon="mdi-video"
								color="orange darken-3"
								tooltip="Multimedia"
							/>
						</span>
					</v-card-text>
					<v-divider />
				</div>
				<PostDetailActionsComponent
					v-if="target" :target="target"
				/>
				<v-divider />
			</v-col>
			<v-col cols="12">
				<div class="py-12" />
			</v-col>
			<v-col cols="12">
				<slot name="comments" />
			</v-col>
			<v-col cols="12">
				<div class="py-4" />
			</v-col>
			<v-col cols="12">
				<v-text-field
					v-model="comment.comment"
					class="comment"
					filled
					placeholder="Add a comment"
					hide-details="auto"
					clearable
					prepend-inner-icon="mdi-comment"
				>
					<template #append>
						<v-icon class="send-icon-button"
							color="primary"
							@click="addCommentToPost"
						>
							mdi-send
						</v-icon>
					</template>
				</v-text-field>
			</v-col>
			<v-col cols="12">
				<div class="py-12" />
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";

export default {
	name: "BasePostDetailComponent",
	components: {
		IconWithTooltip: () => import("@/components/IconWithTooltip"),
		PostDetailActionsComponent: () => import("@/views/post/PostDetailActions")
	},
	props: {
		target: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		loading: false,
		isFollower: false,
		isMember: true,
		showTitleUpdate: false,
		showDescriptionUpdate: false,
		comment: {
			comment: null,
			multimedia: null
		},
		titleToUpdate: null,
		descriptionUpdate: null,
	}),
	computed: {
		...mapGetters({
			snackText: "snack/snackText",
			snackColor: "snack/snackColor"
		}),
		snack: {
			get() {
				return this.$store.state.snack.snack
			},
			set(v) {
				this.$store.dispatch("snack/setSnackState", v)
			}
		},
		ifWriterIsCurrentUser() {
			return this.$helper.getCurrentUser().username === this.target["uploaded_by"]["username"]
		},
		writer() {
			return this.target["uploaded_by"]["username"]
		},
		ifWriterIsMember() {
			const writer = this.target["uploaded_by"]
			return writer.member !== null
		}
	},
	created() {
		this.titleToUpdate = this.target.title
		this.descriptionUpdate = this.target.description
	},
	methods: {
		openUpdateName() {
			this.showTitleUpdate = !this.showTitleUpdate
			this.titleToUpdate = this.target.title
		},
		openUpdateDescription() {
			this.showDescriptionUpdate = !this.showDescriptionUpdate
			this.descriptionUpdate = this.target.description
		},
		async updatePost(body) {
			await this.$store.dispatch(
				"multimedia/patch", {
					id: this.target.id,
					body: body
				}
			)
		},
		async updateName() {
			await this.updatePost({ title: this.titleToUpdate })
			this.showTitleUpdate = false
		},
		async updateDescription() {
			await this.updatePost({ description: this.descriptionUpdate })
			this.showDescriptionUpdate = false
		},
		formatDate(date) {
			return this.$moment(date).format("MMMM Do YYYY")
		},
		async addCommentToPost() {
			this.comment.multimedia = this.target.id
			await this.$store.dispatch("post/postComment", {body: this.comment})
			this.$bus.emit("refresh-comment-in-details-page")
			this.comment.comment = ""
		}
	}
}
</script>
<style lang="sass" scoped>
.alice-blue
	background-color: aliceblue
.post-auth-icon
	margin-top: -2px
.post-auth-subtitle
	font-size: 12px
	padding-bottom: 5px
#go-back
	top: 80px
	left: 1%
.edit-icon
	margin-top: -6px
	padding: 0 4px 0 10px
</style>
