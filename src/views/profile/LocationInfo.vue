<template>
	<div>
		<header-toolbar />

		<v-card id="about-follower-card"
			class="ma-2"
			color="transparent"
		>
			<profile-list :items="locationInfoItems" />
		</v-card>
	</div>
</template>
<script>
import HeaderToolbar from "@/views/profile/HeaderToolbar";
import ProfileList from "@/components/ProfileList";

export default {
	name: "LocationInfo",
	components: {
		ProfileList,
		HeaderToolbar,
	},
	computed: {
		currentUser() {
			return this.$helper.getCurrentUser()
		},
		locationInfoItems() {
			return [
				{ icon: "mdi-web", field: "country", value: this.getLocationValue(this.currentUser.profile.country)},
				{ icon: "mdi-office-building-marker-outline", field: "province", value: this.getLocationValue(this.currentUser.profile.province)},
				{ icon: "mdi-map-marker-multiple-outline", field: "district", value: this.getLocationValue(this.currentUser.profile.district)},
				{ icon: "mdi-google-maps", field: "municipality", value: this.getLocationValue(this.currentUser.profile.municipality)},
				{ icon: "mdi-numeric", field: "municipality_ward", value: this.getLocationValue(this.currentUser.profile.municipality_ward)},
				{ icon: "mdi-google-maps", field: "vdc", value: this.getLocationValue(this.currentUser.profile.vdc)},
				{ icon: "mdi-numeric", field: "vdc_ward", value: this.getLocationValue(this.currentUser.profile.vdc_ward)},
			]
		}
	},
	methods: {
		getLocationValue(val) {
			if(val) return val.name
			else return "Not set"
		},
	}
}
</script>
