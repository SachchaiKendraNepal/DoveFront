<template>
	<v-card
		:loading="loading"
		class="mx-auto my-0 auth-card"
		max-width="100vw"
		max-height="100%"
		flat
	>
		<v-toolbar
			class="elevation-12 ma-0 pa-0 px-4"
			color="#e4ab02"
			height="75"
			width="100vw"
			fixed
		>
			<v-btn icon
				@click="$router.go(-1)"
			>
				<v-icon>mdi-arrow-left</v-icon>
			</v-btn>
			<v-avatar color="gold"
				class="auth-logo elevation-4 mr-4"
				size="65"
			>
				<span class="display-2"
					style="color: #3b3b3b"
				>{{ $route.name[0] }}</span>
			</v-avatar>
			<v-toolbar-title class="register-title">
				{{ $route.name }}
			</v-toolbar-title>
			<v-spacer />
			<v-menu offset-y>
				<template #activator="{ on, attrs }">
					<v-btn
						color="primary"
						dark
						v-bind="attrs"
						v-on="on"
					>
						<div v-show="$vuetify.breakpoint.smAndUp">
							{{ menuTitle }}
						</div>
						<v-icon>mdi-help</v-icon>
					</v-btn>
				</template>
				<v-list>
					<v-list-item
						v-for="(item, index) in menuItems"
						:key="index"
						:to="item.to"
					>
						<v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-toolbar>
		<v-card flat
			color="transparent" class="mx-auto pa-0 auth-content"
			max-width="800"
		>
			<v-img
				class="top-image"
				:height="height"
				:src="topImage"
				aspect-ratio="1.7"
			/>

			<div class="d-flex justify-start align-center pl-4 pt-4">
				<v-avatar
					id="logo"
					tile
					size="50"
				>
					<v-img v-if="pageAvatar"
						:src="pageAvatar"
					/>
					<v-icon v-else
						color="grey darken-4"
						size="50"
					>
						{{ pageIcon }}
					</v-icon>
				</v-avatar>
				<span id="org-title">{{ title }}</span>
			</div>

			<v-card-text>
				<!-- eslint-disable-next-line vue/no-v-html vue/max-attributes-per-line -->
				<div class="subtitle-2" v-html="subtitle" />
			</v-card-text>
			<v-divider class="mb-4" />
			<slot name="form" />
		</v-card>
	</v-card>
</template>
<script>
export default {
	name: "AuthComponent",
	props: {
		height: {
			type: String,
			required: false,
			default: "60vh"
		},
		topImage: {
			type: String,
			required: true
		},
		pageAvatar: {
			type: String,
			required: false,
			default: null
		},
		pageIcon: {
			type: String,
			required: false,
			default: null
		},
		menuTitle: {
			type: String,
			required: true
		},
		menuItems: {
			type: Array,
			required: true
		},
		title: {
			type: String,
			required: true
		},
		subtitle: {
			type: String,
			required: true
		},
	},
	data: () => ({
		loading: false,
	})
}
</script>
<style scoped lang="sass">
.auth-card
	background: linear-gradient(180deg, #fdedcc, #ffffff)
.auth-content
	border-radius: 0
.top-image
	border-radius: 0 0 10px 10px
.register-title
	font-family: "Kelly Slab", cursive
	font-size: 22px
.register-container
	height: 100%
	background: linear-gradient(45deg, rgb(37, 158, 239), rgb(184, 204, 234), rgb(16, 123, 207))
.register-card
	border-radius: 0 !important
#org-title
	font-size: 48px
	padding-left: 10px
	transition: all .5s
	font-family: "Abril Fatface", cursive
	@media only screen and (max-width: 500px)
		font-size: 32px
	@media only screen and (max-width: 320px)
		font-size: 20px
#logo
	transition: all .5s
	@media only screen and (max-width: 320px)
		height: 30px !important
		min-width: 30px !important
		width: 30px !important
.auth-logo
	// visibility hidden but not occupying space :)
	// love transition
	transition: all .2s ease-in-out
	visibility: visible
	opacity: 1
	@media only screen and (max-width: 360px)
		height: 45px !important
		min-width: 45px !important
		width: 45px !important
	@media only screen and (max-width: 310px)
		visibility: hidden
		opacity: 0
		height: 0 !important
		min-width: 0 !important
		width: 0 !important
		overflow: hidden
</style>
