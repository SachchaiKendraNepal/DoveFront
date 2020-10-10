<template>
	<v-card
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
				md="9"
				lg="9"
				sm="9"
				class="ma-0 pa-0"
			>
				<slot name="imageCarousel" />
				<slot name="videoCarousel" />
				<slot name="audios" />
			</v-col>
			<v-col
				cols="12"
				sm="3"
				md="3"
				lg="3"
				xl="3"
				class="ma-0 pa-0"
			>
				<div id="magic">
					<PostDetailAdminActionsComponent />
					<v-divider />
					<div id="postDetail">
						<v-card-title class="ma-0 pa-0 mx-4 pt-1">
							{{ target.title }}
							<span class="ml-2">
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
						</v-card-title>
						<v-card-text class="py-1">
							<span class="pr-1">
								<v-icon size="20">mdi-account-circle</v-icon>
							</span>
							<b class="pr-4">Author</b>&nbsp;:&nbsp;{{ target.uploaded_by }}
							<span>
								<v-icon size="20">mdi-calendar-plus</v-icon>
							</span>
							<span class="mx-1">{{ target.uploaded_at }}</span>
						</v-card-text>
						<v-card-text class="py-1">
							<span class="pr-1">
								<v-icon size="20">mdi-account-reactivate</v-icon>
							</span>
							<b>Approver</b>&nbsp;:&nbsp;{{ target.approved_by }}
							<span>
								<v-icon size="20">mdi-calendar-check</v-icon>
							</span>
							<span class="mx-1">{{ target.approved_at }}</span>
						</v-card-text>
					</div>
					<PostDetailActionsComponent />
					<v-divider />
				</div>
				<slot name="comments" />
				<v-row
					id="post-comment"
					justify="center"
					align="center"
					class="ma-0 pa-2 alice-blue"
				>
					<v-text-field
						class="comment mr-1"
						solo
						placeholder="Add a comment"
						hide-details="auto"
					/>
					<v-btn
						icon
						color="blue darken-3"
						class="font-weight-bold"
					>
						<v-icon>mdi-send</v-icon>
					</v-btn>
				</v-row>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
import PostDetailActionsComponent from "@/components/post/PostDetailActions"
import PostDetailAdminActionsComponent from "@/components/post/PostDetailAdminActions"
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
		loading: false,
		isFollower: false,
		isMember: true
	})
}
</script>
<style lang="sass" scoped>
.alice-blue
	background-color: aliceblue
.scrollable-y
	height: 150px
	overflow-y: auto
</style>
