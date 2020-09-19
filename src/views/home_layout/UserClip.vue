<template>
	<v-card id="profile-clip" class="mx-auto" max-width="230" outlined>
		<v-img
			class="white--text align-end"
			height="50px"
			src="https://cdn.pixabay.com/photo/2016/10/22/03/35/water-1759703_960_720.jpg"
		/>
		<v-row id="photo-row" align="center" justify="center">
			<v-avatar size="70px">
				<v-img
					src="https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/ED4B1180197DC35F40612607655B3DC0B5CFD688690B99B39B758927373D4C50"
				/>
			</v-avatar>
		</v-row>

		<v-list-item>
			<v-list-item-content class="text-center">
				<v-list-item-title class="headline mb-2"
					>Kiran Parajuli</v-list-item-title
				>

				<v-list-item-subtitle>Wake up. Kick Ass. Repeat!</v-list-item-subtitle>
			</v-list-item-content>
		</v-list-item>
		<div class="text-center mb-3">
			<v-chip small label class="mr-2" color="primary">
				<v-icon left>mdi-account-group</v-icon>
				MEMBER
			</v-chip>

			<v-chip small color="grey darken-3" label text-color="white">
				<v-icon left>mdi-account-tie</v-icon>
				ADMIN
			</v-chip>
		</div>
	</v-card>
</template>
<style lang="sass">
	#photo-row
	  margin-top: -35px
</style>
<script>
	export default {
		name: "UserClipComponent"
	}
</script>
