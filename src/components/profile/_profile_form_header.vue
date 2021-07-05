<template>
	<v-toolbar
		class="profile-form-header elevation-1"
		height="50"
		flat tile
	>
		<v-app-bar-nav-icon>
			<v-icon>
				{{ icon }}
			</v-icon>
		</v-app-bar-nav-icon>
		<v-toolbar-title class="form-header-title pa-0">
			{{ title.toUpperCase() }}
		</v-toolbar-title>
	</v-toolbar>
</template>
<script>
export default {
	name: "ProfileFormHeader",
	props: {
		icon: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	}
}
</script>
<style lang="scss">
.profile-form-header {
	background-color: #ceecff !important;
	margin: 30px 4px;
	.form-header-title {
		font-size: .875rem !important;
	}
}
</style>
