import Vue from "vue"
import VueRouter from "vue-router"
import HomeLayout from "@/layouts/HomeLayout"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		component: HomeLayout,
		children: [
			{
				path: "",
				name: "SACCHAI NEPAL",
				component: () => import("@/views/home/Home")
			},
			{
				path: "member",
				name: "SACCHAI NEPAL MEMBERS",
				component: () => import("@/views/home/member/Member")
			},
			{
				path: "branch",
				name: "SACCHAI NEPAL BRANCHES",
				component: () => import("@/views/home/branch/Branch")
			},
			{
				path: "article",
				name: "SACCHAI NEPAL ARTICLES",
				component: () => import("@/views/home/article/Article")
			},
			{
				path: "multimedia",
				name: "SACCHAI NEPAL MULTIMEDIA",
				component: () => import("@/views/home/multimedia/Multimedia")
			}
		]
	},
	{
		path: "/auth/",
		component: () => import("@/layouts/AuthLayout"),
		children: [
			{
				path: "login",
				name: "SACCHAI LOGIN",
				component: () => import("@/views/auth/Login")
			},
			{
				path: "reset-password",
				name: "SACCHAI LOGIN",
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
