<template>
	<v-list color="transparent">
		<v-list-item class="pl-2">
			<v-list-item-avatar
				v-if="$helper.getCurrentProfileImage()"
			>
				<v-img
					:src="$helper.getCurrentProfileImage()"
				/>
			</v-list-item-avatar>
			<v-list-item-avatar
				v-else
				color="grey lighten-2"
			>
				<span class="headline grey--text text--darken-1">
					{{ $helper.getCurrentUserInitials() }}
				</span>
			</v-list-item-avatar>
			<v-list-item-content class="py-0">
				<v-list-item-title class="title">
					{{ currentUser.first_name }} {{ currentUser.last_name }}
				</v-list-item-title>
				<v-list-item-subtitle>{{ currentUser.email }}</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>

		<v-divider class="my-2 mx-4" />
		<v-list-item
			v-for="(item, index) in drawerItems"
			:key="index"
			:to="item.to"
			link
		>
			<v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
			<v-list-item-content>
				<v-list-item-title>{{ item.title }}</v-list-item-title>
			</v-list-item-content>
		</v-list-item>
		<v-list-group
			v-for="drawerGroup in drawerGroupItems"
			:key="drawerGroup.name"
			:value="false"
		>
			<template #prependIcon>
				<v-icon>
					{{ drawerGroup.icon }}
				</v-icon>
			</template>
			<template #activator>
				<v-list-item-content>
					<v-list-item-title>{{ drawerGroup.name }}</v-list-item-title>
				</v-list-item-content>
			</template>
			<v-list-item v-for="(item) in drawerGroup.items"
				:key="item.to"
				:to="item.to"
				link
			>
				<v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list-group>
	</v-list>
</template>

<script>
export default {
	name: "AdminSidebar",
	data: () => ({
		drawerItems: [
			{ title: "Home", icon: "mdi-home", to: "/admin/home" },
			{ title: "Follower", icon: "mdi-account-multiple", to: "/admin/follower" },
			{ title: "Member", icon: "mdi-account-tie", to: "/admin/member" },
			{ title: "Branch", icon: "mdi-city", to: "/admin/branch" },
			{ title: "Article", icon: "mdi-post", to: "/admin/article" },
			{ title: "Multimedia", icon: "mdi-video-vintage", to: "/admin/multimedia" },
			{ title: "Events", icon: "mdi-calendar-multiple", to: "/admin/event" },
			{ title: "Advertisements", icon: "mdi-cash-usd", to: "/admin/ad" },
			{ title: "About Us", icon: "mdi-information", to: "/admin/about-us" },
			{ title: "Contact Us", icon: "mdi-phone", to: "/admin/contact-us" },
			{ title: "Feedbacks", icon: "mdi-comment-quote", to: "/admin/feedback" },
			{ title: "Our Services", icon: "mdi-face-agent", to: "/admin/service" },
		],
		drawerGroupItems: [
			{
				name: "Showcase",
				icon: "mdi-view-dashboard",
				items: [
					{ title: "Map", icon: "mdi-map-marker", to: "/admin/showcase-map" },
					{ title: "Gallery", icon: "mdi-image-multiple", to: "/admin/showcase-gallery" },
					{ title: "Kendra Information", icon: "mdi-star", to: "/admin/kendra-information" },
				]
			},
			{
				name: "Location",
				icon: "mdi-map-marker-circle",
				items: [
					{ title: "Countries", icon: "mdi-web", to: "/admin/country" },
					{ title: "Provinces", icon: "mdi-office-building-marker-outline", to: "/admin/province" },
					{ title: "Districts", icon: "mdi-map-marker-multiple-outline", to: "/admin/district" },
					{ title: "Municipalities", icon: "mdi-google-maps", to: "/admin/municipality" },
					{ title: "Municipality Wards", icon: "mdi-numeric-7-box", to: "/admin/municipality-ward" },
					{ title: "VDCs", icon: "mdi-google-maps", to: "/admin/vdc" },
					{ title: "VDC Wards", icon: "mdi-numeric-10-box", to: "/admin/vdc-ward" },
				]
			}
		],
	}),
	computed: {
		currentUser() {
			return this.$helper.getCurrentUser()
		},
	}
}
</script>

<style scoped>

</style>
