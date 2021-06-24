<template>
	<v-list>
		<user-clip />
		<v-divider />
		<v-list-group
			v-for="item in items"
			:key="item.title"
			v-model="item.active"
			active-class="black--text"
			no-action
		>
			<template #prependIcon>
				<v-icon :color="item.color">
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
					<v-icon :color="item.itemColor">
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
	components: {
		UserClip: () => import("@/views/home/UserClip"),
	},
	data: () => ({
		items: [
			{
				color: "grey darken-3",
				action: "mdi-star-circle",
				itemColor: "grey darken-1",
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
				color: "red darken-1",
				action: "mdi-calendar-clock",
				active: false,
				itemColor: "red lighten-1",
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
				color: "orange darken-2",
				action: "mdi-post",
				itemColor: "orange",
				items: [
					{ title: "Photos", icon: "mdi-image" }
				],
				title: "Articles",
			},
			{
				color: "teal darken-2",
				action: "mdi-video-vintage",
				itemColor: "teal",
				items: [
					{ title: "Sounds", icon: "mdi-music-box" },
					{ title: "Photos", icon: "mdi-image" },
					{ title: "Videos", icon: "mdi-video-box" },
				],
				title: "Multimedia",
			},
			{
				color: "blue darken-4",
				action: "mdi-earth",
				itemColor: "blue",
				items: [
					{ title: "Social", icon: "mdi-run" },
					{ title: "Health", icon: "mdi-bottle-tonic-plus" },
					{ title: "Peace", icon: "mdi-peace" },
					{ title: "Satsang", icon: "mdi-dance-ballroom" },
				],
				title: "Our Services",
			},
			{
				color: "pink darken-1",
				action: "mdi-google-maps",
				itemColor: "pink lighten-2",
				items: [
					{ title: "Branches", icon: "mdi-city", to: "/home/map/branch" },
					{ title: "Kendra Branch", icon: "mdi-map-marker-star", to: "/home/map/kendra" },
				],
				title: "Maps",
			},
			{
				color: "purple darken-4",
				itemColor: "purple darken-1",
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
				color: "green darken-3",
				itemColor: "green",
				action: "mdi-tag",
				items: [{ title: "Our Partners", icon: "mdi-handshake" }],
				title: "Promotions",
			},
		]
	})
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
