<template>
	<v-card
		v-if="target"
		:loading="loading"
		class="mx-auto"
	>
		<v-toolbar
			dark
			height="60"
			tile
		>
			<v-toolbar-title>
				{{ target.title }}
			</v-toolbar-title>
			<v-spacer />
			<v-btn
				fab
				dark
				x-small
				color="grey darken-3"
				@click="$router.push({name: 'HOME'})"
			>
				<v-icon>
					mdi-arrow-left-circle
				</v-icon>
			</v-btn>
		</v-toolbar>
		<v-snackbar
			v-model="snack"
			top
			right
			:timeout="3000"
			:color="snackColor"
			class="home-snack"
		>
			{{ snackText }}
		</v-snackbar>
		<v-row no-gutters>
			<v-col
				cols="12"
				xl="9"
				lg="9"
				md="8"
			>
				<slot name="media" />
			</v-col>
			<v-col
				cols="12"
				xl="3"
				lg="3"
				md="4"
			>
				<div id="magic">
					<div id="postDetail">
						<div class="py-2" />
						<v-card-title
							v-if="target['uploaded_by']"
							class="pt-0 grey--text text--darken-3 display-1"
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
				</div>
			</v-col>
			<v-col cols="12">
				<v-row
					id="post-comment-from-detail"
					justify="center"
					align="center"
					class="ma-0 pa-2 alice-blue"
				>
					<v-col cols="12">
						<slot name="comments" />
					</v-col>
					<v-col cols="12">
						<v-text-field
							v-model="comment.comment"
							class="comment mr-1"
							solo
							placeholder="Add a comment"
							hide-details="auto"
							clearable
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
				</v-row>
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
		},
		isArticle: {
			type: Boolean,
			required: false,
			default: false
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
			article: null,
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
			if (this.isArticle) {
				await this.$store.dispatch(
					"article/patch", {
						id: this.target.id,
						body: body
					}
				)
			} else {
				await this.$store.dispatch(
					"multimedia/patch", {
						id: this.target.id,
						body: body
					}
				)
			}
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
			if (this.isArticle) {
				this.comment.article = this.target.id
				delete this.comment.multimedia
			}
			else {
				this.comment.multimedia = this.target.id
				delete this.comment.article
			}
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
