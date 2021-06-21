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
					v-if="!extraStatus.loved"
					depressed
					small
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
					@click="setLove"
				>
					<v-icon>
						mdi-heart-outline
					</v-icon>
				</v-btn>
				<v-btn
					v-else
					depressed
					small
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
					@click="revokeLove"
				>
					<v-icon>
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
					v-if="extraStatus.bookmarked"
					small
					depressed
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
					@click="removeBookmark"
				>
					<v-icon>
						mdi-bookmark
					</v-icon>
				</v-btn>
				<v-btn
					v-else
					small
					depressed
					class="ma-2 py-6"
					v-bind="attrs"
					v-on="on"
					@click="setBookmark"
				>
					<v-icon>
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
			this.extraStatus = await this.$store.dispatch(
				"multimedia/fetchMyStatus",
				{ id: postId }
			)
		},
		async performAction(action) {
			await this.$store.dispatch(`multimedia/${action}`, {id: this.target.id})
			await this.init()
		},
		async deletePost() {
			if(this.$helper.ifWriterIsCurrentUser(this.target["uploaded_by"]["username"])) {
				this.openAdminDeleteItemDialog(this.target.id, this.target.title, "multimedia/delete")
			}
			else await this.openSnack("You are not allowed to perform this action")
		},
		async setBookmark() {
			await this.performAction("setBookmark")
		},
		async removeBookmark() {
			await this.performAction("removeBookmark")
		},
		async setLove() {
			await this.performAction("setLove")
		},
		async revokeLove() {
			await this.performAction("revokeLove")
		},
	}
}
</script>
