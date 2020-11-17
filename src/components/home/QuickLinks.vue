<template>
	<v-card
		class="mx-auto"
		max-width="500"
	>
		<v-list color="blue darken-4"
			dark
		>
			<v-list-group
				v-for="item in items"
				:key="item.title"
				v-model="item.active"
				active-class="light-blue--text"
				:prepend-icon="item.action"
				no-action
			>
				<template #activator>
					<v-list-item-content>
						<v-list-item-title v-text="item.title" />
					</v-list-item-content>
				</template>

				<v-list-item
					v-for="child in item.items"
					:key="child.title"
					:to="child.to"
				>
					<v-list-item-icon><v-icon>{{ child.icon }}</v-icon></v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title v-text="child.title" />
					</v-list-item-content>
				</v-list-item>
			</v-list-group>
		</v-list>
	</v-card>
</template>
<script>
export default {
	name: "QuickLinksComponent",
	data: () => ({
		items: [
			{
				action: "mdi-star-circle",
				items: [
					{ title: "My Profile", icon: "mdi-account-circle", to: "/home/profile" },
					{ title: "My Posts", icon: "mdi-post" },
					{ title: "My Medias", icon: "mdi-video-vintage" },
					{ title: "My Bookmarks", icon: "mdi-bookmark" },
				],
				title: "Kiran Parajuli",
			},
			{
				action: "mdi-city",
				items: [
					{ title: "Province", icon: "mdi-office-building-marker-outline" },
					{ title: "District", icon: "mdi-map-marker-multiple-outline" },
					{ title: "VDC", icon: "mdi-home-map-marker" },
					{ title: "Municipality", icon: "mdi-google-maps" },
				],
				title: "Branch",
			},
			{
				action: "mdi-calendar-clock",
				active: false,
				items: [
					{ title: "Satsang", icon: "mdi-heart" },
					{ title: "Kendra Events", icon: "mdi-calendar-star" },
					{ title: "Branch Events", icon: "mdi-calendar-text" },
					{ title: "General Meets", icon: "mdi-account-supervisor-circle" },
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
					{ title: "Motivation", icon: "mdi-run" },
					{ title: "Health", icon: "mdi-bottle-tonic-plus" },
					{ title: "Peace", icon: "mdi-peace" },
					{ title: "Dance", icon: "mdi-dance-ballroom" },
				],
				title: "Our Services",
			},
			{
				action: "mdi-google-maps",
				items: [
					{ title: "Branches", icon: "mdi-city" },
					{ title: "Kendra Branch", icon: "mdi-map-marker-star" },
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
	})
}
</script>
