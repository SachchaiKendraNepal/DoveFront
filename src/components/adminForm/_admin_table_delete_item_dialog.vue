<template>
	<v-dialog v-model="dialogDelete"
		dark
		max-width="520"
	>
		<v-card>
			<v-card-title class="delete-confirm-title">
				<div class="delete-confirm-message">
					Are you sure you want to delete {{ modelName }} <span>{{ itemText }}</span>?
				</div>
			</v-card-title>
			<v-card-actions>
				<v-spacer />
				<v-btn color="error darken-1"
					text @click="closeDelete"
				>
					Cancel
				</v-btn>
				<v-btn color="blue darken-1"
					text @click="deleteItem"
				>
					OK
				</v-btn>
				<v-spacer />
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>

import Snack from "@/mixins/Snack";

export default {
	name: "AdminTableDeleteItemDialog",
	mixins: [Snack],
	props: {
		modelName: {
			type: String,
			required: true
		},
		deleteAction: {
			type: String,
			required: true
		}
	},
	data() {
		return {
			dialogDelete: false,
			itemIdToDelete: null,
			itemText: null
		}
	},
	created() {
		this.$bus.on("openAdminDeleteDialog", this.initialize)
	},
	beforeUnmount() {
		this.$bus.off("openAdminDeleteDialog")
	},
	methods: {
		initialize(args) {
			this.itemIdToDelete = args.itemId
			this.itemText = args.itemText
			this.openDialog()
		},
		openDialog() {
			this.dialogDelete = true
		},
		closeDelete() {
			this.dialogDelete = false
		},
		async deleteItem() {
			if (!this.itemIdToDelete) return;
			const deleted = await this.$store.dispatch(this.deleteAction, {id: this.itemIdToDelete})
			if (deleted) {
				await this.openSnack(`${this.modelName} deleted successfully.`, "success")
				this.$bus.emit("reload")
			}
			else await this.openSnack(`${this.modelName} delete failed. Try again later.`)
			this.itemIdToDelete = null
			this.closeDelete()
		}
	}
}
</script>

<style scoped lang="scss">
.delete-confirm-title {
	display: flex;
	justify-content: center;
}
.delete-confirm-message {
	text-align: center;
	font-size: 1rem;
	span {
		background: #3b3b3b;
		padding: 4px;
		border-radius: 4px;
		margin-right: 3px;
	}
}
</style>
