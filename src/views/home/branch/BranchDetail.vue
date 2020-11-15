<template>
	<v-card
		class="mx-auto my-6"
		max-width="900"
		outlined
	>
		<detail-view-header>
			<template #topContent>
				<v-img
					src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
					height="300"
				/>
				<div class="px-4">
					<div class="overline">
						MAIN SUB-BRANCH INTERNATIONAL
					</div>
					<p class="headline">
						{{ branch.name }}
					</p>
					<p>{{ branch.slogan }}</p>
				</div>
				<v-row class="ma-0 pa-0 px-2"
					justify="space-between"
				>
					<v-btn
						text
						color="primary"
						dark
					>
						<v-icon left>
							mdi-post
						</v-icon>
						Posts
					</v-btn>
					<v-btn
						class="ma-2"
						text
						dark
						color="teal"
					>
						<v-icon left>
							mdi-calendar-multiple
						</v-icon>
						Events
					</v-btn>
				</v-row>
			</template>
			<template #chips>
				<div>
					<v-chip
						label
						color="blue lighten-4"
						class="ma-2"
					>
						<p class="ma-0 pa-0 branch-counts">
							123
						</p>
						Members
						<v-icon
							class="mx-1"
							color="orange darken-3"
						>
							mdi-account-group
						</v-icon>
					</v-chip>
					<v-chip
						color="red lighten-4"
						label
						class="ma-2"
					>
						<p class="ma-0 pa-0 branch-counts">
							123
						</p>
						Loves
						<v-icon style="color: darkred">
							mdi-heart
						</v-icon>
					</v-chip>
					<v-chip
						color="green lighten-3"
						label
						class="ma-2"
					>
						<p class="ma-0 pa-0 branch-counts">
							123
						</p>
						Events
						<v-icon style="color: darkgreen">
							mdi-calendar-check
						</v-icon>
					</v-chip>
				</div>
			</template>
		</detail-view-header>
		<detail-view-explorer
			id="explore-card"
			toolbar-title="Explore Sachchai Branch"
			toolbar-icon="mdi-account-circle"
			:tab-items="profileTabItems"
		>
			<template #tabContent>
				<v-tab-item>
					<v-card
						id="general-info-tab-content"
						flat
					>
						<v-card-text class="mt-0 pa-0">
							<v-list class="mt-0 pt-0 alice-blue">
								<v-list-item
									v-for="item in generalInfoItems1"
									:key="item.index"
									@click="1"
								>
									<v-icon class="mr-2">
										{{ item.icon }}
									</v-icon>
									<p class="mb-0 pb-0">
										<b>{{ item.displayFieldName }} :</b>
										{{ branch[item.field] }}
									</p>
								</v-list-item>
								<v-list-item @click="1">
									<v-checkbox
										v-model="branch.is_main"
										dense
										color="indigo"
										label="Is Main Branch"
									/>
									<v-spacer />
									<span>
										<v-icon>mdi-map-marker-star</v-icon>
									</span>
								</v-list-item>
								<v-list-item
									v-for="item in generalInfoItems2"
									:key="item.index"
									@click="1"
								>
									<v-icon class="mr-2">
										{{ item.icon }}
									</v-icon>
									<p class="mb-0 pb-0">
										<b>{{ item.displayFieldName }} :</b>
										{{ branch[item.field] }}
									</p>
								</v-list-item>
							</v-list>
						</v-card-text>
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card
						id="member-info-tab-content"
						flat
					>
						Where are my members?
					</v-card>
				</v-tab-item>
				<v-tab-item>
					<v-card
						id="branch-info-tab-content"
						flat
					>
						<v-card-text class="mt-0 pa-0">
							<v-list
								class="ma-0 pa-0 alice-blue"
							>
								<v-list-item
									v-for="item in locationInfoItems"
									:key="item.index"
									@click="1"
								>
									<v-icon class="mr-2">
										{{ item.icon }}
									</v-icon>
									<p class="mb-0 pb-0">
										<b>{{ item.displayFieldName }} :</b>
										{{ branch[item.field] }}
									</p>
								</v-list-item>
							</v-list>
						</v-card-text>
					</v-card>
				</v-tab-item>
			</template>
		</detail-view-explorer>
	</v-card>
