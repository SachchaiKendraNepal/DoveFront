<template>
	<v-data-table
		id="branch-d-table"
		v-model="selected"
		:loading="isLoading"
		loading-text="Branches Loading..."
		calculate-widths
		:headers="headers"
		:items="branches"
		:search="search"
		multi-sort
		show-select
		:single-select="false"
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
					class="mx-4 search-branch"
					inset
					vertical
				/>
				<v-text-field
					v-model="search"
					class="search-branch"
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
					class="mx-4 search-branch"
					inset
					vertical
				/>
				<v-btn
					dark
					color="primary"
					@click="openAddEventFormDialog"
				>
					<v-icon
						dark
						:class="$vuetify.breakpoint.smAndUp ? 'mr-2' : ''"
					>
						mdi-plus-circle
					</v-icon>
					<span v-if="$vuetify.breakpoint.smAndUp">New Branch</span>
				</v-btn>
				<branch-form-dialog />
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
			<v-simple-checkbox
				v-model="item.is_main"
				color="primary"
				disabled
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.location="{ item }">
			<p
				class="mb-0"
			>
				<span style="color: #545454">
					{{ (item.vdc_ward) ? item.vdc_ward : item.municipality_ward }},&nbsp;
					{{ (item.vdc) ? item.vdc : item.municipality }},&nbsp;
				</span>
				<i>{{ item.district }},&nbsp;
					{{ item.province }},&nbsp;</i>
				<b>{{ item.country }}</b>
			</p>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.actions="{ item }">
			<v-icon
				v-ripple
				class="mr-2"
				color="primary"
				size="20"
				@click="openEditBranchFormDialog(item)"
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
	components: {
		BranchFormDialog: () => import("@/views/home/branch/BranchFormDialog")
	},
	data: () => ({
		search: "",
		selected: [],
		isLoading: false,
		headers: [
			{
				text: "PK",
				align: "start",
				value: "id"
			},
			{ text: "ACTIONS", value: "actions", sortable: false },
			{ text: "NAME", value: "name" },
			{ text: "PHONE", value: "phone" },
			{ text: "IS MAIN BRANCH", value: "is_main" },
			{ text: "LOCATION", value: "location" },
			{ text: "CREATED AT", value: "created_at" }
		],
		branches: [],
	}),

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

		openAddEventFormDialog() {
			this.$bus.emit("open-branch-form-dialog-add-item")
		},

		openEditBranchFormDialog(item) {
			this.$bus.emit("open-branch-form-dialog-edit-item", {
				editedIndex: this.branches.indexOf(item),
				editedItem: Object.assign({}, item),
			})
		},

		deleteItem(item) {
			const index = this.branches.indexOf(item)
			confirm("Are you sure you want to delete this branch?") && this.branches.splice(index, 1)
		},

		routeToBranchDetailPage(itemId) {
			router.push({name: "BRANCH ADMINISTRATION", params: { id: itemId }})
		}
	}
}
</script>

<style lang="sass" scoped>
.branch-name
	margin: 0
	padding: 0
	font-size: 18px
	font-weight: 300

.cursor
	cursor: pointer
.search-branch
	display: block
	@media only screen and (max-width: 315px)
		display: none
</style>
