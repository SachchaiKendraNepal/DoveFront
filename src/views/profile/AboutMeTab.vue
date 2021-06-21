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
						<my-multimedia />
					</v-tab-item>
					<v-tab-item class="articles-tab-item">
						<my-articles />
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
		MyArticles: () => import("@/views/profile/MyArticles"),
		MyMultimedia: () => import("@/views/profile/MyMultimedia"),
		MyPersonalInfo: () => import("@/views/profile/MyPersonalInfo"),
		MyBranchInfo: () => import("@/views/profile/MyBranchInfo"),
		ProfilePhotosTab: () => import("@/views/profile/ProfilePhotosTab"),
		TabItemCard: () => import("@/components/ProfileTabItem"),
	},
	data: () => ({
		patchDialog: false,
		textToUpdate: null,
		fieldToUpdate: null,

		profileAboutTabItems: [
			{text: "Personal", icon: "mdi-account-circle"},
			{text: "Branch", icon: "mdi-city"},
			{text: "Photos", icon: "mdi-camera-front-variant"},
			{text: "Multimedia", icon: "mdi-surround-sound"},
			{text: "Articles", icon: "mdi-format-text-variant"},
		],
		locationItems: [
			{icon: "mdi-city", field: "Branch", value: "Pokhara Kendra Branch"},
			{icon: "mdi-account-cowboy-hat", field: "Position", value: "Leader"},
			{icon: "mdi-check-bold", field: "Status", value: "Approved"},
			{icon: "mdi-calendar-check", field: "Approved at", value: "Nov 3 2012"},
			{icon: "mdi-account-check", field: "Approved by", value: "Bot589"},
		]
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
