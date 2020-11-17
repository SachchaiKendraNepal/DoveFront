<template>
	<div id="event-detail-container">
		<v-dialog
			v-model="fullScreenDialog"
			max-width="90vw"
			max-height="90vh"
		>
			<v-row class="ma-0 pa-0"
				justify="center" align="center"
			>
				<v-col cols="12">
					<v-img :src="selectedImage"
						max-width="100%"
						max-height="80vh"
						@click.stop="closeImageDialog"
					/>
				</v-col>
			</v-row>
		</v-dialog>
		<v-row id="event-top-row"
			class="ma-0 pa-0"
		>
			<v-col
				id="cover-column"
				cols="12"
				class="pa-0"
			>
				<v-img
					id="event-banner"
					src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
					height="300"
					max-width="1000"
					class="mx-auto"
				/>
			</v-col>
			<v-col
				id="date-row"
				cols="12"
				class="pa-0"
			>
				<v-card
					id="date-peek-box"
					width="100"
					height="100"
					class="mx-auto"
				>
					<v-card color="red"
						height="25"
					>
						<v-card-text class="date-month">
							Nov
						</v-card-text>
					</v-card>
					<v-card-text class="text-center display-3 pa-0 pt-1 text--darken-3 blue--text">
						<b>15</b>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col cols="12"
				class="pa-0"
			>
				<v-card
					class="mx-auto"
					max-width="1000"
					flat
					color="transparent"
				>
					<v-card-title class="event-title">
						{{ event.title }}
					</v-card-title>
					<v-card-subtitle class="event-subtitle">
						{{ event.start_date }} ●
						{{ event.timeOfDay }} ●
						{{ event.duration }} days ●
						{{ event.venue }}
					</v-card-subtitle>
					<div class="d-flex justify-space-between pl-3 py-3">
						<v-chip color="pink lighten-4">
							<v-icon color="pink"
								left
							>
								mdi-hand-heart
							</v-icon>
							<b>Satsang</b>
						</v-chip>
						<v-chip color="blue-grey lighten-3">
							<v-icon color="blue-grey"
								left
							>
								mdi-star-circle
							</v-icon>
							<b>Interested</b>
						</v-chip>
						<v-chip color="green lighten-3">
							<v-icon color="green"
								left
							>
								mdi-check-circle
							</v-icon>
							<b>Approve</b>
						</v-chip>
						<v-chip color="indigo lighten-3">
							<v-icon color="indigo"
								left
							>
								mdi-walk
							</v-icon>
							<b>Going</b>
						</v-chip>
						<v-tooltip bottom>
							<template #activator="{ on, attrs }">
								<v-btn icon v-bind="attrs"
									v-on="on"
								>
									<v-icon color="red darken-2">
										mdi-delete
									</v-icon>
								</v-btn>
							</template>
							<span>Delete Event</span>
						</v-tooltip>
					</div>
				</v-card>
				<v-col cols="12"
					class="pa-0"
				>
					<v-divider class="mx-auto" />
				</v-col>
				<v-col cols="12"
					class="pa-0"
				>
					<v-card
						max-width="1000"
						class="mx-auto"
						flat
						color="transparent"
					>
						<v-toolbar
							max-width="1000"
							color="transparent"
							class="mx-auto elevation-0"
						>
							<v-avatar class="detail-toolbar-avatar"
								color="primary"
								size="42"
							>
								<v-icon color="white"
									size="24"
								>
									mdi-calendar-clock
								</v-icon>
							</v-avatar>
							<v-spacer />
							<v-tabs
								v-show="$vuetify.breakpoint.mdAndUp"
								v-model="tab"
								background-color="transparent"
								centered
								icons-and-text
								slider-size="3"
								slider-color="red"
								active-class="event-detail-active-tab"
							>
								<v-tab
									v-for="(item, index) in eventTabItems"
									:key="index"
									:href="'#tab-' + item.title"
								>
									{{ item.title }}
									<v-icon>{{ item.icon }}</v-icon>
								</v-tab>
							</v-tabs>
							<v-spacer />
							<v-menu offset-y
								nudge-left="30"
								transition="slide-y-transition"
							>
								<template #activator="{ on, attrs }">
									<v-btn
										color="primary"
										dark
										v-bind="attrs"
										icon
										v-on="on"
									>
										<v-icon>mdi-dots-vertical</v-icon>
									</v-btn>
								</template>
								<v-list>
									<v-list-item
										v-for="(item, index) in eventActions"
										:key="index"
									>
										<v-list-item-title>{{ item.title }}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
						</v-toolbar>
						<v-tabs
							v-show="$vuetify.breakpoint.smAndDown"
							v-model="tab"
							background-color="transparent"
							centered
							show-arrows
							icons-and-text
							slider-size="3"
							slider-color="red"
							active-class="event-detail-active-tab"
						>
							<v-tab
								v-for="(item, index) in eventTabItems"
								:key="index"
								:href="'#tab-' + item.title"
							>
								{{ item.title }}
								<v-icon>{{ item.icon }}</v-icon>
							</v-tab>
						</v-tabs>
					</v-card>
				</v-col>
			</v-col>
		</v-row>
		<v-row class="ma-0 pa-0">
			<v-card
				flat
				max-width="1000"
				class="mx-auto"
			>
				<v-tabs-items v-model="tab">
					<v-tab-item value="tab-about">
						<v-card flat>
							<v-list two-line>
								<v-list-item
									v-for="item in aboutEventInfo"
									:key="item.index"
								>
									<v-list-item-avatar><v-icon>{{ item.icon }}</v-icon></v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title>{{ item.field }}</v-list-item-title>
										<v-list-item-subtitle>
											<div>
												<p class="mb-0">
													{{ item.value }}
												</p>
											</div>
										</v-list-item-subtitle>
									</v-list-item-content>
								</v-list-item>
							</v-list>
							<v-card-text>{{ event.description }}</v-card-text>
						</v-card>
					</v-tab-item>
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
					<v-tab-item value="tab-photos">
						<v-card flat>
							<!--								<v-card-text v-show="eventImages.length === 0">-->
							<!--									No photos added yet!-->
							<!--								</v-card-text>-->
							<v-row class="ma-0 pa-2">
								<v-col
									v-for="n in 9"
									:key="n"
									class="d-flex child-flex"
									cols="4"
								>
									<v-img
										:src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
										:lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
										class="grey lighten-2"
										@click.stop="zoomImage('https://i.pinimg.com/originals/ff/c4/3f/ffc43fa252e7a7bd99e8a70a1b2aa499.jpg')"
									>
										<template #placeholder>
											<v-row
												class="fill-height ma-0"
												align="center"
												justify="center"
											>
												<v-progress-circular
													indeterminate
													color="grey lighten-5"
												/>
											</v-row>
										</template>
									</v-img>
								</v-col>
							</v-row>
						</v-card>
					</v-tab-item>
					<v-tab-item value="tab-multimedia">
						<v-card flat>
							<v-card-title class="headline">
								<v-icon large>
									mdi-music
								</v-icon>
								<span class="pl-4">Event Sounds</span>
							</v-card-title>
							<v-card-text v-show="list.length === 0">
								No sounds added yet!
							</v-card-text>
							<APlayer
								ref="player"
								class="my-3 mx-4"
								:music="list[0]"
								:list="list"
								:mutex="true"
								:controls="true"
								preload="true"
								theme="indigo"
								list-max-height="150px"
							/>
							<v-card-title class="headline pb-0">
								<v-icon large>
									mdi-video
								</v-icon>
								<span class="pl-4">Event Videos</span>
							</v-card-title>
							<v-row class="ma-0 pa-0">
								<v-col v-show="urls.length === 0">
									No videos added yet!
								</v-col>
								<v-col
									v-for="(item, index) in urls"
									:key="index"
									cols="12"
									class="ma-0 pa-0"
								>
									<youtube
										ref="youtube"
										class="pa-4"
										:video-id="getId(item)"
										:resize="true"
										:resize-delay="100"
										:fit-parent="true"
										@playing="playing"
									/>
								</v-col>
							</v-row>
						</v-card>
					</v-tab-item>
				</v-tabs-items>
			</v-card>
		</v-row>
	</div>
