<template>
	<v-card
		id="kendra-info-box"
		class="my-4"
		flat
		width="100%"
	>
		<v-card-subtitle
			id="kendra_name"
			class="text-center"
		>
			ईश्वरीय मार्ग भजन मंडल सच्चाई केन्द्र नेपाल
		</v-card-subtitle>
		<v-card-subtitle
			id="kendra_motto"
			class="text-center"
		>
			हिमाल पहाड तराई, कोहि छैन पराई, सबैलाई समेट्ने एक मात्र सच्चाई
		</v-card-subtitle>
		<v-row
			align="center"
			justify="center"
			class="pa-6"
		>
			<v-col
				cols="12"
				xl="5"
				lg="5"
				md="5"
				sm="5"
			>
				<v-row>
					<v-col
						cols="12"
						:class="
							$vuetify.breakpoint.smAndUp
								? 'd-flex justify-end'
								: 'd-flex justify-center'
						"
					>
						<v-avatar
							size="200"
						>
							<v-img :src="chief" />
						</v-avatar>
					</v-col>
					<v-col
						cols="12"
						:class="
							$vuetify.breakpoint.smAndUp
								? 'd-flex justify-end'
								: 'd-flex justify-center'
						"
					>
						<div class="text-right">
							<p>
								Mr. ABCD XYZ
							</p>
							<p>
								Sachchai Kendra Nepal
							</p>
							<p>
								Pramukh
							</p>
							<p>
								9843789563
							</p>
						</div>
					</v-col>
				</v-row>
			</v-col>
			<v-col
				v-if="$vuetify.breakpoint.smAndUp"
				class="ma-0 pa-0"
				cols="2"
			>
				<v-row
					no-gutters
				>
					<v-col cols="12"
						class="d-flex justify-center"
					>
						<div
							id="divider"
							class="mx-2"
						/>
					</v-col>
					<v-col cols="12"
						class="d-flex justify-center mt-4"
					>
						<div>
							<p><v-icon>mdi-account-circle</v-icon></p>
							<p><v-icon>mdi-city</v-icon></p>
							<p><v-icon>mdi-shield-key</v-icon></p>
							<p><v-icon>mdi-phone</v-icon></p>
						</div>
					</v-col>
				</v-row>
			</v-col>
			<v-col
				cols="12"
				xl="5"
				lg="5"
				md="5"
				sm="5"
			>
				<v-row>
					<v-col cols="12" :class="
						$vuetify.breakpoint.smAndUp
							? 'd-flex justify-start'
							: 'd-flex justify-center'
					"
					>
						<v-avatar size="200">
							<v-img :src="viceChief" />
						</v-avatar>
					</v-col>
					<v-col cols="12" :class="
						$vuetify.breakpoint.smAndUp
							? 'd-flex justify-start'
							: 'd-flex justify-center'
					"
					>
						<div>
							<p>Mrs. KOCH XYZ</p>
							<p>Sachchai Kendra Nepal</p>
							<p>Saha Pramukh</p>
							<p>9843789563</p>
						</div>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-card>
</template>
<script>
export default {
	data: () => ({
		chief: require("@/assets/KendraPramukh.jpg"),
		viceChief: require("@/assets/KendraSahaPramukh.jpg")
	}),
}
</script>
<style lang="sass" scoped>
#kendra-info-box
	border-radius: 0 !important
#divider
	background-color: #020211
	height: 200px
	width: 3px
::v-deep.v-card
	background-color: #d9ecf3
	//background-image: url("https://image.freepik.com/free-photo/blue-watercolor-texture-with-copyspace-right_24972-147.jpg")
	//background-repeat: no-repeat
	//background-position: center
	//background-size: cover
	#kendra_name
		color: #2f2d2d
		font-size: 55px
		line-height: 55px
	#kendra_motto
		padding-top: 5px
		font-size: 24px
		line-height: 25px
</style>