</template>

<script>
export default {
	name: "FollowerDetailView",
	components: {
		// FollowerArticle: () => import("@/components/Article"),
		// FollowerMultimedia: () => import("@/components/Multimedia"),
		DetailViewHeader: () => import("@/components/DetailViewHeader"),
		DetailViewExplorer: () => import("@/components/DetailViewExplorer")
	},
	data: () => ({
		now: null,
		tab: null,
		articlePost: {
			id: 1,
			title: "Our Changing Planet",
			author: "Kurt Wagner",
			description: "Visit ten places on our planet that are undergoing the biggest changes today."
		},
		multimediaPost: {
			id: 1,
			title: "Alice in the Wonderland",
			author: "Kiran Parajuli",
			description: "Alice, now 19 years old, follows a rabbit in a blue coat to a magical wonderland" +
				" from her dreams where she is reunited with her friends who make her realise her true destiny."
		},
		profileTabItems: [
			{ icon: "mdi-city-variant", title: "General", index: 0, id: "general-info-tab" },
			{ icon: "mdi-account-tie", title: "Members", index: 4, id: "members-info-tab" },
			{ icon: "mdi-google-maps", title: "Location", index: 1, id: "location-info-tab" },
		],
		generalInfoItems1: [
			{ index: 0, icon: "mdi-card-account-details-outline", field: "name", displayFieldName: "Name" },
			{ index: 1, icon: "mdi-phone-classic", field: "phone", displayFieldName: "Phone" },
		],
		generalInfoItems2: [
			{ index: 2, icon: "mdi-account-tie-outline", field: "created_by", displayFieldName: "Created By" },
			{ index: 3, icon: "mdi-calendar-plus", field: "created_at", displayFieldName: "Date Created" },
			{ index: 4, icon: "mdi-account-tie-outline", field: "updated_by", displayFieldName: "Updated By" },
			{ index: 5, icon: "mdi-calendar-edit", field: "updated_at", displayFieldName: "Last Updated At" },
		],
		locationInfoItems: [
			{ index: 6, icon: "mdi-web", field: "country", displayFieldName: "Country" },
			{ index: 7, icon: "mdi-office-building-marker-outline", field: "province", displayFieldName: "Province" },
			{ index: 8, icon: "mdi-map-marker-multiple-outline", field: "district", displayFieldName: "District" },
			{ index: 9, icon: "mdi-map-marker", field: "municipality", displayFieldName: "Municipality" },
			{ index: 10, icon: "mdi-numeric", field: "municipality_ward", displayFieldName: "Municipality Ward" },
			{ index: 11, icon: "mdi-home-map-marker", field: "vdc", displayFieldName: "VDC" },
			{ index: 12, icon: "mdi-numeric", field: "vdc_ward", displayFieldName: "VDC Ward" }
		],
		collapseOnScroll: true,
		branch: {
			id: 1,
			name: "Kathmandu Branch",
			country: "Nepal",
			province: "Bagmati Pradesh",
			district: "Kathmandu",
			municipality: "Kathmandu",
			municipality_ward: "Baneshwor",
			vdc: null,
			vdc_ward: null,
			phone: 9858325632,
			is_main: true,
			created_by: "bot25",
			created_at: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
			updated_by: "bot25",
			updated_at: new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""),
			slogan: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the" +
				" industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
			image:
				"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
		},
	}),
	methods: {}
}
</script>
<style lang="sass" scoped>
::v-deep .v-slide-group__wrapper
	@media only screen and (max-width: 588px)
		width: 60px !important

.alice-blue
	background-color: aliceblue

.headline
	padding-top: 10px
	font-size: 36px !important
	font-weight: 30

.branch-counts
	margin-right: 4px !important
	padding: 2px !important
	background-color: #706f6f63
	border-radius: 5px
	color: #f8f8d9
	font-weight: bold

.center-align
	@media only screen and (min-width: 720px)
		margin-left: 40px !important
	@media only screen and (min-width: 800px)
		margin-left: 80px !important

#explore-card
	border-radius: 0
</style>
