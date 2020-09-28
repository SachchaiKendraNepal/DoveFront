<template>
	<v-data-table
		id="branch-d-table"
		:loading="isLoading"
		loading-text="Branches Loading..."
		calculate-widths
		:headers="headers"
		:items="branches"
		:search="search"
		multi-sort
		:items-per-page="12"
		class="elevation-3 mx-2 mx-sm-6 mx-md-6 mx-lg-6 mx-xl-12 my-6"
	>
		<template #top>
			<v-toolbar
				flat
				color="grey lighten-2"
			>
				<v-avatar
					class="elevation-2 mr-2"
					size="40"
				>
					<v-icon size="30">
						mdi-city-variant
					</v-icon>
				</v-avatar>
				<v-toolbar-title v-show="$vuetify.breakpoint.smAndUp">
					Sachchai Branches
				</v-toolbar-title>
				<v-divider
					class="mx-4"
					inset
					vertical
				/>
				<v-text-field
					v-model="search"
					solo
					dense
					hide-details
					label=""
					name="search"
					prepend-inner-icon="mdi-magnify"
					clearable
					placeholder="Search"
				/>
				<v-spacer />
				<v-divider
					class="mx-4"
					inset
					vertical
				/>
				<v-dialog
					v-model="dialog"
					max-width="600px"
				>
					<template #activator="{ on, attrs }">
						<v-btn
							dark
							v-bind="attrs"
							color="primary"
							v-on="on"
						>
							<v-icon
								dark
								:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
							>
								mdi-plus-circle
							</v-icon>
							<span v-if="$vuetify.breakpoint.smAndUp">New Branch</span>
						</v-btn>
					</template>
					<v-card color="rgb(251 250 241)">
						<v-card-title>
							<v-avatar
								size="40"
								class="mr-4 elevation-3"
							>
								<v-icon
									dark
									size="30"
								>
									{{ formIcon }}
								</v-icon>
							</v-avatar>
							<span class="headline white--text">{{ formTitle }}</span>
						</v-card-title>
						<v-divider />
						<v-card-text>
							<v-container>
								<v-row>
									<v-col
										v-show="editedIndex !== -1 || viewIndex !== -1"
										cols="12"
										sm="4"
										md="4"
										lg="4"
										xl="4"
										class="text-center"
									>
										<v-avatar
											size="150"
											class="mt-2"
										>
											<v-img :src="editedItem.image" />
										</v-avatar>
									</v-col>
									<v-col
										v-show="editedIndex !== -1 || viewIndex !== -1"
										cols="12"
										sm="8"
										md="8"
										lg="8"
										xl="8"
									>
										<v-card
											id="short-member-detail"
											flat
											class="mx-auto"
											max-width="450"
											tile
										>
											<v-list-item>
												<v-list-item-content>
													<p
														class="headline cursor"
														@click="routeToBranchDetailPage(editedItem.id)"
													>
														{{ editedItem.name }}
														<v-tooltip bottom>
															<template #activator="{ on, attrs }">
																<v-icon
																	v-ripple
																	v-bind="attrs"
																	color="green darken-1"
																	v-on="on"
																>
																	mdi-check-decagram
																</v-icon>
															</template>
															<span>Sacchai Branch</span>
														</v-tooltip>
														<v-tooltip bottom>
															<template #activator="{ on, attrs }">
																<v-icon
																	v-ripple
																	v-bind="attrs"
																	color="red darken-3"
																	v-on="on"
																>
																	mdi-map-marker-star
																</v-icon>
															</template>
															<span>Main Branch</span>
														</v-tooltip>
													</p>
													<v-divider class="mb-2" />
													<div class="mb-2">
														<v-chip
															label
															color="blue lighten-5"
															class="mr-1 mb-1"
														>
															<v-icon left>
																mdi-map-marker-star
															</v-icon>
															<b>Main Branch</b>
															<v-icon right>
																mdi-church
															</v-icon>
														</v-chip>
														<v-chip
															label
															dark
															class="mb-1"
														>
															<v-icon
																left
																color="white"
															>
																mdi-dove
															</v-icon>
															<b>Sacchai Branch</b>
															<v-icon right>
																mdi-city
															</v-icon>
														</v-chip>
													</div>
													<p class="mb-0 mb-2">
														<v-icon class="small-detail-icon">
															mdi-shape-plus
														</v-icon>
														<b>Date created:</b>
														<span class="px-1">{{ editedItem.created_at }}</span>
													</p>
													<p class="mb-0 mb-2">
														<v-icon class="small-detail-icon">
															mdi-plus
														</v-icon>
														<b>Created by:</b>
														<span class="px-1"> Kiran Parajuli </span>
													</p>
													<p class="mb-0 mb-2">
														<v-icon class="small-detail-icon">
															mdi-account-network
														</v-icon>
														<b>Total Members:</b>
														<span class="px-1">558</span>
													</p>
													<p class="mb-0">
														<v-icon class="small-detail-icon">
															mdi-pencil
														</v-icon>
														<b>Last Updated By:</b>
														<span class="px-1">Sam Gellaitry</span>
													</p>
												</v-list-item-content>
											</v-list-item>
										</v-card>
									</v-col>
									<v-col
										cols="12"
										class="pl-0"
									>
										<p class="heading ma-0 pa-0">
											<v-icon class="pb-1">
												mdi-city-variant
											</v-icon>
											Branch Information
										</p>
										<v-divider />
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-text-field
											id="branch-name"
											v-model="editedItem.name"
											class="ma-0"
											outlined
											dense
											clearable
											label="Name"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-form-textbox"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-text-field
											id="branch-phone"
											v-model="editedItem.phone"
											class="ma-0"
											dense
											outlined
											clearable
											label="Phone"
											type="number"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-phone-classic"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-checkbox
											id="is_main"
											v-model="editedItem.is_main"
											label="Is Main Branch?"
											:disabled="viewIndex !== -1"
											append-icon="mdi-map-marker-star-outline"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-file-input
											id="member-image-input"
											v-model="editedItem.imageForUpload"
											class="ma-0"
											outlined
											dense
											chips
											show-size
											clearable
											accept="image/*"
											label="Branch Image"
											:disabled="viewIndex !== -1"
											prepend-icon=""
											prepend-inner-icon="mdi-camera"
										/>
									</v-col>
									<v-col
										cols="12"
										class="pl-0"
									>
										<p class="heading ma-0 pa-0">
											<v-icon class="pb-1">
												mdi-map-marker
											</v-icon>
											Location Information
										</p>
										<v-divider />
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-select
											id="branch-country"
											v-model="editedItem.country"
											class="ma-0"
											dense
											outlined
											clearable
											label="Country"
											:items="countries"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-web"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-select
											id="branch-province"
											v-model="editedItem.province"
											class="ma-0"
											dense
											outlined
											clearable
											label="Province"
											:items="provinces"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-office-building-marker-outline"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
									>
										<v-select
											id="branch-districts"
											v-model="editedItem.district"
											class="ma-0"
											dense
											outlined
											clearable
											:items="districts"
											label="District"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-map-marker-multiple-outline"
										/>
									</v-col>
									<v-col
										v-if="!editedItem.vdc"
										cols="12"
										class="ma-0 pa-0"
									>
										<v-select
											id="branch-municipality"
											v-model="editedItem.municipality"
											class="ma-0"
											dense
											outlined
											clearable
											label="Municipality"
											:items="municipalities"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-google-maps"
										/>
									</v-col>
									<v-col
										v-if="editedItem.municipality"
										cols="12"
										class="ma-0 pa-0"
									>
										<v-select
											id="branch-municipality-ward"
											v-model="editedItem.municipality_ward"
											class="ma-0"
											dense
											outlined
											clearable
											label="Municipality Ward"
											:items="municipality_wards"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-numeric"
										/>
									</v-col>
									<v-col
										v-if="!editedItem.municipality"
										cols="12"
										class="ma-0 pa-0"
									>
										<v-select
											id="branch-vdc"
											v-model="editedItem.vdc"
											class="ma-0"
											dense
											outlined
											clearable
											label="VDC"
											:items="vdcs"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-home-map-marker"
										/>
									</v-col>
									<v-col
										v-if="editedItem.vdc"
										cols="12"
										class="ma-0 pa-0"
									>
										<v-select
											id="branch-vdc-ward"
											v-model="editedItem.vdc_ward"
											class="ma-0"
											dense
											outlined
											clearable
											label="VDC Ward"
											:items="vdc_wards"
											:disabled="viewIndex !== -1"
											prepend-inner-icon="mdi-numeric"
										/>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions v-if="viewIndex === -1">
							<v-spacer />
							<v-btn
								color="red lighten-5"
								class="red--text"
								depressed
								@click="close"
							>
								Cancel
							</v-btn>
							<v-btn
								color="blue lighten-5"
								class="blue--text"
								depressed
								@click="save"
							>
								Save
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.name="{ item }">
			<p
				class="branch-name cursor"
				@click="routeToBranchDetailPage(item.id)"
			>
				{{ item.name }}
			</p>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.is_main="{ item }">
			<v-checkbox
				v-model="item.is_main"
				color="primary"
				disabled
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.municipality="{ item }">
			<v-icon v-if="!item.municipality">
				mdi-dots-horizontal
			</v-icon>
			<p
				v-else
				class="mb-0"
			>
				{{ item.municipality }}
			</p>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.municipality_ward="{ item }">
			<v-icon v-if="!item.municipality_ward">
				mdi-dots-horizontal
			</v-icon>
			<p
				v-else
				class="mb-0"
			>
				{{ item.municipality_ward }}
			</p>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.vdc="{ item }">
			<v-icon v-if="!item.vdc">
				mdi-dots-horizontal
			</v-icon>
			<p
				v-else
				class="mb-0"
			>
				{{ item.vdc }}
			</p>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.vdc_ward="{ item }">
			<v-icon v-if="!item.vdc_ward">
				mdi-dots-horizontal
			</v-icon>
			<p
				v-else
				class="mb-0"
			>
				{{ item.vdc_ward }}
			</p>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.actions="{ item }">
			<v-icon
				v-ripple
				class="mr-2"
				color="orange"
				size="20"
				@click="showItem(item)"
			>
				mdi-eye
			</v-icon>
			<v-icon
				v-ripple
				class="mr-2"
				color="primary"
				size="20"
				@click="editItem(item)"
			>
				mdi-pencil
			</v-icon>
			<v-icon
				v-ripple
				color="red"
				size="20"
				@click="deleteItem(item)"
			>
				mdi-delete
			</v-icon>
		</template>
		<template #no-data>
			<v-btn
				color="primary"
				@click="initialize"
			>
				Reset
			</v-btn>
		</template>
	</v-data-table>
