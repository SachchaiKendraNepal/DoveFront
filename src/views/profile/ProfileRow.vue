<template>
	<v-card max-width="1000"
		class="overflow-hidden mx-auto"
		tile flat
		color="transparent"
	>
		<v-card
			tile
			height="300"
			class="mx-auto cover-photo"
		>
			<v-img
				height="300"
				:src="$helper.getCurrentCoverImage()"
			/>
		</v-card>
		<v-card
			class="mx-auto"
			height="200"
			width="200"
			style="margin-top: -150px;"
		>
			<v-avatar
				class="profile-avatar"
				size="200"
			>
				<v-img
					v-if="$helper.getCurrentProfileImage()"
					:src="$helper.getCurrentProfileImage()"
				/>
				<span v-else
					class="display-4 grey--text"
				>
					{{ $helper.getCurrentUser().username[0].toUpperCase() }}
				</span>
			</v-avatar>
		</v-card>
		<div class="py-2" />
		<h1 class="text-center">
			{{ $helper.getCurrentUser().first_name }} {{ $helper.getCurrentUser().last_name }}
		</h1>
		<v-card-text class="text-center pt-2">
			{{ $helper.getCurrentUser().profile.bio }}
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: "ProfileRow"
}
</script>

<style scoped lang="scss">
.profile-photo {
	margin-top: -150px;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.profile-avatar {
	border: 4px solid whitesmoke;
	background-color: whitesmoke;
}
</style>
