<template>
	<v-data-table
		:headers="permissionHeaders"
		:items="permissionItems"
		item-key="name"
		class="elevation-1"
		hide-default-footer
	>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.view="{ item }">
			<v-checkbox
				v-model="item.view"
				dense
				readonly
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.create="{ item }">
			<v-checkbox
				v-model="item.create"
				dense
				readonly
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.edit="{ item }">
			<v-checkbox
				v-model="item.edit"
				dense
				readonly
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.delete="{ item }">
			<v-checkbox
				v-model="item.delete"
				dense
				readonly
			/>
		</template>
		<!-- eslint-disable-next-line vue/valid-v-slot-->
		<template #item.approve="{ item }">
			<v-checkbox
				v-model="item.approve"
				dense
				readonly
			/>
		</template>
	</v-data-table>
</template>
<script>
export default {
	name: "PermissionTableComponent",
	data: () => ({
		permissionHeaders:  [
			{ text: "Models", value: "model" },
			{ text: "View", value: "view" },
			{ text: "Create", value: "create" },
			{ text: "Edit", value: "edit" },
			{ text: "Delete", value: "delete" },
			{ text: "Approve", value: "approve" },
		],
		permissionItems: [
			{
				model: "Follower",
				view: true,
				create: true,
				edit: true,
				delete: true,
			},
			{
				model: "Member",
				view: true,
				create: false,
				edit: false,
				delete: true,
				approve: false
			},
			{
				model: "Branch",
				view: true,
				create: false,
				edit: false,
				delete: true,
				approve: false
			},
			{
				model: "Multimedia",
				view: true,
				create: false,
				edit: false,
				delete: true,
				approve: false
			},
			{
				model: "Article",
				view: true,
				create: false,
				edit: false,
				delete: true,
				approve: false
			},
			{
				model: "Event",
				view: true,
				create: false,
				edit: false,
				delete: true,
				approve: false
			}
		],
	})
}
</script>
<style lang="sass">

</style>