</template>
<script>
import APlayer from "vue-aplayer"
export default {
	name: "EventDetailView",
	components: {
		APlayer
	},
	data: () => ({
		tab: null,
		list: [
			{
				title: "Sound Helix 1",
				artist: "Kiran Parajuli",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
				pic: "https://bd.gaadicdn.com/processedimages/hero/passion-pro-110/640X309/passion-pro-1105e5ddca2e3a50.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 2",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 3",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 1",
				artist: "Kiran Parajuli",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
				pic: "https://bd.gaadicdn.com/processedimages/hero/passion-pro-110/640X309/passion-pro-1105e5ddca2e3a50.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 2",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 3",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 1",
				artist: "Kiran Parajuli",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
				pic: "https://bd.gaadicdn.com/processedimages/hero/passion-pro-110/640X309/passion-pro-1105e5ddca2e3a50.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 2",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
			{
				title: "Sound Helix 3",
				artist: "John Doe",
				src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
				pic: "https://unncdn.prixacdn.net/media/Shruti_sambeg_new.jpg",
				lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
			},
		],
		myComment: "",
		event: {
			id: 16,
			title: "Dashain - Tihar Event",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, " +
				"sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut " +
				"enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
				"aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit " +
				"in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur " +
				"sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt " +
				"mollit anim id est laborum.",
			country: "Nepal",
			province: "Province No 2",
			district: "BXABCY",
			municipality: null,
			municipality_ward: null,
			vdc: "HariyoKharka",
			vdc_ward: "AadhiBeri Gaaupalika",
			is_main: false,
			type: "SATSANG",
			created_by: "bot25",
			created_at: "Nov 2, 2020",
			updated_by: "bot25",
			updated_at: "Nov 2, 2020",
			venue: "Deep Housing Auditorium",
			organizer: "Hero Branch",
			contacts: [9845689652, 6158965],
			start_date: "Nov 5, 2020",
			duration: 2,
			timeOfDay: "10AM - 5PM",
			banner:
				"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50",
			no_of_responses: 5
		},
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
		],
		urls: [
			"https://www.youtube.com/watch?v=6li2Kib4uI0&ab_channel=Sachhaikendranepal",
			"https://www.youtube.com/watch?v=AQbZmhg4aMs&ab_channel=Sachhaikendranepal",
			"https://www.youtube.com/watch?v=zutF2cYlOHI&ab_channel=Sachhaikendranepal"
		],
		eventTabItems: [
			{ title: "about", icon: "mdi-information-variant" },
			{ title: "discussion", icon: "mdi-account-multiple" },
			{ title: "photos", icon: "mdi-image" },
			{ title: "multimedia", icon: "mdi-video-vintage" },
		],
		selectedImage: null,
		fullScreenDialog: false,
		eventActions: [
			{ title: "Click Me" },
			{ title: "Click Me" },
			{ title: "Click Me" },
			{ title: "Click Me 2" }
		]
	}),
	computed: {
		player() {
			return this.$refs.youtube.player
		},
		aboutEventInfo() {
			return [
				{index: 0, icon: "mdi-account-group", field: "Audiences", value: this.event.no_of_responses + " people responded"},
				{index: 1, icon: "mdi-clock", field: "Date-Time", value: this.event.start_date + " for " + this.event.duration + " days"},
				{index: 2, icon: "mdi-home", field: "Venue", value: this.event.venue},
				{index: 3, icon: "mdi-earth", field: "Organizer", value: "Registred by " + this.event.created_by + " from " + this.event.organizer},
				{index: 4, icon: "mdi-web", field: "Event Type", value: this.event.type}
			]
		}
	},
	mounted() {

	},
	methods: {
		closeImageDialog() {
			this.fullScreenDialog = false
			this.selectedImage = null
		},
		zoomImage(url) {
			console.log("Zoom", url)
			this.fullScreenDialog=true
			this.selectedImage = url
		},
		makeComment() {
			if (this.myComment === null) return
			console.log(this.myComment)
		},
		playVideo() {
			this.player.playVideo()
		},
		playing() {
			console.log("\o/ we are watching!!!")
		},
		getId(url) {
			return this.$youtube.getIdFromUrl(url)
		}
	}
}
</script>
<style lang="sass" scoped>
#event-top-row
	background: linear-gradient(180deg, #ff0000, #eeaaaa, #efcece, #cee7f9)
#event-banner
	border-radius: 0 0 10px 10px
#date-peek-box
	margin-top: -30px
	border: 4px solid aliceblue
	background-color: lightgrey
.event-title
	font-size: 38px
	line-height: 38px
	color: black
.event-subtitle
	padding-bottom: 5px
	font-size: 18px
	color: #f32828 !important
	font-weight: 500
.comment
	background-color: #d9ebfa
	border-radius: 10px
	padding: 10px 5px
	-webkit-line-clamp: unset !important
.comment-date
	font-size: 12px
.date-month
	margin: 0
	padding: 1px 0 0 0
	text-align: center
	color: white !important
	font-size: 24px
	font-family: 'Lemonada', serif
	font-weight: 600 !important
.event-detail-active-tab
	color: #fa3e3b
</style>
