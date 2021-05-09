<template>
	<v-card :loading="loading"
		class="ma-0 pa-0 elevation-0 rounded-0"
	>
		<div id="comment-toolbar">
			<v-toolbar
				dark
				height="50"
			>
				<v-toolbar-title style="font-size: 16px">
					Comments
				</v-toolbar-title>
			</v-toolbar>
		</div>
		<div class="ma-0 pa-0 scrollable-y-comments">
			<v-list v-if="comments.length > 0"
				two-line
			>
				<template v-for="(item, index) in comments">
					<v-subheader
						v-if="item.header"
						:key="index"
						v-text="item.header"
					/>

					<v-divider
						v-else-if="item.divider"
						:key="index"
						:inset="item.inset"
					/>

					<v-list-item
						v-else
						:key="index"
						class="pl-3 pr-1 comment-item"
					>
						<!--						<v-list-item-avatar>-->
						<!--							<v-img :src="item.avatar" />-->
						<!--						</v-list-item-avatar>-->

						<v-list-item-content>
							<v-list-item-title v-if="item.writer"
								class="d-flex justify-space-between align-items-center"
							>
								<code>{{ item.writer.username }}</code>
								<code>{{ item.created_at }}</code>
							</v-list-item-title>
							<v-list-item-subtitle class="comment">
								{{ item.comment }}
							</v-list-item-subtitle>
						</v-list-item-content>
						<v-list-item-action class="comment-actions">
							<v-btn icon>
								<v-icon
									color="red darken-1"
								>
									mdi-delete
								</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</template>
			</v-list>
			<div v-else
				class="fill-height empty-comment-message"
			>
				<i>Be the first to comment.</i>
			</div>
		</div>
	</v-card>
</template>
<script>
import $ from "jquery"

export default {
	name: "CommentsDetailComponent",
	props: {
		id: {
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
		comments: [],
		loading: false
	}),
	async created() {
		await this.init()
		this.$bus.on("refresh-comment-in-details-page", this.init)
	},
	beforeUnmount() {
		this.$bus.off("refresh-comment-in-details-page")
	},
	mounted() {
		this.calculateCommentBoxHeight()
	},
	methods: {
		async init() {
			this.loading = true
			let response
			if (this.isArticle) {
				response = await this.$store.dispatch("article/fetchComments", {id: this.id})
			} else {
				response = await this.$store.dispatch("multimedia/fetchComments", {id: this.id})
			}
			this.comments = response.data
			this.loading = false
		},
		calculateCommentBoxHeight() {
			const commentToolbarHeight = 50
			$(document).ready(function () {
				const commentPostBox = $("#post-comment-from-detail").css("height")
				const magicBoxHeight = $("#magic").height()
				const topSectionHeight = magicBoxHeight + commentToolbarHeight + parseInt(commentPostBox)
				$(".scrollable-y-comments").height($(window).height() - topSectionHeight)
			})
			$(window).resize(function () {
				const commentPostBox = $("#post-comment-from-detail").css("height")
				$(".scrollable-y-comments").height($(window).height() -
					$("#magic").height() - commentToolbarHeight - parseInt(commentPostBox))
			})
		}
	}
}
</script>
<style lang="sass" scoped>
.comment
	background-color: #d9ebfa
	border-radius: 10px
	padding: 10px 5px
	-webkit-line-clamp: unset !important
.comment-text-box
	background-color: #d2e4f5
	border-radius: 10px
	font-size: 14px
	padding: 5px
	text-align: justify
.scrollable-y-comments
	overflow-y: auto
::v-deep .v-subheader
	height: 15px
.wrap-text
	-webkit-line-clamp: unset !important
::v-deep.v-list-item__title
	white-space: normal
.empty-comment-message
	padding: 20px
	color: grey
</style>
