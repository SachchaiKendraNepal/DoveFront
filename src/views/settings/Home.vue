<template>
	<v-card max-width="1200"
		flat
		class="mx-auto"
	>
		<v-row class="ma-0 pa-0">
			<v-col cols="12">
				<v-card
					color="rgb(23 94 129)"
					dark
					min-height="200"
					max-width="550"
				>
					<v-row class="ma-0 pa-0">
						<v-col cols="12"
							xl="8"
							lg="8"
							md="8"
							sm="8"
							class="my-auto"
							:class="
								$vuetify.breakpoint.smAndUp
									? ''
									: 'text-center'
							"
						>
							<v-card-text
								class="headline"
								:class="
									$vuetify.breakpoint.smAndUp
										? ''
										: 'text-center'
								"
							>
								<b>Administration Dashboard</b>
							</v-card-text>

							<v-card-subtitle>
								Ishworiya Marg Bhajan Mandal Sachchai Kendra Nepal
							</v-card-subtitle>

							<div class="admin-welcome-text">
								<i>Welcome Manager</i> <b>{{ currentUser.first_name }}</b> !
							</div>
						</v-col>
						<v-col cols="12"
							xl="4"
							lg="4"
							md="4"
							sm="4"
							class="text-center my-auto"
						>
							<v-avatar
								class="profile-avatar"
								size="130"
							>
								<v-img
									v-if="$helper.getCurrentProfileImage()"
									:src="$helper.getCurrentProfileImage()"
								/>
								<span v-else
									class="display-1"
								>
									{{ $helper.getCurrentUser().username[0] }}
								</span>
							</v-avatar>
							<div class="text-center py-4">
								<v-chip
									class="mt-1"
									color="grey"
									dense
								>
									<v-icon>mdi-account-cog</v-icon>
									<b>Admin</b>
								</v-chip>
							</div>
						</v-col>
					</v-row>
				</v-card>
			</v-col>
			<model-summary />
		</v-row>
	</v-card>
</template>
<script>
export default {
	name: "SettingsHomeView",
	components: {
		ModelSummary: () => import("@/views/settings/ModelSummary"),
	},
	data: () => ({
		currentUser: null
	}),
	async created() {
		this.currentUser = this.$helper.getCurrentUser()
	},
}
</script>
<style lang="sass" scoped>
.admin-welcome-text
	padding: 10px
	font-size: 20px
	color: white
	min-height: 100%
.profile-avatar
	border: 4px solid gold
	background-color: gold
</style>
