<template>
	<v-list class="pa-0">
		<v-list-item-group>
			<v-list-item
				class="px-2"
				style="height: 80px;"
			>
				<v-list-item-avatar v-if="$helper.getCurrentProfileImage()">
					<v-img
						:src="$helper.getCurrentProfileImage()"
					/>
				</v-list-item-avatar>
				<v-list-item-avatar
					v-else
					color="blue"
					class="ma-0 pa-0 d-flex justify-center"
				>
					<span class="headline white--text">
						{{ $helper.getCurrentUser().username[0].toUpperCase() }}
					</span>
				</v-list-item-avatar>
				<div class="px-2" />

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
					@click="$bus.emit('close-sidebar')"
				>
					<v-list-item-icon>
						<v-icon size="22">
							{{ p.icon }}
						</v-icon>
					</v-list-item-icon>
					<v-list-item-title class="nav-link">
						{{ p.text }}
					</v-list-item-title>
				</v-list-item>
			</v-list-group>
			<v-list-item
				v-for="item in items"
				:key="item.text"
				link
				:to="item.to"
				@click="$bus.emit('close-sidebar')"
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
			{text: "Location", icon: "mdi-map-marker", to: "/profile/location"},
			{text: "Branches", icon: "mdi-city", to: "/profile/branch"},
			{text: "Membership", icon: "mdi-camera-front-variant", to: "/profile/membership"},
			{text: "Feedbacks", icon: "mdi-surround-sound", to: "/profile/feedback"},
			{text: "Contributions", icon: "mdi-bird", to: "/profile/contribution"},
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
