<template>
	<div>
		<profile-row />
		<header-toolbar />

		<v-card id="about-follower-card"
			class="ma-2"
			color="transparent"
		>
			<my-personal-info />
		</v-card>
	</div>
</template>
<script>
import ProfileRow from "@/views/profile/ProfileRow";
import HeaderToolbar from "@/views/profile/HeaderToolbar";
export default {
	name: "ProfileAboutTabView",
	components: {
		ProfileRow,
		HeaderToolbar,
		MyPersonalInfo: () => import("@/views/profile/MyPersonalInfo"),
	}
}
</script>
