<template>
	<div class="d-flex justify-center align-center">
		<v-menu
			transition="slide-y-transition"
			bottom
			offset-y
			max-width="300"
			close-on-click
			close-delay="1"
			open-on-hover
		>
			<template #activator="{ attrs, on }">
				<v-card
					class="rounded-b-circle"
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
				class="ma-0"
				color="teal lighten-5"
			>
				<v-list-item-group
					color="primary"
				>
					<v-list-item
						v-for="(item, i) in my_items"
						:key="i"
						class="ma-0 px-2"
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
				<v-divider />
				<v-list-item-group
					color="primary"
				>
					<v-list-item
						v-for="(item, i) in cog_items"
						:key="i"
						class="ma-0 px-2"
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
				<v-divider />
				<v-list-item-group
					color="primary"
				>
					<v-list-item
						v-for="(item, i) in log_items"
						:key="i"
						class="ma-0 px-2"
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
		my_item: 1,
		my_items: [
			{ text: "Profile", icon: "mdi-account-circle-outline", to: "/home/profile"},
			{ text: "Saved", icon: "mdi-bookmark-multiple" },
			{ text: "My Posts", icon: "mdi-post-outline" }
		],
		cog_item: 1,
		cog_items: [{ text: "Settings", icon: "mdi-cog-outline", divider: true }],
		log_item: 1,
		log_items: [{ text: "Log Out", icon: "mdi-logout", divider: true }]
	})
}
</script>
