<template>
	<v-card
		v-if="target"
		:loading="loading"
		class="mx-auto"
	>
		<v-btn
			id="go-back"
			fab
			dark
			fixed
			top
			left
			small
			color="primary"
			@click="$router.go(-1)"
		>
			<v-icon>
				mdi-arrow-left-circle
			</v-icon>
		</v-btn>
		<v-row class="ma-0 pa-0">
			<v-col
				cols="12"
				xl="9"
				lg="9"
				md="8"
				class="ma-0 pa-0"
			>
				<slot name="imageCarousel" />
				<slot name="videoCarousel" />
				<slot name="audios" />
			</v-col>
			<v-col
				cols="12"
				xl="3"
				lg="3"
				md="4"
				class="ma-0 pa-0"
			>
				<div id="magic">
					<PostDetailAdminActionsComponent />
					<v-divider />
					<div id="postDetail">
						<v-card-title class="pt-0 grey--text text--darken-3">
							{{ target.title }}
						</v-card-title>
						<v-card-subtitle class="post-auth-subtitle">
							<span>
								<v-icon size="16"
									class="post-auth-icon"
								>mdi-account-circle</v-icon>
							</span>
							<span v-if="target.uploaded_by">{{ target.uploaded_by.username }}</span>
							<span>
								<v-icon size="16"
									class="post-auth-icon"
								>mdi-calendar-plus</v-icon>
							</span>
							{{ target.uploaded_at }}
							<span>
								<v-icon size="16"
									class="post-auth-icon"
								>mdi-calendar-check</v-icon>
							</span>
							{{ target.approved_at }}
						</v-card-subtitle>
						<v-card-text v-if="target.description"
							class="py-0"
						>
							{{ target.description.substr(0,120) }}
						</v-card-text>
						<v-card-text class="py-0">
							<span>
								<IconWithTooltip
									icon="mdi-check-decagram"
									color="green darken-1"
									tooltip="Approved"
								/>
								<IconWithTooltip
									v-if="isFollower"
									icon="mdi-account-music"
									color="blue darken-1"
									tooltip="Follower"
								/>
								<IconWithTooltip
									v-if="isMember"
									icon="mdi-account-network"
									color="blue darken-1"
									tooltip="Member"
								/>
								<IconWithTooltip
									icon="mdi-post"
									color="orange darken-3"
									tooltip="Article"
								/>
							</span>
						</v-card-text>
					</div>
					<PostDetailActionsComponent v-if="target" :target="target"
						:is-article="isArticle"
					/>
					<v-divider />
				</div>
				<slot name="comments" />
				<v-row
					id="post-comment-from-detail"
					justify="center"
					align="center"
					class="ma-0 pa-2 alice-blue"
				>
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
		PostDetailAdminActionsComponent: () => import("@/views/post/PostDetailAdminActions"),
		PostDetailActionsComponent: () => import("@/views/post/PostDetailActions")
	},
	props: {
		targetId: {
			type: Number,
			required: true
		},
		isArticle: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	data: () => ({
		target: null,
		loading: false,
		isFollower: false,
		isMember: true,
		comment: {
			comment: null,
			article: null,
			multimedia: null
		}
	}),
	computed: {
		... mapGetters({
			article: "article/articleDetail",
			multimedia: "multimedia/multimediaDetail",
		})
	},
	async created() {
		await this.init()
	},
	methods: {
		async init() {
			this.loading=true
			if (this.isArticle) {
				await this.$store.dispatch("article/getSingle", {id: this.targetId})
				this.target=this.article
			}
			else {
				await this.$store.dispatch("multimedia/getSingle", {id: this.targetId})
				this.target=this.multimedia
			}
			this.loading=false
		},
		async addCommentToPost() {
			if (this.isArticle) {
				this.comment.article = this.targetId
			}
			else {
				this.comment.multimedia = this.targetId
				delete this.comment.article
			}
			await this.$store.dispatch("article/postComment", {body: this.comment})
			this.$bus.emit("refresh-comment-in-details-page")
			this.comment.comment = ""
		}
	}
}
</script>
<style lang="sass" scoped>
.alice-blue
	background-color: aliceblue
.scrollable-y
	height: 150px
	overflow-y: auto
.post-auth-icon
	margin-top: -2px
.post-auth-subtitle
	font-size: 12px
	padding-bottom: 5px
.send-icon-button
	transform: rotate(-60deg)
</style>
