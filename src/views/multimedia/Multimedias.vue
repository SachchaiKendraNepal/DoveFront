<template>
	<v-data-table
		:loading="loadingMultimedias"
		loading-text="Fetching multimedias from server"
		:headers="multimediaListHeaders"
		:items="multimedias"
		item-key="name"
		class="elevation-3 mx-12 my-6"
	>
		<template #top>
			<v-toolbar flat
				color="grey lighten-2"
			>
				<v-app-bar-nav-icon>
					<v-avatar class="nav-avatar elevation-4 ma-1"
						size="38"
					>
						<v-icon class="mx-0">
							mdi-video
						</v-icon>
					</v-avatar>
				</v-app-bar-nav-icon>
				<v-toolbar-title class="text-uppercase table-title mx-0 px-0">
					Sachchai Nepal Multimedias
				</v-toolbar-title>
				<v-spacer />
				<v-icon>mdi-star</v-icon>
			</v-toolbar>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.approval_status="{ item }">
			<v-switch v-model="item.is_approved"
				color="grey darken-2"
				disabled
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.actions="{ item }">
			<v-icon
				v-if="!item.is_approved"
				small
				color="green"
				class="mr-2"
				@click="updateMultimediaApproval(item)"
			>
				mdi-check
			</v-icon>
			<v-icon
				v-if="item.is_approved"
				small
				color="red"
				class="mr-2"
				@click="updateMultimediaApproval(item)"
			>
				mdi-close
			</v-icon>
			<v-icon
				color="blue"
				small
				class="mr-2"
				@click="editMultimedia(item)"
			>
				mdi-pencil
			</v-icon>
			<v-icon
				small
				color="red"
				@click="deleteMultimedia(item)"
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
import {mapGetters} from "vuex";

export default {
	name: "MultimediaView",
	data() {
		return {
			loadingMultimedias: false,
			multimediaListHeaders: [
				{ text: "Actions", value: "actions", sortable: false },
				{ text: "ID", value: "id" },
				{ text: "Title", value: "title" },
				{ text: "Author", value: "uploaded_by.username" },
				{ text: "Status", value: "approval_status" },
				{ text: "Approver", value: "approved_by.username" },
				{ text: "Created At", value: "uploaded_at" },
			]
		}
	},
	computed: {
		... mapGetters({
			multimedias: "multimedia/allMultimedias"
		})
	},
	async created() {
		await this.initialize()
	},
	methods: {
		async initialize() {
			this.loadingMultimedias = true
			await this.$store.dispatch("multimedia/getAll")
			this.loadingMultimedias = false
		},
		async openSnack(text, color="error") {
			await this.$store.dispatch("snack/setSnackState", true)
			await this.$store.dispatch("snack/setSnackColor", color)
			await this.$store.dispatch("snack/setSnackText", text)
		},
		async updateMultimediaApproval(item) {
			const response = await this.$store.dispatch("multimedia/approve", {id: item.id})
			if (response) {
				await this.openSnack("Multimedia approval updated successfully.", "success")
				await this.initialize()
			}
			else await this.openSnack("Multimedia approval update failed. Please try again.")
		},
		async editMultimedia(item) {

		},
		async deleteMultimedia(item) {

		}
	}
}
</script>
<style lang="sass" scoped>

</style>
