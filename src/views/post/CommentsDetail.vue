<template>
	<div>
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
			<v-list two-line>
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
						<v-list-item-avatar>
							<v-img :src="item.avatar" />
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title>{{ item.writer }}</v-list-item-title>
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
		</div>
	</div>
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
		comments: [
			{ header: "Today" },
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
				writer: "K.P. Oli",
				comment: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" +
					"I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" +
					"I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
			},
			{ divider: true, inset: true },
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
				writer: "Summer BBQ",
				comment: "Wish I could come, but I'm out of town this weekend.",
			},
			{ divider: true, inset: true },
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
				writer: "Oui oui",
				comment: "Do you have Paris recommendations? Have you ever been?",
			},
			{ divider: true, inset: true },
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
				writer: "Kiran Parajuli",
				comment: "Have any ideas about what we should get Heidi for her birthday?",
			},
			{ divider: true, inset: true },
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
				writer: "Lionel Messi",
				comment: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
			},
			{ divider: true, inset: true },
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
				writer: "Elon Musk",
				comment: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
			},
			{ divider: true, inset: true },
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
				writer: "John Doe",
				comment: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
			},
		]
	}),
	mounted() {
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
</style>