</template>

<script>
import router from "@/router";

export default {
	name: "BranchTable",
	data: () => ({
		countries: ["Nepal", "India", "Bhutan", "Pakistan", "Singapore", "HongKong"],
		provinces: ["Bagmati Pradesh", "Gandaki Pradesh", "Uttar Pradesh", "Goa", "Province 1"],
		districts: ["Kaski", "Kathmandu", "Humla", "Jhapa", "Chitwan", "Sarlahi", "Nepalgunj"],
		municipalities: ["Pokhara-Lekhnath", "Kathmandu", "Panchkhal", "Banepa"],
		municipality_wards: ["Amarsingh", "Tinpiple", "Chauthe", "Chaukot"],
		vdcs: [
			"Barai",
			"Bargaun",
			"Badalkot",
			"Photu",
			"Aaglung",
			"Siddhara",
			"Simalapani",
			"Aruchaur",
			"Arukharka",
			"Armala",
			"Deurali"
		],
		vdc_wards: [
			"alskdf",
			"sldkf",
			"sldkf",
			"sldkf",
			"sldkfjs",
			"sldkfs",
			"owiek",
			"mndkjf",
			"woeik"
		],
		search: "",
		isLoading: false,
		dialog: false,
		headers: [
			{
				text: "PK",
				align: "start",
				value: "id"
			},
			{ text: "NAME", value: "name" },
			{ text: "PHONE", value: "phone" },
			{ text: "IS MAIN BRANCH", value: "is_main" },
			{ text: "COUNTRY", value: "country" },
			{ text: "PROVINCE", value: "province" },
			{ text: "DISTRICT", value: "district" },
			{ text: "MUNICIPALITY", value: "municipality" },
			{ text: "MUNICIPALITY WARD", value: "municipality_ward" },
			{ text: "VDC", value: "vdc" },
			{ text: "VDC WARD", value: "vdc_ward" },
			{ text: "CREATED AT", value: "created_at" },
			{ text: "ACTIONS", value: "actions", sortable: false }
		],
		branches: [],
		editedIndex: -1,
		viewIndex: -1,
		editedItem: {
			id: "",
			name: "",
			country: "",
			province: "",
			district: "",
			municipality: "",
			municipality_ward: "",
			vdc: "",
			vdc_ward: "",
			phone: Number,
			is_main: false,
			imageForUpload: Image
		},
		defaultItem: {},
		rules: [(value) => !value || value.size < 2000000 || "Image size should be less than 2 MB!"]
	}),

	computed: {
		formTitle() {
			if (this.viewIndex !== -1) return "View Branch Detail"
			return this.editedIndex === -1 ? "New Branch" : "Edit Branch"
		},
		formIcon() {
			if (this.viewIndex !== -1) return "mdi-home-city"
			return this.editedIndex === -1 ? "mdi-home-modern" : "mdi-home-edit"
		}
	},

	watch: {
		dialog(val) {
			val || this.close()
		}
	},

	created() {
		this.initialize()
	},

	methods: {
		initialize() {
			const now = new Date().toISOString().replace(/T/, " ").replace(/\..+/, "")
			this.branches = [
				{
					id: 1,
					name: "Pokhara Branch",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara-Lekhnath",
					municipality_ward: "Amarsingh",
					vdc: null,
					vdc_ward: null,
					phone: 9856325632,
					is_main: false,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 2,
					name: "Kathmandu Branch",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Baneshowr",
					vdc: null,
					vdc_ward: null,
					phone: 9858325632,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 3,
					name: "Humla Branch",
					country: "Nepal",
					province: "Province No. 1",
					district: "Humla",
					municipality: null,
					municipality_ward: null,
					vdc: "Aaglung",
					vdc_ward: "sldkf",
					phone: 9858325578,
					is_main: false,
					created_by: "raymz584",
					created_at: now,
					updated_by: "raymz584",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 4,
					name: "Pokhara Branch",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara-Lekhnath",
					municipality_ward: "Amarsingh",
					vdc: null,
					vdc_ward: null,
					phone: 9856325632,
					is_main: false,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 5,
					name: "Kathmandu Branch",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Baneshowr",
					vdc: null,
					vdc_ward: null,
					phone: 9858325632,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 6,
					name: "Humla Branch",
					country: "Nepal",
					province: "Province No. 1",
					district: "Humla",
					municipality: null,
					municipality_ward: null,
					vdc: "Aaglung",
					vdc_ward: "sldkf",
					phone: 9858325578,
					is_main: false,
					created_by: "raymz584",
					created_at: now,
					updated_by: "raymz584",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 7,
					name: "Pokhara Branch",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara-Lekhnath",
					municipality_ward: "Amarsingh",
					vdc: null,
					vdc_ward: null,
					phone: 9856325632,
					is_main: false,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 8,
					name: "Kathmandu Branch",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Baneshowr",
					vdc: null,
					vdc_ward: null,
					phone: 9858325632,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 9,
					name: "Humla Branch",
					country: "Nepal",
					province: "Province No. 1",
					district: "Humla",
					municipality: null,
					municipality_ward: null,
					vdc: "Aaglung",
					vdc_ward: "sldkf",
					phone: 9858325578,
					is_main: false,
					created_by: "raymz584",
					created_at: now,
					updated_by: "raymz584",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 10,
					name: "Pokhara Branch",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara-Lekhnath",
					municipality_ward: "Amarsingh",
					vdc: null,
					vdc_ward: null,
					phone: 9856325632,
					is_main: false,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 11,
					name: "Kathmandu Branch",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Baneshowr",
					vdc: null,
					vdc_ward: null,
					phone: 9858325632,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 12,
					name: "Humla Branch",
					country: "Nepal",
					province: "Province No. 1",
					district: "Humla",
					municipality: null,
					municipality_ward: null,
					vdc: "Aaglung",
					vdc_ward: "sldkf",
					phone: 9858325578,
					is_main: false,
					created_by: "raymz584",
					created_at: now,
					updated_by: "raymz584",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 13,
					name: "Pokhara Branch",
					country: "Nepal",
					province: "Gandaki Pradesh",
					district: "Kaski",
					municipality: "Pokhara-Lekhnath",
					municipality_ward: "Amarsingh",
					vdc: null,
					vdc_ward: null,
					phone: 9856325632,
					is_main: false,
					created_by: "kiran589",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 14,
					name: "Kathmandu Branch",
					country: "Nepal",
					province: "Bagmati Pradesh",
					district: "Kathmandu",
					municipality: "Kathmandu",
					municipality_ward: "Baneshowr",
					vdc: null,
					vdc_ward: null,
					phone: 9858325632,
					is_main: true,
					created_by: "bot25",
					created_at: now,
					updated_by: "bot25",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				},
				{
					id: 15,
					name: "Humla Branch",
					country: "Nepal",
					province: "Province No. 1",
					district: "Humla",
					municipality: null,
					municipality_ward: null,
					vdc: "Aaglung",
					vdc_ward: "sldkf",
					phone: 9858325578,
					is_main: false,
					created_by: "raymz584",
					created_at: now,
					updated_by: "raymz584",
					updated_at: now,
					image:
						"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				}
			]
		},

		editItem(item) {
			this.editedIndex = this.branches.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		showItem(item) {
			this.viewIndex = this.branches.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem(item) {
			const index = this.branches.indexOf(item)
			confirm("Are you sure you want to delete this branch?") && this.branches.splice(index, 1)
		},

		close() {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
				this.viewIndex = -1
			})
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.branches[this.editedIndex], this.editedItem)
			} else {
				this.branches.push(this.editedItem)
			}
			this.close()
		},

		routeToBranchDetailPage(itemId) {
			router.push({name: "SACHCHAI NEPAL BRANCH", params: { id: itemId }})
		}
	}
}
</script>

<style lang="sass" scoped>
.v-input--selection-controls
	margin-top: 0

.small-detail-icon
	margin-top: -4px
	margin-right: 4px

.v-card__title
	background-color: #535151 !important

.branch-name
	margin: 0
	padding: 0
	font-size: 18px
	font-weight: 300

.cursor
	cursor: pointer
</style>
