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
				name: "SACHCHAI NEPAL",
				component: () => import("@/views/home/Home")
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
				path: "article/:id",
				name: "SACHCHAI NEPAL ARTICLE",
				component: () => import("@/views/home/article/ArticleDetail")
			},
			{
				path: "multimedia",
				name: "SACHCHAI NEPAL MULTIMEDIAS",
				component: () => import("@/views/home/multimedia/Multimedias")
			},
			{
				path: "multimedia/:id",
				name: "SACHCHAI NEPAL MULTIMEDIA",
				component: () => import("@/views/home/multimedia/MultimediaDetail")
			}
		]
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
			}
		]
	}
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
