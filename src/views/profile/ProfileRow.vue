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
				:src="profile.cover"
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
				<v-img :src="profile.image" />
			</v-avatar>
		</v-card>
		<div class="py-2" />
		<h1 class="text-center">
			{{ profile.name }}
		</h1>
		<v-card-text class="text-center pt-2">
			{{ profile.bio }}
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: "ProfileRow",
	data: () => ({
		profile: {
			name: "Kiran Parajuli",
			bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin molestie malesuada." +
				" Proin eget tortor risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum" +
				" dolor sit amet, consectetur adipiscing elit.",
			image: "https://image.freepik.com/free-vector/beard-man-barber-shop-logo-vector-illustration_56473-434.jpg",
			cover: "https://media.nature.com/lw800/magazine-assets/d41586-020-01390-w/d41586-020-01390-w_17974388.jpg"
		}
	})
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
