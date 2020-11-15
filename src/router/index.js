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
				path: "",
				name: "SACHCHAI NEPAL HOME",
				component: () => import("@/views/home/Home")
			},
			{
				path: "profile",
				name: "SACHCHAI NEPAL PROFILE",
				component: () => import("@/views/home/member/Profile")
			},
			{
				path: "follower",
				name: "SACHCHAI NEPAL FOLLOWERS",
				component: () => import("@/views/home/member/Member")
			},
			{
				path: "follower/:id",
				name: "SACHCHAI NEPAL FOLLOWER",
				component: () => import("@/views/home/member/MemberDetail")
			},
			{
				path: "branch",
				name: "SACHCHAI NEPAL BRANCHES",
				component: () => import("@/views/home/branch/Branch")
			},
			{
				path: "branch/:id",
				name: "SACHCHAI NEPAL BRANCH",
				component: () => import("@/views/home/branch/BranchDetail")
			},
			{
				path: "article",
				name: "SACHCHAI NEPAL ARTICLES",
				component: () => import("@/views/home/article/Articles")
			},
			{
				path: "multimedia",
				name: "SACHCHAI NEPAL MULTIMEDIAS",
				component: () => import("@/views/home/multimedia/Multimedias")
			},
			{
				path: "event",
				name: "SACHCHAI NEPAL EVENTS",
				component: () => import("@/views/home/event/Events")
			},
			{
				path: "/home/event/:id",
				name: "SACHCHAI NEPAL EVENT",
				component: () => import("@/views/home/event/EventDetail")
			},
		]
	},
	// Detail Views (Requires Full Page)
	{
		path: "/home/article/:id",
		name: "SACHCHAI NEPAL ARTICLE",
		component: () => import("@/views/home/article/ArticleDetail")
	},
	{
		path: "/home/multimedia/:id",
		name: "SACHCHAI NEPAL MULTIMEDIA",
		component: () => import("@/views/home/multimedia/MultimediaDetail")
	},
	{
		path: "/auth/",
		component: () => import("@/layouts/AuthLayout"),
		children: [
			{
				path: "login",
				name: "SACHCHAI LOGIN",
				component: () => import("@/views/auth/Login")
			},
			{
				path: "reset-password",
				name: "SACHCHAI RESET PASSWORD",
				component: () => import("@/views/auth/ResetPassword")
			},
		],
	},
	{
		path: "/register",
		name: "SACHCHAI REGISTER",
		component: () => import("@/views/auth/Register")
	},
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
