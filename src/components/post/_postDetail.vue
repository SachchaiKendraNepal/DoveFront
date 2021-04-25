<template>
	<v-card
		v-if="target"
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
					<PostDetailActionsComponent />
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
						class="comment mr-1"
						solo
						placeholder="Add a comment"
						hide-details="auto"
						clearable
					>
						<template #append>
							<v-icon class="send-icon-button"
								color="primary"
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
import PostDetailActionsComponent from "@/views/post/PostDetailActions"
import PostDetailAdminActionsComponent from "@/views/post/PostDetailAdminActions"
import IconWithTooltip from "@/components/IconWithTooltip"

export default {
	name: "BasePostDetailComponent",
	components: {
		IconWithTooltip,
		PostDetailAdminActionsComponent,
		PostDetailActionsComponent
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
		isFollower: false,
		isMember: true
	}),
	created() {
		console.log(this.target)
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
