<template>
	<v-card
		id="explore-card"
		class="overflow-hidden"
	>
		<v-app-bar
			dense
			absolute
			dark
			color="#1365a6"
			elevate-on-scroll
			scroll-target="#scrolling-techniques-7"
		>
			<v-icon
				size="30"
				class="mr-2"
			>
				{{ toolbarIcon }}
			</v-icon>
			<v-toolbar-title
				id="explore-toolbar-title"
				class="text-uppercase"
			>
				{{ toolbarTitle }}
			</v-toolbar-title>
			<v-spacer />
			<v-btn icon>
				<v-icon color="green lighten-4">
					mdi-content-save-edit
				</v-icon>
			</v-btn>
			<v-btn icon>
				<v-icon color="red lighten-4">
					mdi-delete
				</v-icon>
			</v-btn>
		</v-app-bar>
		<v-sheet
			id="detail-sheet"
			class="overflow-y-auto"
			max-height="700"
		>
			<v-tabs
				vertical
			>
				<v-tab
					v-for="item in tabItems"
					:id="item.id"
					:key="item.index"
					class="justify-start full-width"
				>
					<v-icon left>
						{{ item.icon }}
					</v-icon>
					<span v-show="$vuetify.breakpoint.smAndUp">{{ item.title }}</span>
				</v-tab>
				<slot name="tabContent" />
			</v-tabs>
		</v-sheet>
	</v-card>
</template>
<script>
export default {
	name: "DetailViewExplorerComponent",
	props: {
		toolbarTitle: {
			type: String,
			required: true
		},
		toolbarIcon: {
			type: String,
			required: true
		},
		tabItems: {
			type: Array,
			required: true
		}
	}
}
</script>
<style lang="sass">
#detail-sheet
	margin-top: 48px
#explore-toolbar-title
	font-size: 18px
	font-family: Roboto, sans-serif
	font-weight: 300
</style>
