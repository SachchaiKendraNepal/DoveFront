<template>
	<v-card id="home-header">
		<tool-bar />
		<home-tab />
		<div id="sacchai-home-container">
			<v-row justify="center">
				<v-col
					class="mb-0 pb-0"
					v-show="$route.name === 'SACCHAI NEPAL'"
					sm="3"
					md="3"
					lg="4"
					xl="4"
				>
					<div class="float-lg-right float-md-right">
						<user-clip />
					</div>
				</v-col>
				<v-col class="mb-0 pb-0" sm="6" md="6" lg="4" xl="4">
					<add-post-box />
					<router-view />
				</v-col>
				<v-col
					class="mb-0 pb-0"
					v-show="$route.name === 'SACCHAI NEPAL'"
					sm="3"
					md="3"
					lg="4"
					xl="4"
				>
					<div class="float-lg-left float-md-left">
						<user-clip />
					</div>
				</v-col>
			</v-row>
		</div>
	</v-card>
</template>

<script>
	export default {
		name: "TopNavTabComponent",
		components: {
			HomeTab: () => import("@/views/home_layout/Tab"),
			ToolBar: () => import("@/views/home_layout/ToolBar"),
			UserClip: () => import("@/views/home_layout/UserClip"),
			AddPostBox: () => import("@/views/home_layout/AddPostBox")
		}
	}
</script>

<style lang="css">
	#sacchai-home-container {
		background-color: #fbf2e5e8;
	}
</style>
