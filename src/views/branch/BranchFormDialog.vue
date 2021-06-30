<template>
	<v-dialog
		v-model="dialog"
		fullscreen
		hide-overlay
		close-delay="1000"
		open-delay="1000"
		transition="dialog-bottom-transition"
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
		<v-card
			tile
			color="rgb(251 250 241)"
		>
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
				/>
				<text-field
					v-model="editedItem.contact"
					label="Contact"
					name="contact"
					type="number"
					:errors="formErrors"
					icon="mdi-phone-classic"
				/>
				<text-area
					id="slogan"
					v-model="editedItem.slogan"
					icon="mdi-text"
					label="Slogan"
					name="slogan"
					counter="512"
					:errors="formErrors"
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
				/>
				<province-field
					id="province"
					v-model="editedItem.province"
					:country="editedItem.country"
					:district="editedItem.district"
					:errors="formErrors"
				/>
				<district-field
					id="district"
					v-model="editedItem.district"
					:province="editedItem.province"
					:municipality="editedItem.municipality"
					:vdc="editedItem.vdc"
					:errors="formErrors"
				/>
				<municipality-field
					id="municipality"
					v-model="editedItem.municipality"
					:district="editedItem.district"
					:ward="editedItem.municipality_ward"
					:vdc="editedItem.vdc"
					:errors="formErrors"
				/>
				<municipality-ward-field
					id="municipality-ward"
					v-model="editedItem.municipality_ward"
					:municipality="editedItem.municipality"
					:vdc="editedItem.vdc"
					:errors="formErrors"
				/>
				<vdc-field
					id="vdc"
					v-model="editedItem.vdc"
					:district="editedItem.district"
					:ward="editedItem.vdc_ward"
					:municipality="editedItem.municipality"
					:errors="formErrors"
				/>
				<vdc-ward-field
					id="vdc-ward"
					v-model="editedItem.vdc_ward"
					:municipality="editedItem.municipality"
					:vdc="editedItem.vdc"
					:errors="formErrors"
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
	</v-dialog>
</template>
<script>
import router from "@/router";
import {mapGetters} from "vuex";
import {getFormData} from "@/Helper";
import Snack from "@/mixins/Snack";
import AdminCreateEditFormMixin from "@/mixins/AdminCreateEditFormMixin";

export default {
	name: "BranchFormDialog",
	mixins: [
		Snack,
		AdminCreateEditFormMixin
	],
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
		},
		mixinData: {
			clearFormErrorAction: "branch/clearFormErrors"
		},
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
		async updateBranch(branchData) {
			const updated = await this.$store.dispatch(
				"branch/update",
				{
					id: this.editedItem.id,
					body: branchData
				}
			)
			if (updated) {
				this.closeCreateEditDialog()
				this.$bus.emit("reload")
				await this.openSnack("Branch updated successfully.", "success")
			} else {
				if (!this.formErrors["non_field_errors"]) {
					await this.openSnack("Branch update failed. Try again.")
				}
			}
		},

		async createBranch(branchData) {
			const created = await this.$store.dispatch("branch/create", {body: branchData})
			if (created) {
				this.closeCreateEditDialog()
				this.$bus.emit("reload")
				await this.openSnack("Branch added successfully.", "success")
			} else {
				if (!this.formErrors["non_field_errors"]) {
					await this.openSnack("Branch create failed. Please check your form and try again.")
				}
			}
		},

		async save() {
			const branchData = getFormData(this.editedItem)
			if (this.editedIndex > -1) {
				await this.updateBranch(branchData)
			} else {
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
