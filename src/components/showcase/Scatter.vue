<template>
	<v-row
		class="ma-0 pa-0"
		align="center"
		justify="center"
	>
		<v-col
			cols="12"
			xl="6"
			lg="6"
			md="6"
			sm="6"
		>
			<v-row
				id="scatter"
				class="ma-0 pa-0 px-5"
				justify="center"
				align="center"
			>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="d-flex justify-center"
				>
					<v-img class="one" max-width="200"
						max-height="300" src="https://img.gurugamer.com/resize/740x-/2020/02/27/pubg-mobile-wallpaper-hd-download-for-phones-aabb.jpg"
					/>
				</v-col>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="d-flex justify-center"
				>
					<v-img class="two" max-width="300"
						max-height="200" src="https://cdn.pixabay.com/photo/2018/10/30/16/06/water-lily-3784022__340.jpg"
					/>
				</v-col>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="d-flex justify-center"
				>
					<v-img class="three" max-width="350"
						max-height="200" src="https://wallpapercave.com/wp/wp2960860.jpg"
						style="border-radius: 20px"
					/>
				</v-col>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="d-flex justify-center"
				>
					<v-img class="four" max-width="200"
						max-height="300" src="https://www.setaswall.com/wp-content/uploads/2018/11/PUBG-Phone-Wallpaper-02-1080x2340-340x550.jpg"
					/>
				</v-col>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="d-flex justify-center"
				>
					<v-img class="five" max-width="350"
						max-height="200" src="https://wallpapercave.com/wp/wp2960860.jpg"
						style="border-radius: 20px"
					/>
				</v-col>
				<v-col cols="12"
					xl="6"
					lg="6"
					md="6"
					sm="6"
					class="d-flex justify-center"
				>
					<v-img class="six" max-width="200"
						max-height="500" src="https://i.pinimg.com/236x/f0/92/d0/f092d029600f6fc1b3c475597b39c96b.jpg"
					/>
				</v-col>
			</v-row>
		</v-col>
		<v-col cols="12"
			xl="6"
			lg="6"
			md="6"
			sm="6"
			class=""
		>
			<v-row no-gutters
				justify="center" align="center"
			>
				<v-card id="right-card">
					<v-card-title>About Us</v-card-title>
				</v-card>
			</v-row>
		</v-col>
	</v-row>
</template>
<style lang="sass" scoped>
::v-deep.v-image
	border-radius: 20px
@media only screen and (max-width: 376px)
	::v-deep.v-image
		margin-bottom: 5px
@media only screen and (max-width: 590px) and (min-width: 376px)
	::v-deep.v-image
		margin-bottom: 50px
	#scatter
		height: 1300px
	#right-card
		min-height: 640px
	.one
		left: -105px
	.two
		left: -10px
		top: -60px
	.three
		top: -120px
		left: -10px
	.four
		top: -872px
		left: 105px
	.five
		top: -555px
		left: -10px
	.six
		top: -615px
@media only screen and (max-width: 730px) and (min-width: 590px)
	#right-card
		min-height: 1070px
	.one
		top: 100px
		opacity: 85%
	.two
		left: -60px
		top: -100px
		opacity: 85%
	.three
		opacity: 85%
		top: -30px
		left: 74px
	.four
		opacity: 85%
		top: -230px
		left: 10px
	.five
		opacity: 85%
		top: -180px
		left: 74px
	.six
		opacity: 85%
		top: 30px
		left: -60px
@media only screen and (max-width: 1000px) and (min-width: 730px)
	#right-card
		min-height: 1070px
	.one
		top: 100px
		left: 45px
		opacity: 90%
	.two
		left: -60px
		top: -100px
	.three
		opacity: 85%
		top: -10px
		left: 54px
	.four
		opacity: 80%
		top: -230px
		left: 45px
	.five
		top: -155px
		left: 74px
	.six
		opacity: 87%
		top: -240px
		left: 80px
@media only screen and (max-width: 1000px) and (min-width: 730px)
	::v-deep.v-image
		height: 200px
		width: 200px
	//#right-card
	//	height: 500px
	.one
		top: -20px
		left: 20px
		opacity: 90%
	.two
		opacity: 90%
		top: -20px
		left: 30px
	.three
		opacity: 90%
		top: -65px
		left: 0
	.four
		opacity: 90%
		top: -65px
		left: 45px
	.five
		opacity: 90%
		top: -110px
		left: 15px
	.six
		opacity: 90%
		top: -110px
		left: 25px
@media only screen and (min-width: 1000px) and (max-width: 1330px)
	::v-deep.v-image
		width: 250px
		height: 250px
	.one
		opacity: 85%
		top: 180px
		left: 60px
	.two
		opacity: 85%
		top: 60px
		left: -40px
	.three
		opacity: 85%
		top: 70px
		left: 150px
	.four
		opacity: 85%
		left: 55px
		top: -40px
	.five
		opacity: 85%
		top: -30px
		left: 100px
	.six
		opacity: 85%
		top: -30px
		left: 50px
@media only screen and (min-width: 1330px) and (max-width: 1425px)
	::v-deep.v-image
		width: 250px
		height: 250px
	.one
		opacity: 85%
		top: 230px
		left: -45px
	.two
		opacity: 85%
		top: 60px
		left: -155px
	.three
		opacity: 85%
		top: 195px
		left: 5px
	.four
		opacity: 85%
		left: -153px
		top: -10px
	.five
		opacity: 85%
		top: -80px
		left: 310px
	.six
		opacity: 85%
		top: -320px
		left: 50px
@media only screen and (min-width: 1425px) and (max-width: 1600px)
	::v-deep.v-image
		width: 250px
		height: 250px
	.one
		opacity: 85%
		top: 230px
		left: -45px
	.two
		opacity: 85%
		top: 60px
		left: -225px
	.three
		opacity: 85%
		top: 165px
		left: -10px
	.four
		opacity: 85%
		left: -225px
		top: -10px
	.five
		opacity: 85%
		top: -110px
		left: 300px
	.six
		opacity: 85%
		top: -320px
		left: -25px
@media only screen and (min-width: 1600px) and (max-width: 2000px)
	::v-deep.v-image
		width: 250px
		height: 250px
	.one
		opacity: 85%
		top: 230px
		left: 5px
	.two
		opacity: 85%
		top: 60px
		left: -225px
	.three
		opacity: 85%
		top: 165px
		left: 35px
	.four
		opacity: 85%
		left: -225px
		top: -10px
	.five
		opacity: 85%
		top: -110px
		left: 400px
	.six
		opacity: 85%
		top: -320px
		left: -15px
@media only screen and (min-width: 2000px)
	::v-deep.v-image
		height: 250px
		width: 250px
</style>
