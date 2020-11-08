<template>
	<v-card class="sticky">
		<div class="px-2"
			style="background-color: darkgoldenrod"
		>
			<div>
				<v-chip
					v-for="(tag, index) in tags"
					:key="index"
					:color="tag.color"
					label
					class="mx-1 my-2"
				>
					<v-icon small
						left
					>
						{{ tag.icon }}
					</v-icon>
					{{ tag.title }}
				</v-chip>
			</div>
		</div>
		<v-divider />
		<v-list class="pa-0">
			<v-list-item v-for="(item, index) in introDetails"
				:key="index"
				@click="1"
			>
				<v-list-item-content>
					<v-list-item-subtitle>
						<v-icon class="mr-2">
							{{ item.icon }}
						</v-icon>{{ item.detailKey }} <b>{{ item.value }}</b>
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>
	</v-card>
</template>
<script>
export default {
	name: "IntroView",
	data: () => ({
		tags: [
			{icon: "mdi-account-heart", title: "Follower", color: "blue lighten-2"},
			{icon: "mdi-account-network", title: "Member", color: "red lighten-3"},
			{icon: "mdi-account-cowboy-hat", title: "Admin", color: "green lighten-2"}
		],
		introDetails: [
			{ icon: "mdi-adjust", detailKey: "Follower at", value:"Sachchai Kendra Nepal" },
			{ icon: "mdi-city", detailKey: "Designated at", value:"Pokhara Kendra Branch" },
			{ icon: "mdi-phone", detailKey: "Contact at", value:"9875256325, 21524584" },
			{ icon: "mdi-map-marker", detailKey: "From", value:"Lamachaur-16, Deep, Pokhara" },
			{ icon: "mdi-calendar", detailKey: "Date joined", value:"15 Feb, 2020" },
		],
	})
}
</script>
<style lang="sass" scoped>
.sticky
	position: -webkit-sticky
	position: sticky
	top: 145px
</style>
