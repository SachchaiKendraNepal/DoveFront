<template>
	<div class="info-bar-wrapper showcase-blue-bg">
		<div
			class="info-bar"
		>
			<div class="social-networks text-center">
				<h4 class="px-1">
					Follow us:
				</h4>
				<v-icon
					v-ripple
					color="white"
					size="20"
				>
					mdi-facebook
				</v-icon>
				<v-icon
					v-ripple
					color="red"
					size="20"
				>
					mdi-youtube
				</v-icon>
				<v-icon
					v-ripple
					size="20"
					color="purple"
				>
					mdi-instagram
				</v-icon>
			</div>
			<div class="contacts-info">
				<div class="phone">
					<v-icon
						small
					>
						mdi-phone
					</v-icon>
					<h4>+9779843530425</h4>
				</div>
				<div class="mail">
					<v-icon>
						mdi-at
					</v-icon>
					<h4 class="ma-0">
						kiranparajui589@gmail.com
					</h4>
				</div>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.info-bar-wrapper {
	color: white;
	width: 100vw;
}
.info-bar {
	max-width: 1000px;
	min-height: 50px;
	margin: auto auto;
	font-size: .86rem;
	display: flex;
	justify-content: space-between;
	align-content: center;
	flex-wrap: wrap;
	.social-networks {
		flex: 1 1 auto;
		padding: 0 10px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
	}
	.contacts-info {
		flex: 1 1 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		.phone {
			padding: 0 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
		}
		.mail {
			padding: 0 10px;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: wrap;
		}
	}
}
</style>
