<template>
	<v-card flat>
		<v-list two-line>
			<v-list-item-group
				v-for="(item, i) in personalItems"
				:key="i"
			>
				<v-list-item>
					<v-list-item-icon v-show="
						$vuetify.breakpoint.width > 405
					"
					>
						<v-icon
							color="indigo"
						>
							{{ item.icon }}
						</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title class="wrap-title">
							{{ item.value }}
						</v-list-item-title>
						<v-list-item-subtitle>{{ item.field }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
				<v-divider
					v-if="i < personalItems.length - 1"
					:key="i"
					inset
				/>
			</v-list-item-group>
		</v-list>
	</v-card>
</template>

<script>
export default {
	name: "MyPersonalInfo",
	data: () => ({
	}),
	computed: {
		currentUser() {
			return this.$helper.getCurrentUser()
		},
		getFullName() {
			if (!this.currentUser.first_name || !this.currentUser.last_name) return "Not Set"
			return `${this.currentUser.first_name} ${this.currentUser.last_name}`
		},
		personalItems() {
			return [
				{icon: "mdi-text-shadow", field: "Full Name", value: this.getFullName},
				{icon: "mdi-phone", field: "Phone number", value: this.getValue(this.currentUser.profile.contact) },
				{icon: "mdi-account", field: "Username", value: this.getValue(this.currentUser.username)},
				{icon: "mdi-email", field: "Email address", value: this.getValue(this.currentUser.email)},
				{icon: "mdi-map-marker", field: "Current City", value: this.getValue(this.currentUser.profile.current_city)},
				{icon: "mdi-google-maps", field: "Home City", value: this.getValue(this.currentUser.profile.home_town)},
				{icon: "mdi-cake-variant", field: "Birthday", value: this.getValue(this.currentUser.profile.birth_date)},
				{icon: "mdi-star", field: "Status", value: (this.currentUser.is_active) ? "Is Active" : "Not Active"},
				{icon: "mdi-calendar", field: "Date Joined", value: this.$moment(this.currentUser.date_joined).fromNow()},
			]
		},
	},
	methods: {
		getValue(value) {
			if (!value) return "Not Set"
			return value
		},
	}
}
</script>

<style scoped>

</style>
