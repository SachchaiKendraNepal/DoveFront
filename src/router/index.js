import Vue from "vue"
import VueRouter from "vue-router"
import HomeLayout from "@/layouts/HomeLayout"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		component: () => import("@/layouts/ShowCaseLayout"),
		children: [{
			path: "",
			name: "SACHCHAI SHOWCASE",
			component: () => import("@/views/showcase/ShowCase")
		}]
	},
	{
		path: "/home",
		component: HomeLayout,
		children: [
			{
				path: "/home/article/:id",
				name: "SACHCHAI NEPAL ARTICLE",
				component: () => import("@/components/ArticleDetail")
			},
			{
				path: "editor",
				name: "Editor",
				component: () => import("@/views/home/Editor")
			},
			{
				path: "feeds",
				name: "HOME",
				component: () => import("@/views/home/Home")
			},
			{
				path: "my-posts",
				name: "MY POSTS",
				component: () => import("@/views/member/MyPosts")
			},
			{
				path: "article",
				name: "SACHCHAI NEPAL ARTICLES",
				component: () => import("@/views/home/Articles")
			},
			{
				path: "multimedia",
				name: "SACHCHAI NEPAL MULTIMEDIAS",
				component: () => import("@/views/home/Multimedias")
			},
			{
				path: "event",
				name: "SACHCHAI NEPAL EVENTS",
				component: () => import("@/views/event/EventsHome")
			},
			{
				path: "event/:id",
				name: "EVENT DETAIL HOME",
				component: () => import("@/views/event/EventDetail")
			},
			{
				path: "map/branch",
				name: "BRANCHES MAP",
				component: () => import("@/views/map/Branch")
			},
			{
				path: "map/kendra",
				name: "KENDRA MAP",
				component: () => import("@/views/map/Kendra")
			},
		]
	},
	// Detail Views (Requires Full Page)
	{
		path: "/home/multimedia/:id",
		name: "SACHCHAI NEPAL MULTIMEDIA",
		component: () => import("@/views/multimedia/MultimediaDetail")
	},
	{
		path: "/auth/",
		component: () => import("@/layouts/AuthLayout"),
		children: [
			{
				path: "login",
				name: "LOG IN",
				component: () => import("@/views/auth/Login")
			},
			{
				path: "reset-password",
				name: "FORGET PASSWORD",
				component: () => import("@/views/auth/ResetPassword")
			},
			{
				path: "register",
				name: "REGISTER",
				component: () => import("@/views/auth/Register")
			},
		],
	},
	// Settings Routes
	{
		path: "/admin",
		component: () => import("@/layouts/Settings"),
		children: [
			{
				path: "home",
				name: "SACHCHAI KENDRA NEPAL ADMINISTRATION",
				component: () => import("@/views/settings/Home")
			},
			{
				path: "follower",
				name: "FOLLOWERS ADMINISTRATION",
				component: () => import("@/views/member/FollowersTable")
			},
			{
				path: "member",
				name: "MEMBERS ADMINISTRATION",
				component: () => import("@/views/member/MembersTable")
			},
			{
				path: "follower/:id",
				name: "FOLLOWER ADMINISTRATION",
				component: () => import("@/views/member/FollowerDetail")
			},
			{
				path: "branch",
				name: "BRANCHES ADMINISTRATION",
				component: () => import("@/views/branch/BranchTable")
			},
			{
				path: "branch/:id",
				name: "BRANCH ADMINISTRATION",
				component: () => import("@/views/branch/BranchDetail")
			},
			{
				path: "district",
				name: "DISTRICT ADMINISTRATION",
				component: () => import("@/views/location/District")
			},
			{
				path: "article",
				name: "ARTICLES ADMINISTRATION",
				component: () => import("@/views/article/ArticleTable")
			},
			// TODO create real
			{
				path: "pin",
				name: "PINS ADMINISTRATION",
				component: () => import("@/views/article/ArticleTable")
			},

			{
				path: "multimedia",
				name: "MULTIMEDIA ADMINISTRATION",
				component: () => import("@/views/multimedia/MultimediaTable")
			},
			{
				path: "event",
				name: "EVENTS ADMINISTRATION",
				component: () => import("@/views/event/EventsTable")
			},
			{
				path: "event/:id",
				name: "EVENT ADMINISTRATION",
				component: () => import("@/views/event/EventDetail")
			},
			{
				path: "showcase-image",
				name: "SHOWCASE IMAGES ADMINISTRATION",
				component: () => import("@/views/settings/ShowcaseImage")
			},
			{
				path: "ad",
				name: "ADS ADMINISTRATION",
				component: () => import("@/views/ads/Ads")
			},
			{
				path: "ad/:id",
				name: "AD ADMINISTRATION",
				component: () => import("@/views/ads/AdDetail")
			},
		]
	},
	{
		path: "/profile",
		name: "FOLLOWER PROFILE",
		component: () => import("@/layouts/ProfileLayout"),
		children: [
			{
				path: "event",
				name: "PROFILE EVENTS",
				component: () => import("@/views/profile/EventsTab")
			},
			{
				path: "home",
				name: "ABOUT ME",
				component: () => import("@/views/profile/AboutMeTab")
			},
			{
				path: "photo",
				name: "MY PHOTOS",
				component: () => import("@/views/profile/PhotosTab")
			},
			{
				path: "multimedia",
				name: "MY MULTIMEDIAS",
				component: () => import("@/views/profile/MultimediaTab")
			},
			{
				path: "change-password",
				name: "CHANGE PASSWORD",
				component: () => import("@/views/profile/ChangePassword")
			},
			{
				path: "edit-detail",
				name: "EDIT DETAIL",
				component: () => import("@/views/profile/EditProfile")
			},
			{
				path: "location",
				name: "LOCATION",
				component: () => import("@/views/profile/LocationInfo")
			},
			{
				path: "branch",
				name: "MY BRANCH",
				component: () => import("@/views/profile/MyBranchInfo")
			},
			{
				path: "membership",
				name: "MEMBERSHIP INFORMATION",
				component: () => import("@/views/profile/Membership")
			},
		],
	},
]

const router = new VueRouter({
	base: process.env.BASE_URL,
	routes
})

export default router
