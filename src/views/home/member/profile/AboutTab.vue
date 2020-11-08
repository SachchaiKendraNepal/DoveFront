<template>
	<tab-item-card value="tab-About">
		<template #content>
			<v-card id="about-follower-card"
				class="my-4"
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
						<v-card flat>
							<v-list two-line>
								<v-list-item-group
									v-for="(item, i) in personalItems"
									:key="i"
								>
									<v-list-item>
										<v-list-item-icon>
											<v-icon color="indigo">
												{{ item.icon }}
											</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title>{{ item.value }}</v-list-item-title>
											<v-list-item-subtitle>{{ item.field }}</v-list-item-subtitle>
										</v-list-item-content>

										<v-list-item-icon>
											<v-menu
												rounded
												transition="slide-y-transition"
												offset-y
												close-on-click
												close-delay="1"
											>
												<template #activator="{ on, attrs }">
													<v-btn
														class="action-dropdown"
														color="grey darken-3"
														icon
														v-bind="attrs"
														v-on="on"
													>
														<v-icon>mdi-dots-vertical</v-icon>
													</v-btn>
												</template>
												<v-list
													dense
													rounded
													color="red lighten-5"
													class="ma-0 px-0 py-1"
												>
													<v-list-item
														v-for="(action, actionKey) in actionItems"
														:key="actionKey"
														@click="1"
													>
														<v-list-item-icon>
															<v-icon medium
																:color="action.color"
															>
																{{ action.icon }}
															</v-icon>
														</v-list-item-icon>
														<v-list-item-title>{{ action.text }}</v-list-item-title>
													</v-list-item>
												</v-list>
											</v-menu>
										</v-list-item-icon>
									</v-list-item>
									<v-divider
										v-if="i < personalItems.length - 1"
										:key="i"
										inset
									/>
								</v-list-item-group>
							</v-list>
						</v-card>
					</v-tab-item>
					<v-tab-item class="branch-info-tab-item">
						<v-card flat>
							<v-list two-line>
								<v-list-item-group
									v-for="(item, i) in branchItems"
									:key="i"
								>
									<v-list-item>
										<v-list-item-icon>
											<v-icon color="indigo">
												{{ item.icon }}
											</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											<v-list-item-title>{{ item.value }}</v-list-item-title>
											<v-list-item-subtitle>{{ item.field }}</v-list-item-subtitle>
										</v-list-item-content>

										<v-list-item-icon>
											<v-menu
												rounded
												transition="slide-y-transition"
												offset-y
												close-on-click
												close-delay="1"
											>
												<template #activator="{ on, attrs }">
													<v-btn
														class="action-dropdown"
														color="grey darken-3"
														icon
														v-bind="attrs"
														v-on="on"
													>
														<v-icon>mdi-dots-vertical</v-icon>
													</v-btn>
												</template>
												<v-list
													dense
													rounded
													color="red lighten-5"
													class="ma-0 px-0 py-1"
												>
													<v-list-item
														v-for="(action, actionKey) in actionItems"
														:key="actionKey"
														@click="1"
													>
														<v-list-item-icon>
															<v-icon medium
																:color="action.color"
															>
																{{ action.icon }}
															</v-icon>
														</v-list-item-icon>
														<v-list-item-title>{{ action.text }}</v-list-item-title>
													</v-list-item>
												</v-list>
											</v-menu>
										</v-list-item-icon>
									</v-list-item>
									<v-divider
										v-if="i < branchItems.length - 1"
										:key="i"
										inset
									/>
								</v-list-item-group>
							</v-list>
						</v-card>
					</v-tab-item>
					<v-tab-item class="photos-info-tab-item">
						<v-card flat>
							<v-row class="ma-0 pa-0">
								<v-col
									v-for="n in 9"
									:key="n"
									class="d-flex child-flex"
									cols="4"
								>
									<v-img
										:src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
										:lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
										aspect-ratio="1"
										class="grey lighten-2"
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
					<v-tab-item class="multimedia-info-tab-item">
						<v-card flat>
							<v-card-title class="pb-0">
								My Sounds
							</v-card-title>
							<APlayer
								ref="player"
								class="my-3 mx-4"
								:music="list[0]"
								:list="list"
								:mutex="true"
								:controls="true"
								preload="true"
								theme="indigo"
								list-max-height="230px"
							/>
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
									<vue-player
										:v-model="item.playing"
										:src="item.videoUrl"
										:poster="item.videoPosterImageUrl"
										:title="item.videoPosterTitle"
										class="mx-4 my-3"
									/>
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
		</template>
	</tab-item-card>
</template>
<script>
import APlayer from "vue-aplayer"
import vuePlayer from "@algoz098/vue-player"
export default {
	name: "ProfileAboutTabView",
	components: {
		vuePlayer,
		APlayer,
		TabItemCard: () => import("@/components/ProfileTabItem"),
		ArticlePost: () => import("@/components/Article"),
	},
	data: () => ({
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
		multimediaVideos: [
			{
				id: 1,
				playing: false,
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
			},
			{
				id: 2,
				playing: false,
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
			},
			{
				id: 3,
				playing: false,
				videoUrl: "http://techslides.com/demos/sample-videos/small.mp4",
				videoPosterImageUrl: "https://i.ytimg.com/vi/ilqTywuUon8/movieposter.jpg",
				videoPosterTitle: "ALICE IN THE WONDERLAND",
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
		personalItems: [
			{icon: "mdi-text-shadow", field: "Full Name", value: "Kiran Parajuli"},
			{icon: "mdi-phone", field: "Phone number", value: "9856256325"},
			{icon: "mdi-account", field: "Username", value: "kiranparajuli589"},
			{icon: "mdi-email", field: "Email address", value: "kiranparajuli589@gmail.com"},
			{icon: "mdi-map-marker", field: "Permanent address", value: "Lamachaur-16, Pokhara"},
			{icon: "mdi-google-maps", field: "Permanent address", value: "Tinpiple-5, Panchkhal"},
			{icon: "mdi-cake-variant", field: "Birthday", value: "Nov 12, 1996"},
			{icon: "mdi-star", field: "Status", value: "Active"},
			{icon: "mdi-calendar", field: "Date Joined", value: "Dec 12, 2015"},
		],
		branchItems: [
			{icon: "mdi-city", field: "Branch", value: "Pokhara Kendra Branch"},
			{icon: "mdi-account-cowboy-hat", field: "Position", value: "Leader"},
			{icon: "mdi-check-bold", field: "Status", value: "Approved"},
			{icon: "mdi-calendar-check", field: "Approved at", value: "Nov 3 2012"},
			{icon: "mdi-account-check", field: "Approved by", value: "Bot589"},
		],
		locationItems: [
			{icon: "mdi-city", field: "Branch", value: "Pokhara Kendra Branch"},
			{icon: "mdi-account-cowboy-hat", field: "Position", value: "Leader"},
			{icon: "mdi-check-bold", field: "Status", value: "Approved"},
			{icon: "mdi-calendar-check", field: "Approved at", value: "Nov 3 2012"},
			{icon: "mdi-account-check", field: "Approved by", value: "Bot589"},
		],
		actionItems: [
			{icon: "mdi-pencil", text: "Edit", color: "primary"},
			{icon: "mdi-delete", text: "Reset", color: "red"}
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
#about-follower-card
	transition: all .5s
	.action-dropdown
		background: #dedddd !important
	::v-deep.v-list-item__content
		padding-top: 0
	#about-tab
		::v-deep.v-tab
			min-width: 40px
</style>
