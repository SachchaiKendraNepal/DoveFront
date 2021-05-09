<template>
	<div class="d-flex justify-center align-center">
		<v-menu
			transition="slide-y-transition"
			bottom
			offset-y
			max-width="300"
			nudge-bottom="5"
			close-on-click
			close-delay="1"
		>
			<template #activator="{ attrs, on }">
				<v-card
					class="rounded-b-circle profile-card"
					img="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
					height="45"
					width="45"
					v-bind="attrs"
					v-on="on"
				/>
			</template>
			<v-list
				rounded
				dense
				color="teal lighten-5"
			>
				<v-list-item-group>
					<v-list-item
						v-for="(item, i) in og_items"
						:key="i"
						:to="item.to"
					>
						<v-list-item-icon>
							<v-icon v-text="item.icon" />
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-text="item.text" />
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
				<v-divider class="my-1" />
				<v-list-item-group>
					<v-list-item
						v-for="(item, i) in my_items"
						:key="i"
						:to="item.to"
					>
						<v-list-item-icon>
							<v-icon v-text="item.icon" />
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-text="item.text" />
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
				<v-divider class="my-1" />
				<v-list-item-group
					color="primary"
				>
					<v-list-item
						v-for="(item, i) in cog_items"
						:key="i"
						:to="item.to"
					>
						<v-list-item-icon>
							<v-icon v-text="item.icon" />
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-text="item.text" />
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
				<v-divider class="my-1" />
				<v-list-item-group
					color="primary"
				>
					<v-list-item
						v-for="(item, i) in log_items"
						:key="i"
						:to="item.to"
					>
						<v-list-item-icon>
							<v-icon v-text="item.icon" />
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title v-text="item.text" />
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-menu>
	</div>
</template>

<script>
export default {
	data: () => ({
		og_items: [
			{ text: "Showcase", icon: "mdi-view-dashboard", to: "/"},
			{ text: "Home", icon: "mdi-home", to: "/home/feeds" }
		],
		my_items: [
			{ text: "Profile", icon: "mdi-account-circle-outline", to: "/profile/about"},
			{ text: "My Posts", icon: "mdi-post-outline", to: "/home/post" }
		],
		cog_items: [{ text: "Settings", icon: "mdi-cog-outline", divider: true, to: "/admin/home" }],
		log_items: [{ text: "Log Out", icon: "mdi-logout", to: "/auth/login", divider: true }]
	})
}
</script>
<style lang="sass" scoped>
.profile-card
	transition: all .2s ease-in-out
	@media only screen and (max-width: 260px) and (min-width: 190px)
		width: 30px !important
		height: 30px !important
</style>
