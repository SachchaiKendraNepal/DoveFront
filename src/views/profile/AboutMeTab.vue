<template>
	<tab-item-card>
		<template #content>
			<v-card id="about-follower-card"
				class="ma-2"
				color="transparent"
			>
				<v-tabs
					id="about-tab"
					vertical
					color="primary"
				>
					<v-tab
						v-for="(tab, index) in profileAboutTabItems"
						:key="index"
						class="justify-start full-width px-3"
					>
						<v-icon left>
							{{ tab.icon }}
						</v-icon>
						<span v-show="$vuetify.breakpoint.mdAndUp"
							class="text-capitalize"
						>{{ tab.text }}</span>
					</v-tab>
					<v-tab-item class="personal-info-tab-item">
						<my-personal-info />
					</v-tab-item>
					<v-tab-item class="branch-info-tab-item">
						<my-branch-info />
					</v-tab-item>
					<v-tab-item class="photos-info-tab-item">
						<profile-photos-tab />
					</v-tab-item>
					<v-tab-item class="multimedia-info-tab-item">
						<v-card flat>
							<v-card-title class="pb-0">
								My Videos
							</v-card-title>
							<v-row justify="start"
								align="center"
							>
								<v-col
									v-for="(item, keyring) in multimediaVideos"
									:key="keyring"
									cols="12"
									xl="6"
									lg="6"
									md="6"
								>
									<!--									<vue-player-->
									<!--										:v-model="item.playing"-->
									<!--										:src="item.videoUrl"-->
									<!--										:poster="item.videoPosterImageUrl"-->
									<!--										:title="item.videoPosterTitle"-->
									<!--										class="mx-4 my-3"-->
									<!--									/>-->
								</v-col>
							</v-row>
						</v-card>
					</v-tab-item>
					<v-tab-item class="articles-tab-item">
						<v-card flat
							class="ma-4"
						>
							<article-post :post="articlePost" />
							<article-post :post="articlePost" />
							<article-post :post="articlePost" />
							<article-post :post="articlePost" />
						</v-card>
					</v-tab-item>
					<v-tab-item class="bookmarks-tab-item">
						<v-card flat
							class="ma-4"
						>
							<article-post :post="articlePost" />
							<article-post :post="articlePost" />
							<article-post :post="articlePost" />
							<article-post :post="articlePost" />
						</v-card>
					</v-tab-item>
				</v-tabs>
			</v-card>
			<v-dialog v-model="patchDialog"
				dark
			>
				<v-card max-width="600">
					<v-card-text>
						<v-text-field
							v-model="textToUpdate"
							hide-details
							solo
						>
							<template #append>
								<v-btn class="send-icon-btn">
									<v-icon color="primary">
										mdi-send
									</v-icon>
								</v-btn>
							</template>
						</v-text-field>
					</v-card-text>
				</v-card>
			</v-dialog>
		</template>
	</tab-item-card>
</template>
<script>
export default {
	name: "ProfileAboutTabView",
	components: {
		MyPersonalInfo: () => import("@/views/profile/MyPersonalInfo"),
		MyBranchInfo: () => import("@/views/profile/MyBranchInfo"),
		ProfilePhotosTab: () => import("@/views/profile/ProfilePhotosTab"),
		TabItemCard: () => import("@/components/ProfileTabItem"),
		ArticlePost: () => import("@/components/Article"),
	},
	data: () => ({
		patchDialog: false,
		textToUpdate: null,
		fieldToUpdate: null,



		multimediaVideos: [
			{
				id: 1,
				playing: false,
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
				duration: null
			},
			{
				id: 2,
				playing: false,
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
				duration: null
			},
			{
				id: 3,
				playing: false,
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
				duration: null
			}
		],
		profileAboutTabItems: [
			{text: "Personal", icon: "mdi-account-circle"},
			{text: "Branch", icon: "mdi-city"},
			{text: "Photos", icon: "mdi-camera-front-variant"},
			{text: "Multimedia", icon: "mdi-surround-sound"},
			{text: "Articles", icon: "mdi-format-text-variant"},
			{text: "Bookmarks", icon: "mdi-bookmark"}
		],
		currentActiveTab: "Personal",
		locationItems: [
			{icon: "mdi-city", field: "Branch", value: "Pokhara Kendra Branch"},
			{icon: "mdi-account-cowboy-hat", field: "Position", value: "Leader"},
			{icon: "mdi-check-bold", field: "Status", value: "Approved"},
			{icon: "mdi-calendar-check", field: "Approved at", value: "Nov 3 2012"},
			{icon: "mdi-account-check", field: "Approved by", value: "Bot589"},
		],
		articlePost: {
			id: 1,
			title: "Our Changing Planet",
			author: "Kurt Wagner",
			description: "Visit ten places on our planet that are undergoing the biggest changes today."
		},
	})
}
</script>
<style lang="sass" scoped>
.basil
	background-color: #FFFBE6 !important
.basil--text
	color: #356859 !important
#about-follower-card
	transition: all .5s
	.action-dropdown
		background: #dedddd !important
	::v-deep.v-list-item__content
		padding-top: 0
	#about-tab
		::v-deep.v-tab
			min-width: 40px
::v-deep.v-list-item__subtitle
	white-space: normal
::v-deep.v-list-item__title
	white-space: normal
.img-group-card
	background: #114357  /* fallback for old browsers */
	background: -webkit-linear-gradient(to right, #F29492, #114357)  /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #F29492, #114357) /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

.image-group-title
	color: white
	height: 100%
	display: flex
	align-items: center
	text-align: center
	justify-content: center
	font-size: 1rem
	text-transform: capitalize
</style>
