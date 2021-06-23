<template>
	<v-list class="pa-0">
		<v-list-item-group>
			<v-list-item
				class="px-2"
				style="height: 80px;"
			>
				<v-list-item-avatar>
					<v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
				</v-list-item-avatar>

				<v-list-item-title>
					<h4>{{ $helper.getCurrentUser().username }}</h4>
				</v-list-item-title>
			</v-list-item>
			<v-divider />
			<v-list-group>
				<template #activator>
					<v-list-item-icon>
						<v-icon>mdi-account-circle</v-icon>
					</v-list-item-icon>
					<v-list-item-content class="nav-link">
						Profile
					</v-list-item-content>
				</template>
				<v-list-item v-for="(p, index) in personalInformation"
					:key="index"
					:to="p.to"
				>
					<v-list-item-icon>
						<v-icon size="22">
							{{ p.icon }}
						</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="nav-link"
						@click="$bus.emit('open-edit-profile-dialog')"
					>
						{{ p.text }}
					</v-list-item-title>
				</v-list-item>
			</v-list-group>
			<v-list-item
				v-for="item in items"
				:key="item.text"
				link
			>
				<v-list-item-icon>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>

				<v-list-item-content>
					<v-list-item-title class="nav-link">
						{{ item.text }}
					</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list-item-group>
	</v-list>
</template>

<script>
export default {
	name: "SidebarList",
	data: () => ({
		items: [
			{text: "Location", icon: "mdi-map-marker"},
			{text: "Branches", icon: "mdi-city"},
			{text: "Settings", icon: "mdi-camera-front-variant"},
			{text: "Feedbacks", icon: "mdi-surround-sound"},
			{text: "Contributions", icon: "mdi-bird"},
		],
		personalInformation: [
			{text: "About", icon: "mdi-information-variant", to: "/profile/home"},
			{text: "Edit", icon: "mdi-pencil", to: "/profile/edit-detail"},
			{text: "Password", icon: "mdi-lock-reset", to: "/profile/change-password"},
		]
	})
}
</script>

<style scoped>
.nav-link {
	font-size: .76rem;
	font-weight: 500;
	text-transform: uppercase;
}
</style>
