<template>
	<v-card
		:loading="loading"
		class="mx-auto my-12"
		max-width="1000"
		min-height="800"
	>
		<v-row class="ma-0 pa-0">
			<v-col
				cols="12"
				xl="7"
				md="7"
				lg="7"
				sm="7"
				class="ma-0 pa-0"
			>
				<slot name="imageCarousel" />
				<slot name="videoCarousel" />
				<slot name="audios" />
				<PostDetailActionsComponent />
				<v-divider />
				<v-row
					align="center"
					class="mx-0 pt-3 pb-4 px-2 alice-blue"
				>
					<v-text-field
						class="comment mb-2"
						solo
						placeholder="Add a comment"
						hide-details="auto"
					/>
					<v-btn
						text
						color="blue darken-3"
						class="font-weight-bold"
					>
						Post
					</v-btn>
				</v-row>
				<v-divider />
				<PostDetailAdminActionsComponent />
			</v-col>
			<v-col
				cols="12"
				sm="5"
				md="5"
				lg="5"
				xl="5"
				class="ma-0 pa-0"
			>
				<v-card-title class="pb-0">
					{{ target.title }}
					<span class="ml-2">
						<IconWithTooltip
							icon="mdi-check-decagram"
							color="green darken-1"
							tooltip="Approved"
						/>
						<IconWithTooltip
							icon="mdi-account-music"
							color="blue darken-1"
							tooltip="Follower"
						/>
						<IconWithTooltip
							icon="mdi-account-network"
							color="blue darken-1"
							tooltip="Member"
						/>
						<IconWithTooltip
							icon="mdi-post"
							color="red darken-2"
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
				<v-divider />
				<v-card-text class="scrollable-y">
					<b>DESCRIPTION:</b>
					{{ target.description }}
				</v-card-text>
				<v-divider />
				<slot name="comments" />
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
		loading: false
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
