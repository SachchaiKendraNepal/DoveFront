<template>
	<v-tab-item value="tab-discussion"
		transition="fade-transition"
		reverse-transition="fade-transition"
	>
		<v-card flat>
			<v-card-text class="why-idk">
				Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie malesuada. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada.s
			</v-card-text>
			<v-text-field
				v-model="myComment"
				class="ma-0 pa-4"
				outlined
				prepend-inner-icon="mdi-comment"
				clearable
				label="Add your comment..."
				hide-details="auto"
			>
				<template #append>
					<v-icon class="send-icon-button"
						color="primary"
						@click="makeComment"
					>
						mdi-send
					</v-icon>
				</template>
			</v-text-field>
			<v-card-text v-show="discussions.length === 0">
				No discussions made yet!
			</v-card-text>
			<v-list v-if="discussions.count > 0"
				three-line
			>
				<v-list-item v-for="(item, index) in discussions.results"
					:key="index"
				>
					<v-avatar size="48"
						:color="colors[index % 10]"
						class="d-flex justify-content-center ma-2"
					>
						<span class="white--text headline">{{ item.writer.username[0].toUpperCase() }}</span>
					</v-avatar>

					<v-list-item-content>
						<v-list-item-title style="white-space: normal;">
							<code>{{ item.writer.username }}</code>
							<span class="comment-date">{{ $moment(item.created_at).fromNow() }}</span>
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
			<v-list v-else
				three-line
			>
				<v-list-item>
					<v-list-item-content>
						<v-list-item-title class="grey--text darken-1">
							Be the first to add comment!
						</v-list-item-title>
						<v-list-item-subtitle class="grey--text">
							No discussions made yet.
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-card>
	</v-tab-item>
</template>
<script>
import {mapGetters} from "vuex";
import Snack from "@/mixins/Snack";

export default {
	name: "EventDetailDiscussionTabContent",
	mixins: [Snack],
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		loading: false,
		myComment: "",
		colors: [
			"#1F7087",
			"#731231",
			"#254f0d",
			"#6d190d",
			"#952175",
			"#64410d",
			"#952175",
			"#105414",
			"#60250f",
			"#10405f",
		],
	}),
	computed: {
		...mapGetters({
			discussions: "event/commentsList"
		})
	},
	methods: {
		async init() {
			this.loading = true
			await this.$store.dispatch("event/fetchCommentsFor", {id: this.event.id})
			this.loading = false
		},
		async makeComment() {
			if (this.myComment === null) return
			const posted = await this.$store.dispatch("event/addCommentFor", {
				id: this.event.id,
				comment: this.myComment
			})
			if (posted) {
				await this.openSnack("Comment posted successfully")
				await this.init()
			}
			else await this.openSnack("Comment post failed")
		}
	}
}
</script>
<style scoped lang="scss">
.comment {
	background-color: #d9ebfa;
	border-radius: 10px;
	padding: 10px 5px;
	-webkit-line-clamp: unset !important;
}
.comment-date {
	font-size: 10px;
	padding: 2px;
	margin: 2px;
	background: aliceblue;
	border-radius: 5px;
}
</style>
