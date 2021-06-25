<template>
	<v-card tile
		flat
	>
		<v-card-title class="text-center justify-center py-6">
			<h1 class="font-weight-bold display-3 teal--text">
				GaLLeRy
			</h1>
		</v-card-title>
		<v-tabs
			v-model="tab"
			background-color="transparent"
			color="teal"
			grow
		>
			<v-tab
				v-for="(item, index) in items"
				:key="index"
			>
				{{ item.title }}
			</v-tab>
		</v-tabs>
		<div class="my-1" />

		<v-tabs-items v-model="tab">
			<v-tab-item>
				<profile-images />
			</v-tab-item>
			<v-tab-item>
				<cover-images />
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>
<script>
import ProfileImages from "@/views/profile/ProfileImages";
import CoverImages from "@/views/profile/CoverImages";

export default {
	name: "ProfilePhotosTabView",
	components: {CoverImages, ProfileImages},
	data(){
		return {
			tab: null,
			items: [
				{title: "Profile"},
				{title: "Cover"},
				{title: "Multimedia"},
				{title: "Article"},
				{title: "Event"},
			],
		}
	}

}
</script>
