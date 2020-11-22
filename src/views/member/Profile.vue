<template>
	<div id="profile-container">
		<v-tabs-items
			v-model="currentItem"
		>
			<posts-tab />
			<about-tab />
			<photos-tab />
			<multimedia-tab />
		</v-tabs-items>
	</div>
</template>
<script>
export default {
	name: "ProfileView",
	components: {
		PostsTab: () => import("@/views/member/profile/PostsTab"),
		AboutTab: () => import("@/views/member/profile/AboutTab"),
		PhotosTab: () => import("@/views/member/profile/PhotosTab"),
		MultimediaTab: () => import("@/views/member/profile/MultimediaTab"),
	},
	data: () => ({

	}),
	methods: {

	},
}
</script>
<style lang="sass" scoped>
</style>
