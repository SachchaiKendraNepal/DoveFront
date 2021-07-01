<template>
	<v-list>
		<v-list-item class="pl-2">
			<v-list-item-avatar
				color="blue"
				class="ma-0 pa-0 d-flex justify-center"
			>
				<span class="headline white--text">
					{{ $helper.getCurrentUserInitials() }}
				</span>
			</v-list-item-avatar>
			<v-list-item-content class="pl-4">
				<v-list-item-title class="full-name">
					<h4 v-text="getFullName" />
				</v-list-item-title>
				<v-list-item-subtitle>
					<v-icon small
						color="orange"
					>
						mdi-account-group
					</v-icon>
					<v-icon small
						color="grey"
						class="ml-1"
					>
						mdi-account-cog
					</v-icon>
				</v-list-item-subtitle>
			</v-list-item-content>
			<v-list-item-action v-if="!$vuetify.breakpoint.mdAndUp">
				<v-btn fab
					x-small
					@click="$emit('toggle')"
				>
					<v-icon>mdi-chevron-left</v-icon>
				</v-btn>
			</v-list-item-action>
		</v-list-item>
		<v-divider class="mx-2 mt-3" />
		<v-list-group
			v-for="item in items"
			:key="item.title"
			v-model="item.active"
			active-class="black--text"
		>
			<template #prependIcon>
				<v-icon color="grey darken-2">
					{{ item.action }}
				</v-icon>
			</template>
			<template #activator>
				<v-list-item-content>
					<v-list-item-title
						class="link-title"
						v-text="item.title.toUpperCase()"
					/>
				</v-list-item-content>
			</template>

			<v-list-item
				v-for="child in item.items"
				:key="child.title"
				:to="child.to"
			>
				<v-list-item-icon>
					<v-icon color="grey darken-1">
						{{ child.icon }}
					</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title
						class="link-subtitle"
						v-text="child.title.toUpperCase()"
					/>
				</v-list-item-content>
			</v-list-item>
		</v-list-group>
	</v-list>
</template>
<script>
export default {
	name: "QuickLinksComponent",
	emits: ["toggle"],
	data: () => ({
		items: [
			{
				action: "mdi-star-circle",
				items: [
					{ title: "My Profile", icon: "mdi-account-circle", to: "/profile/home" },
					{ title: "My Posts", icon: "mdi-post", to: "/profile/articles" },
					{ title: "My Photos", icon: "mdi-image", to: "/profile/images" },
					{ title: "My Medias", icon: "mdi-video-vintage", to: "/profile/multimedias" },
					{ title: "My Bookmarks", icon: "mdi-bookmark", to: "/profile/bookmarks" },
				],
				title: "My Links",
			},
			{
				action: "mdi-calendar-clock",
				active: false,
				items: [
					{ title: "All Events", icon: "mdi-calendar-multiple", to: "/home/event" },
					{ title: "Satsang", icon: "mdi-heart" },
					{ title: "General Meets", icon: "mdi-account-supervisor-circle" },
					{ title: "Kendra Events", icon: "mdi-calendar-star" },
					{ title: "Branch Events", icon: "mdi-calendar-text" },
				],
				title: "Events",
			},
			{
				action: "mdi-post",
				items: [
					{ title: "Photos", icon: "mdi-image" }
				],
				title: "Articles",
			},
			{
				action: "mdi-video-vintage",
				items: [
					{ title: "Sounds", icon: "mdi-music-box" },
					{ title: "Photos", icon: "mdi-image" },
					{ title: "Videos", icon: "mdi-video-box" },
				],
				title: "Multimedia",
			},
			{
				action: "mdi-earth",
				items: [
					{ title: "Social", icon: "mdi-run" },
					{ title: "Health", icon: "mdi-bottle-tonic-plus" },
					{ title: "Peace", icon: "mdi-peace" },
					{ title: "Satsang", icon: "mdi-dance-ballroom" },
				],
				title: "Our Services",
			},
			{
				action: "mdi-google-maps",
				items: [
					{ title: "Branches", icon: "mdi-city", to: "/home/map/branch" },
					{ title: "Kendra Branch", icon: "mdi-map-marker-star", to: "/home/map/kendra" },
				],
				title: "Maps",
			},
			{
				action: "mdi-office-building",
				items: [
					{ title: "About Us", icon: "mdi-information" },
					{ title: "Contact Us", icon: "mdi-phone" },
					{ title: "Kendra Message", icon: "mdi-message" },
					{ title: "Write Feedback", icon: "mdi-comment-quote" },
				],
				title: "Office",
			},
			{
				action: "mdi-tag",
				items: [{ title: "Our Partners", icon: "mdi-handshake" }],
				title: "Promotions",
			},
		]
	}),
	computed: {
		getFullName() {
			const currentUser = this.$helper.getCurrentUser()
			if (currentUser.first_name && currentUser.last_name) {
				return `${currentUser.first_name} ${currentUser.last_name}`
			} else {
				return currentUser.username
			}
		}
	}
}
</script>
<style scoped lang="scss">
.link-title {
	font-size: .875rem;
	font-weight: 500;
}
.link-subtitle {
	font-size: .875rem;
}
</style>
