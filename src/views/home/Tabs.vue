<template>
	<v-card light
		color="transparent"
		class="top-tab-wrapper overflow-hidden"
		height="55"
	>
		<v-tabs
			v-if="screenWidth > 600"
			height="55"
			background-color="transparent"
			centered
			center-active
			icons-and-text
			slider-size="3"
			active-class="home-tab-active"
			slider-color="white"
		>
			<v-tab
				v-for="(tab, index) in homeTabItems"
				:key="index"
				:to="tab.to"
			>
				<v-icon size="26">
					{{ tab.icon }}
				</v-icon>
			</v-tab>
		</v-tabs>
		<div v-else-if="$vuetify.breakpoint.width > 254"
			class="d-flex fill-height justify-space-around align-center flex-wrap px-1"
		>
			<v-btn
				v-for="item in homeTabItems"
				:key="item.to"
				icon
				active-class="home-tab-active"
				:to="item.to"
				:small="ifScreenWidthIsLessThan400"
			>
				<v-icon
					:small="ifScreenWidthIsLessThan400"
				>
					{{ item.icon }}
				</v-icon>
			</v-btn>
		</div>
		<div v-else
			class="fill-height d-flex align-center px-2"
		>
			<v-menu
				transition="slide-y-transition"
				offset-y
				nudge-bottom="5"
				close-on-click
			>
				<template #activator="{on, attrs}">
					<v-btn small
						icon
						v-bind="attrs"
						v-on="on"
					>
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>
				<v-list dense
					color="purple lighten-4"
					class="pt-1"
				>
					<v-list-item-group
						v-for="(item, index) in homeTabItems"
						:key="item.to"
					>
						<v-list-item
							:to="item.to"
							class="my-1"
						>
							<v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>
									{{ item.text }}
								</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-divider v-if="index !== homeTabItems.length - 1"
							class="mx-1"
						/>
					</v-list-item-group>
				</v-list>
			</v-menu>
		</div>
	</v-card>
</template>

<script>
export default {
	name: "HomeTabs",
	props: {
		arrows: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			homeTabItems: [
				{icon: "mdi-home", text: "Home", to: "/home/feeds"},
				{icon: "mdi-post", text: "Articles", to: "/home/article"},
				{icon: "mdi-video-vintage", text: "Multimedia", to: "/home/multimedia"},
				{icon: "mdi-calendar-clock", text: "Events", to: "/home/event"},
			],
		}
	},
	computed: {
		screenWidth() {
			return this.$vuetify.breakpoint.width
		},
		ifScreenWidthIsLessThan400() {
			return this.screenWidth < 400
		}
	}
}
</script>

<style scoped>
.home-tab-active {
	color: white !important;
}
</style>
