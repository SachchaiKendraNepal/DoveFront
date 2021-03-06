<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		close-delay="1000"
		open-delay="1000"
		transition="dialog-bottom-transition"
	>
		<v-card
			tile flat
			color="rgb(251 250 241)"
			max-width="1000"
		>
			<v-toolbar class="grey darken-3">
				<v-app-bar-nav-icon>
					<v-avatar size="36"
						color="grey"
					>
						<v-icon
							color="white"
							size="22"
						>
							{{ formIcon() }}
						</v-icon>
					</v-avatar>
				</v-app-bar-nav-icon>
				<v-toolbar-title class="form-title">
					{{ formTitle('Branch') }}
				</v-toolbar-title>
				<v-spacer />
				<v-btn
					dark
					fab
					x-small
					@click="closeCreateEditDialog"
				>
					<v-icon>mdi-close</v-icon>
				</v-btn>
			</v-toolbar>
			<div class="py-6" />
			<v-card tile flat
				color="transparent"
				class="mx-auto" max-width="1000"
			>
				<v-list v-if="editedIndex !== -1"
					max-width="950"
					class="mx-auto"
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
								<span class="px-1">{{ $moment(editedItem.created_at).format("MMMM Do YYYY") }}</span>
							</p>
							<p class="mb-0 mb-2">
								<v-icon class="small-detail-icon">
									mdi-plus
								</v-icon>
								<b>Created by:</b>
								<span v-if="editedItem.created_by"
									class="px-1"
								>
									{{ editedItem.created_by.username }}
								</span>
							</p>
							<p class="mb-0 mb-2">
								<v-icon class="small-detail-icon">
									mdi-account-network
								</v-icon>
								<b>Total Members:</b>
								<span class="px-1">Not implemented yet</span>
							</p>
							<p class="mb-0">
								<v-icon class="small-detail-icon">
									mdi-pencil
								</v-icon>
								<b>Last Updated By:</b>
								<span v-if="editedItem.updated_by"
									class="px-1"
								>
									{{ editedItem.updated_by.username }}
								</span>
								<span v-else
									class="px-1"
								>
									None
								</span>
							</p>
						</v-list-item-content>
					</v-list-item>
				</v-list>
				<v-row class="ma-0 pa-0 px-4">
					<admin-form-group-title
						icon="mdi-city-variant"
						text="Branch Information"
					/>
					<text-field
						id="branch-name"
						v-model="editedItem.name"
						label="Name"
						name="name"
						:errors="formErrors"
						icon="mdi-form-textbox"
						counter="64"
						@change="patchBranch({name: editedItem.name})"
					/>
					<text-field
						v-model="editedItem.contact"
						label="Contact"
						name="contact"
						type="number"
						:errors="formErrors"
						icon="mdi-phone-classic"
						@change="patchBranch({contact: editedItem.contact})"
					/>
					<text-area
						id="slogan"
						v-model="editedItem.slogan"
						icon="mdi-text"
						label="Slogan"
						name="slogan"
						counter="512"
						:errors="formErrors"
						@change="patchBranch({slogan: editedItem.slogan})"
					/>

					<admin-form-group-title
						icon="mdi-map-marker"
						text="Location Information"
					/>

					<country-field
						id="country"
						v-model="editedItem.country"
						:province="editedItem.province"
						:errors="formErrors"
						@change="patchBranch({country: editedItem.country})"
					/>
					<province-field
						id="province"
						v-model="editedItem.province"
						:country="editedItem.country"
						:district="editedItem.district"
						:errors="formErrors"
						@change="patchBranch({province: editedItem.province})"
					/>
					<district-field
						id="district"
						v-model="editedItem.district"
						:province="editedItem.province"
						:municipality="editedItem.municipality"
						:vdc="editedItem.vdc"
						:errors="formErrors"
						@change="patchBranch({district: editedItem.district})"
					/>
					<municipality-field
						id="municipality"
						v-model="editedItem.municipality"
						:district="editedItem.district"
						:ward="editedItem.municipality_ward"
						:vdc="editedItem.vdc"
						:errors="formErrors"
						@change="patchBranch({municipality: editedItem.municipality})"
					/>
					<municipality-ward-field
						id="municipality-ward"
						v-model="editedItem.municipality_ward"
						:municipality="editedItem.municipality"
						:vdc="editedItem.vdc"
						:errors="formErrors"
						@change="patchBranch({municipality_ward: editedItem.municipality_ward})"
					/>
					<vdc-field
						id="vdc"
						v-model="editedItem.vdc"
						:district="editedItem.district"
						:ward="editedItem.vdc_ward"
						:municipality="editedItem.municipality"
						:errors="formErrors"
						@change="patchBranch({vdc: editedItem.vdc})"
					/>
					<vdc-ward-field
						id="vdc-ward"
						v-model="editedItem.vdc_ward"
						:municipality="editedItem.municipality"
						:vdc="editedItem.vdc"
						:errors="formErrors"
						@change="patchBranch({vdc_ward: editedItem.vdc_ward})"
					/>

					<v-col cols="12"
						class="pb-16"
					>
						<v-card-actions>
							<v-spacer />
							<v-btn
								color="red lighten-5"
								class="red--text"
								depressed
								@click="closeCreateEditDialog"
							>
								Cancel
							</v-btn>
							<v-btn
								v-if="editedIndex === -1"
								color="blue lighten-5"
								class="blue--text"
								depressed
								@click="save"
							>
								Save
							</v-btn>
						</v-card-actions>
					</v-col>
				</v-row>
			</v-card>
		</v-card>
	</v-dialog>
