<template>
	<v-footer
		id="footer"
		padless
		elevation="3"
	>
		<v-card
			class="flex"
			color="#d2d6db"
			flat
			tile
		>
			<v-row
				class="ma-0 pa-0"
				align-center="center"
				justify="center"
			>
				<v-col
					cols="12"
					xl="3"
					lg="3"
					md="3"
					sm="3"
					class="pl-xl-16 pl-lg-16 pl-md-12 pl-sm-6"
				>
					<div class="d-flex justify-start align-center">
						<v-avatar
							tile
							size="50"
						>
							<v-img src="@/assets/dove-solid.svg" />
						</v-avatar>
						<span id="org-title">SACHCHAI KENDRA NEPAL</span>
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
				<div class="text-right">
					{{ new Date().getFullYear() }} — <strong>Ishowiya Bhajan Mandal Sachchai Kendra Nepal</strong> - made with ❤️ by <strong>Kiran Parajuli</strong>.
				</div>
			</v-card-text>
		</v-card>
	</v-footer>
</template>

<script>
export default {
	name: "HomeFooter",
	components: {
		FacebookWidget: () => import("@/components/showcase/Facebook")
	},
	data: () => ({
		logo: require("@/assets/sacchai_logo.jpg"),
		socialMediaButtonIcons: [
			{color: "#3a80ec", icon: "mdi-facebook"},
			{color: "#f71701", icon: "mdi-youtube"},
			{color: "#bb2d71", icon: "mdi-instagram"},
			{color: "rgb(62 161 242)", icon: "mdi-twitter"}
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
	})
}
</script>

<style lang="sass" scoped>
#footer
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
	#org-title
		font-size: 22px
		padding-left: 10px
		font-family: "Crimson Text", sans-serif
		font-weight: 600
		display: block
		@media only screen and (max-width: 190px)
			display: none
</style>
