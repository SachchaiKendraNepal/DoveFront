<template>
	<tab-item-card value="tab-Photos">
		<template #content>
			<v-card-text>
				<h2>Photos</h2>
				This is photos tab
			</v-card-text>
		</template>
	</tab-item-card>
</template>
<script>
export default {
	name: "ProfilePhotosTabView",
	components: {
		TabItemCard: () => import("@/components/ProfileTabItem")
	}
}
</script>
