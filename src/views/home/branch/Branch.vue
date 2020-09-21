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
		<template v-slot:top>
			<v-toolbar flat color="grey lighten-2">
				<v-icon size="30" class="mr-2">mdi-city-variant</v-icon>
				<v-toolbar-title>Sachchai Branches</v-toolbar-title>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-text-field
					solo
					dense
					hide-details
					v-model="search"
					label=""
					name="search"
					prepend-inner-icon="mdi-magnify"
					clearable
					placeholder="Search"
				/>
				<v-spacer />
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-dialog v-model="dialog" max-width="500px">
					<template v-slot:activator="{ on, attrs }">
						<v-btn dark v-on="on" v-bind="attrs" color="primary">
							<v-icon dark :class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''">
								mdi-plus-circle</v-icon
							>
							<span v-if="$vuetify.breakpoint.smAndUp">New Branch</span>
						</v-btn>
					</template>
					<v-card color="rgb(251 250 241)">
						<v-card-title>
							<v-icon size="40" class="mr-4">{{ formIcon }}</v-icon>
							<span class="headline">{{ formTitle }}</span>
						</v-card-title>
						<v-divider />
						<v-card-text>
							<v-container>
								<v-row>
									<v-col cols="12" class="pl-0">
										<p class="heading ma-0 pa-0">
											<v-icon class="pb-1">mdi-city-variant</v-icon>
											Branch Information
										</p>
										<v-divider />
									</v-col>
									<v-col cols="12" class="ma-0 pa-0">
										<v-text-field
											id="branch-name"
											class="ma-0"
											outlined
											dense
											clearable
											label="Name"
											v-model="editedItem.name"
											prepend-inner-icon="mdi-form-textbox"
										/>
									</v-col>
									<v-col cols="12" class="ma-0 pa-0">
										<v-text-field
											id="branch-phone"
											class="ma-0"
											dense
											outlined
											clearable
											label="Phone"
											type="number"
											v-model="editedItem.phone"
											prepend-inner-icon="mdi-phone-classic"
										/>
									</v-col>
									<v-col cols="12" class="ma-0 pa-0">
										<v-checkbox
											id="is_main"
											label="Is Main Branch?"
											v-model="editedItem.is_main"
											append-icon="mdi-map-marker-star-outline"
										/>
									</v-col>
									<v-col cols="12" class="pl-0">
										<p class="heading ma-0 pa-0">
											<v-icon class="pb-1">mdi-map-marker</v-icon>
											Location Information
										</p>
										<v-divider />
									</v-col>
									<v-col cols="12" class="ma-0 pa-0">
										<v-select
											id="branch-country"
											class="ma-0"
											dense
											outlined
											clearable
											label="Country"
											:items="countries"
											v-model="editedItem.country"
											prepend-inner-icon="mdi-web"
										/>
									</v-col>
									<v-col cols="12" class="ma-0 pa-0">
										<v-select
											id="branch-province"
											class="ma-0"
											dense
											outlined
											clearable
											label="Province"
											:items="provinces"
											v-model="editedItem.country"
											prepend-inner-icon="mdi-office-building-marker-outline"
										/>
									</v-col>
									<v-col cols="12" class="ma-0 pa-0">
										<v-select
											id="branch-districts"
											class="ma-0"
											dense
											outlined
											clearable
											:items="districts"
											label="District"
											v-model="editedItem.district"
											prepend-inner-icon="mdi-map-marker-multiple-outline"
										/>
									</v-col>
									<v-col cols="12" class="ma-0 pa-0" v-if="!editedItem.vdc">
										<v-select
											id="branch-municipality"
											class="ma-0"
											dense
											outlined
											clearable
											label="Municipality"
											:items="municipalities"
											v-model="editedItem.municipality"
											prepend-inner-icon="mdi-google-maps"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
										v-if="editedItem.municipality"
									>
										<v-select
											id="branch-municipality-ward"
											class="ma-0"
											dense
											outlined
											clearable
											label="Municipality Ward"
											:items="municipality_wards"
											prepend-inner-icon="mdi-numeric"
											v-model="editedItem.municipality_ward"
										/>
									</v-col>
									<v-col
										cols="12"
										class="ma-0 pa-0"
										v-if="!editedItem.municipality"
									>
										<v-select
											id="branch-vdc"
											class="ma-0"
											dense
											outlined
											clearable
											label="VDC"
											:items="vdcs"
											v-model="editedItem.vdc"
											prepend-inner-icon="mdi-home-map-marker"
										/>
									</v-col>
									<v-col cols="12" class="ma-0 pa-0" v-if="editedItem.vdc">
										<v-select
											id="branch-vdc-ward"
											class="ma-0"
											dense
											outlined
											clearable
											label="VDC Ward"
											:items="vdc_wards"
											v-model="editedItem.vdc_ward"
											prepend-inner-icon="mdi-numeric"
										/>
									</v-col>
								</v-row>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="red lighten-5"
								class="red--text"
								depressed
								@click="close"
								>Cancel</v-btn
							>
							<v-btn
								color="blue lighten-5"
								class="blue--text"
								depressed
								@click="save"
								>Save</v-btn
							>
						</v-card-actions>
					</v-card>
				</v-dialog>
			</v-toolbar>
		</template>
		<template v-slot:item.is_main="{ item }">
			<v-switch v-model="item.is_main" color="primary" />
		</template>
		<template v-slot:item.actions="{ item }">
			<v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
			<v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
		</template>
		<template v-slot:no-data>
			<v-btn color="primary" @click="initialize">Reset</v-btn>
		</template>
	</v-data-table>
