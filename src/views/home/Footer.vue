<template>
	<div
		class="footer"
	>
		<div class="custom-shape-divider-bottom-1620494480">
			<svg data-name="Layer 1"
				xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
				preserveAspectRatio="none"
			>
				<path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
					opacity=".25" class="shape-fill"
				/>
				<path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
					opacity=".5" class="shape-fill"
				/>
				<path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
					class="shape-fill"
				/>
			</svg>
		</div>

		<v-card
			class="flex pt-16 mx-auto"
			color="transparent"
			tile
			min-height="80vh"
			dark
			flat
			max-width="1000"
		>
			<v-row
				class="ma-0 pa-0"
				align-center="center"
				justify="center"
			>
				<v-col cols="12">
					<v-card class="d-flex pa-4"
						color="rgb(0 150 136 / 29%)"
						min-height="120"
					>
						<div class="become-follower">
							<div class="become-text">
								Become a follower
							</div>
							<v-btn
								rounded
								min-height="50"
								min-width="120"
								class="become-btn"
								color="rgb(0 105 92 / 67%)"
								@click="routeToRegisterPage"
							>
								Join Us
							</v-btn>
						</div>
					</v-card>
				</v-col>
				<v-col
					cols="12"
					xl="3"
					lg="3"
					md="3"
					sm="3"
					class="pl-xl-16 pl-lg-16 pl-md-12 pl-sm-6"
				>
					<div class="d-flex justify-start align-center my-4">
						<v-avatar
							tile
							size="70"
						>
							<v-icon size="70"
								color="light-blue lighten-3"
							>
								mdi-bird
							</v-icon>
						</v-avatar>
					</div>
					<div id="about-kendra">
						<h4 class="flex text-start">
							A very constructive and inclusive social network. Open source and radically transparent.
						</h4>
						<v-row class="ma-0 pa-0"
							align-center
						>
							<v-card-actions
								v-for="(item, index) in socialMediaButtonIcons"
								:key="index"
								class="ma-0 pa-0"
							>
								<v-btn
									class="mx-2"
									icon
								>
									<v-icon
										size="24px"
										:color="item.color"
									>
										{{ item.icon }}
									</v-icon>
								</v-btn>
							</v-card-actions>
						</v-row>
						<h5 class="flex text-start">
							SACHCHAI community copyright 2019 - 2020
						</h5>
						<h6 id="built-info"
							class="flex text-start"
						>
							Built on Vuetify -- the open source software that powers SACHCHAI KENDRA NEPAL `DoveFront` and other inclusive communities.
						</h6>
						<h6 class="flex text-start">
							Made with love and NodeJs.
						</h6>
					</div>
				</v-col>
				<v-col>
					<v-list dense
						max-width="120"
						color="transparent"
					>
						<v-list-item-group
							color="black"
						>
							<v-list-item
								v-for="(item, i) in firstList"
								:key="i"
							>
								<v-list-item-content>
									<v-list-item-title>{{ item.text }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-col>
				<v-col>
					<v-list dense
						max-width="130"
						color="transparent"
					>
						<v-list-item-group
							color="black"
						>
							<v-list-item
								v-for="(item, i) in secondList"
								:key="i"
							>
								<v-list-item-content>
									<v-list-item-title>{{ item.text }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-col>
				<v-col>
					<v-list dense
						max-width="120"
						color="transparent"
					>
						<v-list-item-group
							color="black"
						>
							<v-list-item
								v-for="(item, i) in thirdList"
								:key="i"
							>
								<v-list-item-content>
									<v-list-item-title>{{ item.text }}</v-list-item-title>
								</v-list-item-content>
							</v-list-item>
						</v-list-item-group>
					</v-list>
				</v-col>
				<v-col
					cols="12"
					xl="3"
					lg="3"
					md="4"
					sm="6"
				>
					<facebook-widget />
				</v-col>
			</v-row>

			<v-divider />

			<v-card-text>
				<div class="text-right love-text">
					{{ new Date().getFullYear() }} — <strong>Ishworiya Bhajan Mandal Sachchai Kendra Nepal</strong> - made with ❤️ by <strong>Kiran Parajuli</strong>.
				</div>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
import router from "@/router";

export default {
	name: "HomeFooter",
	components: {
		FacebookWidget: () => import("@/views/showcase/Facebook")
	},
	data: () => ({
		socialMediaButtonIcons: [
			{color: "indigo darken-2", icon: "mdi-facebook"},
			{color: "#f71701", icon: "mdi-youtube"},
			{color: "#bb2d71", icon: "mdi-instagram"},
		],
		firstList: [
			{text: "Home"},
			{text: "Maps"},
			{text: "Bookmarks"},
			{text: "Events"},
			{text: "Videos"},
			{text: "Tags"},
		],
		secondList: [
			{text: "Code of Conduct"},
			{text: "FAQ"},
			{text: "Our Artifacts"},
			{text: "Sponsors"},
			{text: "About"},
			{text: "Privacy Policy"},
		],
		thirdList: [
			{text: "Terms of use"},
			{text: "Contact Us"},
			{text: "Feedbacks"},
			{text: "Write a post"},
		]
	}),
	methods: {
		routeToRegisterPage() {
			router.push({name: "REGISTER"})
		}
	}
}
</script>

<style lang="sass" scoped>
#footer
	position: relative
	#about-kendra
		h4
			font-size: 14px !important
			font-weight: 450 !important
			padding: 4px 0
			color: #545454
		h5
			color: #545454
			font-weight: normal
			padding-top: 5px
			padding-bottom: 10px
		h6
			color: #545454
			font-weight: normal
		#built-info
			padding-bottom: 10px
</style>
<style lang="scss">
.custom-shape-divider-bottom-1620494480 {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	line-height: 0;
	transform: rotate(180deg);
}

.custom-shape-divider-bottom-1620494480 svg {
	position: relative;
	display: block;
	width: calc(450% + 1.3px);
	height: 750px;
	@media only screen and (max-width: 500px) {
		height: 1000px;
	}
}

.custom-shape-divider-bottom-1620494480 .shape-fill {
	fill: cadetblue;
}
.footer {
	min-height: 80vh;
	background: teal;
	color: white !important;
}
.love-text {
	position: absolute;
	bottom: 20px;
	right: 80px;
}
.become-follower {
	font-size: 4rem;
	line-height: 4rem;
	font-family: 'Quicksand', sans-serif;
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: space-around;
	width: 100%;
	flex-wrap: wrap;
	@media only screen and (max-width: 500px) {
		font-size: 3rem;
		line-height: 3rem;
	}
	.become-text {
		padding: 10px
	}
	.become-btn {
		padding: 10px
	}
}
</style>
