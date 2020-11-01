<template>
	<v-card
		class="mx-auto mt-3"
		max-width="500"
	>
		<v-list color="blue darken-4"
			dark
		>
			<v-list-group
				v-for="item in items"
				:key="item.title"
				v-model="item.active"
				active-class="light-blue--text"
				:prepend-icon="item.action"
				no-action
			>
				<template #activator>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</template>

				<v-list-item
					v-for="child in item.items"
					:key="child.title"
				>
					<v-list-item-content>
						<v-list-item-title v-text="child.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list-group>
		</v-list>
	</v-card>
</template>
<script>
export default {
	name: "QuickLinksComponent",
	data: () => ({
		items: [
			{
				action: "mdi-ticket",
				items: [{ title: "List Item" }],
				title: "Attractions",
			},
			{
				action: "mdi-silverware-fork-knife",
				active: false,
				items: [
					{ title: "Breakfast & brunch" },
					{ title: "New American" },
					{ title: "Sushi" },
				],
				title: "Dining",
			},
			{
				action: "mdi-school",
				items: [{ title: "List Item" }],
				title: "Education",
			},
			{
				action: "mdi-run",
				items: [{ title: "List Item" }],
				title: "Family",
			},
			{
				action: "mdi-bottle-tonic-plus",
				items: [{ title: "List Item" }],
				title: "Health",
			},
			{
				action: "mdi-content-cut",
				items: [{ title: "List Item" }],
				title: "Office",
			},
			{
				action: "mdi-tag",
				items: [{ title: "List Item" }],
				title: "Promotions",
			},
		]
	})
}
</script>
