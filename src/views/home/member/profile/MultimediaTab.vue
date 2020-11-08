<template>
	<tab-item-card value="tab-Multimedia">
		<template #content>
			<v-card-text>
				<h2>Videos</h2>
				This is videos tab
			</v-card-text>
		</template>
	</tab-item-card>
</template>
<script>
export default {
	name: "ProfileMultimediaTabView",
	components: {
		TabItemCard: () => import("@/components/ProfileTabItem")
	}
}
</script>