</template>
<style lang="sass" scoped>
.v-input--selection-controls
	margin-top: 0
</style>
<script>
export default {
	name: "BranchTable",
	data: () => ({
		countries: [
			"Nepal",
			"India",
			"Bhutan",
			"Pakistan",
			"Singapore",
			"HongKong"
		],
		provinces: [
			"Bagmati Pradesh",
			"Gandaki Pradesh",
			"Uttar Pradesh",
			"Goa",
			"Province 1"
		],
		districts: [
			"Kaski",
			"Kathmandu",
			"Humla",
			"Jhapa",
			"Chitwan",
			"Sarlahi",
			"Nepalgunj"
		],
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
			{ text: "COUNTRY", value: "country" },
			{ text: "PROVINCE", value: "province" },
			{ text: "DISTRICT", value: "district" },
			{ text: "MUNICIPALITY", value: "municipality" },
			{ text: "MUNICIPALITY WARD", value: "municipality_ward" },
			{ text: "VDC", value: "vdc" },
			{ text: "VDC WARD", value: "vdc_ward" },
			{ text: "PHONE", value: "phone" },
			{ text: "IS MAIN BRANCH", value: "is_main" },
			{ text: "CREATED BY", value: "created_by" },
			{ text: "CREATED AT", value: "created_at" },
			{ text: "MODIFIED BY", value: "updated_by" },
			{ text: "MODIFIED AT", value: "updated_at" },
			{ text: "ACTIONS", value: "actions", sortable: false }
		],
		branches: [],
		editedIndex: -1,
		editedItem: {
			name: "",
			country: "",
			province: "",
			district: "",
			municipality: "",
			municipality_ward: "",
			vdc: "",
			vdc_ward: "",
			phone: Number,
			is_main: false
		},
		defaultItem: {}
	}),

	computed: {
		formTitle() {
			return this.editedIndex === -1 ? "New Branch" : "Edit Branch"
		},
		formIcon() {
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
					updated_at: now
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
					updated_at: now
				},
				{
					id: 3,
					name: "Humla Branch",
					country: "Nepal",
					province: "Province No. 1",
					district: "Humla",
					municipality: null,
					municipality_ward: null,
					vdc: "Humlee",
					vdc_ward: "Humlii",
					phone: 9858325578,
					is_main: false,
					created_by: "raymz584",
					created_at: now,
					updated_by: "raymz584",
					updated_at: now
				}
			]
		},

		editItem(item) {
			this.editedIndex = this.branches.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem(item) {
			const index = this.branches.indexOf(item)
			confirm("Are you sure you want to delete this branch?") &&
				this.branches.splice(index, 1)
		},

		close() {
			this.dialog = false
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem)
				this.editedIndex = -1
			})
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.branches[this.editedIndex], this.editedItem)
			} else {
				this.branches.push(this.editedItem)
			}
			this.close()
		}
	}
}
</script>
