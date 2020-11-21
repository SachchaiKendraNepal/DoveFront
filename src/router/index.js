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
				path: "feeds",
				name: "HOME",
				component: () => import("@/views/home/Home")
			},
			{
				path: "profile",
				name: "SACHCHAI NEPAL PROFILE",
				component: () => import("@/views/member/Profile")
			},
			{
				path: "my-posts",
				name: "MY POSTS",
				component: () => import("@/views/member/MyPosts")
			},
			{
				path: "follower",
				name: "SACHCHAI NEPAL FOLLOWERS",
				component: () => import("@/views/member/Member")
			},
			{
				path: "follower/:id",
				name: "SACHCHAI NEPAL FOLLOWER",
				component: () => import("@/views/member/MemberDetail")
			},
			{
				path: "branch",
				name: "SACHCHAI NEPAL BRANCHES",
				component: () => import("@/views/branch/BranchesHome")
			},
			{
				path: "branch/:id",
				name: "SACHCHAI NEPAL BRANCH",
				component: () => import("@/views/branch/BranchDetail")
			},
			{
				path: "article",
				name: "SACHCHAI NEPAL ARTICLES",
				component: () => import("@/views/article/Articles")
			},
			{
				path: "multimedia",
				name: "SACHCHAI NEPAL MULTIMEDIAS",
				component: () => import("@/views/multimedia/Multimedias")
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
		path: "/home/article/:id",
		name: "SACHCHAI NEPAL ARTICLE",
		component: () => import("@/views/article/ArticleDetail")
	},
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
				component: () => import("@/views/member/Member")
			},
			{
				path: "follower/:id",
				name: "FOLLOWER ADMINISTRATION",
				component: () => import("@/views/member/MemberDetail")
			},
			{
				path: "member",
				name: "MEMBERS ADMINISTRATION",
				component: () => import("@/views/member/Member")
			},
			{
				path: "member/:id",
				name: "MEMBER ADMINISTRATION",
				component: () => import("@/views/member/MemberDetail")
			},
			{
				path: "branch",
				name: "BRANCHES ADMINISTRATION",
				component: () => import("@/views/branch/Branch")
			},
			{
				path: "branch/:id",
				name: "BRANCH ADMINISTRATION",
				component: () => import("@/views/branch/BranchDetail")
			},
			{
				path: "article",
				name: "ARTICLES ADMINISTRATION",
				component: () => import("@/views/article/Articles")
			},
			// TODO create real
			{
				path: "pin",
				name: "PINS ADMINISTRATION",
				component: () => import("@/views/article/Articles")
			},

			{
				path: "multimedia",
				name: "MULTIMEDIA ADMINISTRATION",
				component: () => import("@/views/multimedia/Multimedias")
			},
			{
				path: "event",
				name: "EVENTS ADMINISTRATION",
				component: () => import("@/views/event/Events")
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
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
