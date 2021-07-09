<template>
	<v-card v-if="multimedias"
		:loading="loading"
		flat
		max-width="700" class="mx-auto rounded-0"
		color="transparent"
	>
		<div v-if="$vuetify.breakpoint.smAndUp"
			class="py-2"
		/>

		<v-card color="#90328e14">
			<v-tabs
				v-model="tab"
				background-color="transparent"
				color="basil"
				grow
				show-arrows
				height="50"
				rounded
			>
				<v-tab
					v-for="item in items"
					:key="item.title"
					:to="item.to"
				>
					<v-icon>{{ item.icon }}</v-icon>
					<span class="pl-1">{{ item.title }}</span>
				</v-tab>
			</v-tabs>
		</v-card>

		<v-tabs-items v-model="tab"
			style="background-color: transparent"
		>
			<router-view />
		</v-tabs-items>
	</v-card>
</template>
<script>
import {mapGetters} from "vuex";
import NoHomeData from "@/components/feeds/NoHomeData.vue";

export default {
	name: "Multimedias",
	components: {
	},
	data: () => ({
		posts: [],
		loading: false,
		tab: null,
		items: [
			{icon: "mdi-pin", title: "Pins", to: "/home/multimedia"},
			{icon: "mdi-image", title: "Images", to: "/home/multimedia/images"},
			{icon: "mdi-video", title: "Videos", to: "/home/multimedia/videos"},
			{icon: "mdi-youtube", title: "Youtube", to: "/home/multimedia/youtube"},
		],
	}),
	computed: {
		...mapGetters({
			multimedias: "multimedia/list"
		}),
	},
	async created() {
		this.loading = true
		if (!this.multimedias.count) {
			await this.$store.dispatch("multimedia/filter", {is_approved: true})
		}
		this.posts = this.posts.concat(this.multimedias.results)
		this.loading = false
	},
}
</script>

<style scoped lang="scss">
.library-title {
	font-size: 2.6rem;
	font-weight: 400;
	font-family: 'Quicksand', sans-serif;
	padding: 20px 0;
}
.page-title {
	font-weight: bold;
	font-size: 3rem;
	@media only screen and (max-width: 600px) {
		font-size: 2rem;
	}
	@media only screen and (max-width: 255px) {
		font-size: 1.6rem;
	}
}
</style>
