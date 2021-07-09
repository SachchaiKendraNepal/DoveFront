<template>
	<div>
		<v-overlay :value="overlay">
			<v-progress-circular indeterminate
				size="64"
			/>
		</v-overlay>
		<v-card
			flat
			color="transparent"
			class="mx-auto pa-0"
			max-width="1000"
		>
			<div class="py-1" />
			<v-row
				class="ma-0 pa-0"
				align="start"
				justify="center"
			>
				<v-col
					class="ma-0"
					cols="12"
					xl="8"
					lg="8"
					md="8"
					sm="8"
				>
					<add-post-box />
					<no-home-data v-if="multimedias.count === 0 || !multimedias.results"
						:image="require('@/assets/noPostsImg.jpg')"
					/>
					<div v-else>
						<multimedia-list
							:posts="multimedias.results"
						/>
					</div>
				</v-col>
				<v-col
					cols="12"
					xl="4"
					lg="4"
					md="4"
					sm="4"
				>
					<home-ads-column-view />
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>

<script>
import {mapGetters} from "vuex";
import HtmlVideoMixin from "@/mixins/HtmlVideoMixin..js";

export default {
	name: "HomeComponent",
	components: {
		MultimediaList: () => import("@/components/multimedia/MultimediaList.vue"),
		NoHomeData: () => import("@/components/feeds/NoHomeData.vue"),
		HomeAdsColumnView: () => import("@/views/home/Ads"),
		AddPostBox: () => import("@/views/home/AddPostBox")
	},
	mixins: [HtmlVideoMixin],
	data: () => ({
		loading: null,
		overlay: null,
	}),
	computed: {
		...mapGetters({
			multimedias: "multimedia/list"
		})
	},
	async created() {
		this.loading = true
		if (!this.multimedias.count) {
			this.overlay = true
			await this.$store.dispatch("multimedia/filter", {is_approved: true})
			this.overlay = false
		}
		this.loading = false
	},
}
</script>
