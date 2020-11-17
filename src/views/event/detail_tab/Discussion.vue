<template>
	<v-tab-item value="tab-discussion">
		<v-card flat>
			<v-text-field
				v-model="myComment"
				class="ma-0 pa-4"
				outlined
				prepend-inner-icon="mdi-comment"
				clearable
				label="Add your comment..."
				hide-details="auto"
				append-outer-icon="mdi-send"
				@click:append-outer="makeComment"
			/>
			<v-card-text v-show="discussions.length === 0">
				No discussions made yet!
			</v-card-text>
			<v-list three-line>
				<v-list-item v-for="(item, index) in discussions"
					:key="index"
				>
					<v-list-item-avatar>
						<v-img :src="item.avatar" />
					</v-list-item-avatar>

					<v-list-item-content>
						<v-list-item-title style="white-space: normal;">
							{{ item.author }}
							- <span class="comment-date">{{ item.date }}</span>
						</v-list-item-title>
						<v-list-item-subtitle class="comment">
							{{ item.comment }}
						</v-list-item-subtitle>
					</v-list-item-content>
					<v-list-item-action class="ma-0 mt-7">
						<v-btn icon>
							<v-icon color="red lighten-1">
								mdi-delete
							</v-icon>
						</v-btn>
					</v-list-item-action>
				</v-list-item>
			</v-list>
		</v-card>
	</v-tab-item>
</template>
<script>
export default {
	name: "EventDetailDiscussionTabContent",
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		myComment: "",
		discussions: [
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
				author: "Ali Connors",
				comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
				date: "Nov 2, 2020"
			},
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
				author: "Alex, Scott," +
					" Jennifer", comment: "Wish I could come, but I'm out of town this weekend.",
				date: "Nov 2, 2020"
			},
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
				author: "Sandra Adams",
				comment: "Do you have Paris recommendations? Have you ever been?",
				date: "Nov 2, 2020"
			},
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
				author: "Trevor Hansen",
				comment: "Have any ideas about what we should get Heidi for her birthday?",
				date: "Nov 2, 2020"
			},
			{
				avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
				author: "Britta Holt",
				comment: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
				date: "Nov 2, 2020"
			},
		]
	}),
	methods: {
		makeComment() {
			if (this.myComment === null) return
			console.log(this.myComment)
		}
	}
}
</script>
<style scoped lang="sass">
.comment
	background-color: #d9ebfa
	border-radius: 10px
	padding: 10px 5px
	-webkit-line-clamp: unset !important
</style>