</template>
<script>
import router from "@/router";
import {mapGetters} from "vuex";
import {getFormData} from "@/Helper";
import Snack from "@/mixins/Snack";
import AdminCreateEditFormMixin from "@/mixins/AdminCreateEditFormMixin";
import PatchMixin from "@/mixins/PatchMixin.js";

export default {
	name: "BranchFormDialog",
	mixins: [
		Snack,
		PatchMixin,
		AdminCreateEditFormMixin
	],
	emits: ["reload"],
	data: () => ({
		model: "branch",
		editedItem: {
			id: null,
			cover_image: null,
			name: null,
			country: null,
			province: null,
			district: null,
			municipality: null,
			municipality_ward: null,
			vdc: null,
			vdc_ward: null,
			contact: null,
			is_main: false,
			is_approved: false,
			imageForUpload: []
		},
		defaultItem: {
			country: null,
			province: null,
			district: null,
			municipality: null,
			municipality_ward: null,
			vdc: null,
			vdc_ward: null,
		}
	}),
	computed: {
		...mapGetters({
			formErrors: "branch/formErrors"
		})
	},
	async created() {
		this.$bus.on("open-branch-form-dialog-add-item", this.openCreateDialog)
		this.$bus.on("open-branch-form-dialog-edit-item", this.openEditDialog)
	},
	beforeUnmount() {
		this.$bus.off("open-branch-form-dialog-add-item")
		this.$bus.off("open-branch-form-dialog-edit-item")
	},
	methods: {
		async patchBranch(body) {
			if (this.editedIndex > -1)
				await this.patch("branch", this.editedItem.id, body)
		},

		async createBranch(branchData) {
			const created = await this.$store.dispatch("branch/create", {body: branchData})
			if (created) {
				this.closeCreateEditDialog()
				this.$emit("reload")
				await this.openSnack("Branch added successfully.", "success")
			} else {
				if (!this.formErrors["non_field_errors"]) {
					await this.openSnack("Branch create failed. Please check your form and try again.")
				}
			}
		},

		async save() {
			const branchData = getFormData(this.editedItem)
			if (this.editedIndex === -1) {
				await this.createBranch(branchData)
			}
		},

		routeToBranchDetailPage(itemId) {
			router.push({name: "SACHCHAI NEPAL BRANCH", params: { id: itemId }})
		}
	},
}
</script>
<style lang="sass" scoped>
.v-input--selection-controls
	margin-top: 0

.small-detail-icon
	margin-top: -4px
	margin-right: 4px

.branch-name
	margin: 0
	padding: 0
	font-size: 18px
	font-weight: 300
</style>
