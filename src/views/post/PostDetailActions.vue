<template>
	<v-row
		v-if="target['uploaded_by']"
		id="post-admin-action"
		no-gutters
		align="center"
		justify="space-around"
	>
		<v-tooltip
			bottom
		>
			<template #activator="{ on, attrs }">
				<v-btn
					depressed
					small
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
					@click="togglePostLoveStatus"
				>
					<v-icon v-if="!extraStatus.loved">
						mdi-heart-outline
					</v-icon>
					<v-icon v-else>
						mdi-heart
					</v-icon>
				</v-btn>
			</template>
			<span>Love</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template #activator="{ on, attrs }">
				<v-btn
					depressed
					small
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
				>
					<v-icon>
						mdi-comment-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Comment</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template #activator="{on, attrs}">
				<v-btn depressed
					small
					v-bind="attrs"
					class="ma-2 py-6"
					v-on="on"
				>
					<v-icon>
						mdi-share-variant-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Share</span>
		</v-tooltip>
		<v-tooltip bottom>
			<template #activator="{on, attrs}">
				<v-btn
					v-if="$helper.ifWriterIsCurrentUser(target['uploaded_by']['username'])"
					depressed
					small
					v-bind="attrs"
					class="ma-2 py-6"
					v-on="on"
					@click="deletePost"
				>
					<v-icon>
						mdi-delete-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Delete</span>
		</v-tooltip>
		<v-tooltip
			bottom
		>
			<template #activator="{on, attrs}">
				<v-btn
					small
					depressed
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
					@click="toggleBookmarkStatus"
				>
					<v-icon v-if="extraStatus.bookmarked">
						mdi-bookmark
					</v-icon>
					<v-icon v-else>
						mdi-bookmark-outline
					</v-icon>
				</v-btn>
			</template>
			<span>Bookmark</span>
		</v-tooltip>
		<admin-delete-item-dialog model-name="post" />
	</v-row>
</template>
<script>
import AdminTableDeleteItemMixin from "@/mixins/AdminTableDeleteItemMixin";
import Snack from "@/mixins/Snack";

export default {
	name: "PostDetailActionsComponent",
	mixins: [AdminTableDeleteItemMixin, Snack],
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
	data() {
		return {
			extraStatus: {
				loved: null,
				bookmarked: null,
				love_count: null
			},
			mixinData: {}
		}
	},
	async created() {
		this.$bus.on("route-to-feeds", async () => await this.$router.push({name: "HOME"}))
		await this.init()
	},
	beforeUnmount() {
		this.$bus.off("route-to-feeds")
	},
	methods: {
		async init() {
			const postId = this.$route.params.id
			const actionText = (this.isArticle) ? "article" : "multimedia"
			this.extraStatus = await this.$store.dispatch(`${actionText}/fetchExtraStatus`, {id: postId})
		},
		async togglePostLoveStatus() {
			const actionText = (this.isArticle) ? "article" : "multimedia"
			await this.$store.dispatch(`${actionText}/toggleLoveStatus`, {id: this.target.id})
			await this.init()
		},
		async deletePost() {
			if(this.$helper.ifWriterIsCurrentUser(this.target["uploaded_by"]["username"])) {
				const deleteAction = (this.isArticle) ? "article/delete" : "multimedia/delete"
				this.openAdminDeleteItemDialog(this.target.id, this.target.title, deleteAction)
			}
			else await this.openSnack("You are not allowed to perform this action")
		},
		async toggleBookmarkStatus() {
			const actionText = (this.isArticle) ? "article" : "multimedia"
			await this.$store.dispatch(`${actionText}/toggleBookmarkStatus`, {id: this.target.id})
			await this.init()
		},
	}
}
</script>
