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
				path: "start-article",
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
				component: () => import("@/views/settings/FollowersTable")
			},
			{
				path: "member",
				name: "MEMBERS ADMINISTRATION",
				component: () => import("@/views/settings/MembersTable")
			},
			{
				path: "follower/:id",
				name: "FOLLOWER ADMINISTRATION",
				component: () => import("@/views/member/FollowerDetail")
			},
			{
				path: "branch",
				name: "BRANCHES ADMINISTRATION",
				component: () => import("@/views/settings/BranchTable")
			},
			{
				path: "branch/:id",
				name: "BRANCH ADMINISTRATION",
				component: () => import("@/views/branch/BranchDetail")
			},
			{
				path: "country",
				name: "COUNTRY ADMINISTRATION",
				component: () => import("@/views/settings/CountriesTable.vue")
			},
			{
				path: "province",
				name: "PROVINCE ADMINISTRATION",
				component: () => import("@/views/settings/ProvincesTable.vue")
			},
			{
				path: "district",
				name: "DISTRICT ADMINISTRATION",
				component: () => import("@/views/settings/DistrictsTable.vue")
			},
			{
				path: "municipality",
				name: "MUNICIPALITY ADMINISTRATION",
				component: () => import("@/views/settings/MunicipalitiesTable.vue")
			},
			{
				path: "municipality-ward",
				name: "MUNICIPALITY WARD ADMINISTRATION",
				component: () => import("@/views/settings/MunicipalityWardsTable.vue")
			},
			{
				path: "vdc",
				name: "VDC ADMINISTRATION",
				component: () => import("@/views/settings/VDCsTable.vue")
			},
			{
				path: "vdc-ward",
				name: "VDC WARD ADMINISTRATION",
				component: () => import("@/views/settings/VDCWardsTable.vue")
			},
			{
				path: "article",
				name: "ARTICLES ADMINISTRATION",
				component: () => import("@/views/settings/ArticlesTable.vue")
			},

			{
				path: "multimedia",
				name: "MULTIMEDIA ADMINISTRATION",
				component: () => import("@/views/settings/MultimediasTable.vue")
			},
			{
				path: "event",
				name: "EVENTS ADMINISTRATION",
				component: () => import("@/views/settings/EventsTable")
			},
			{
				path: "showcase-gallery",
				name: "SHOWCASE GALLERY ADMINISTRATION",
				component: () => import("@/views/settings/ShowcaseImage.vue")
			},
			{
				path: "ad",
				name: "ADS ADMINISTRATION",
				component: () => import("@/views/settings/AdsTable")
			},
			{
				path: "about-us",
				name: "ABOUT US ADMINISTRATION",
				component: () => import("@/views/settings/AboutUsTable")
			},
			{
				path: "contact-us",
				name: "CONTACT US ADMINISTRATION",
				component: () => import("@/views/settings/ContactUsTable")
			},
			{
				path: "service",
				name: "SERVICES ADMINISTRATION",
				component: () => import("@/views/settings/ServicesTable")
			},
			{
				path: "feedback",
				name: "ABOUT US ADMINISTRATION",
				component: () => import("@/views/settings/AboutUsTable")
			},
			{
				path: "showcase-map",
				name: "MAP ADMINISTRATION",
				component: () => import("@/views/settings/MapAdmin.vue")
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
