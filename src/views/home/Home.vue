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
					<no-home-data v-if="multimedias.count === 0"
						:image="require('@/assets/noPostsImg.jpg')"
					/>
					<div v-else>
						<div v-for="post in multimedias.results"
							:key="post.id" class="mb-2"
						>
							<multimedia
								:post="post"
							/>
						</div>
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
export default {
	name: "HomeComponent",
	components: {
		NoHomeData: () => import("@/components/NoHomeData"),
		HomeAdsColumnView: () => import("@/views/home/Ads"),
		Multimedia: () => import("@/components/Multimedia"),
		AddPostBox: () => import("@/views/home/AddPostBox")
	},
	data: () => ({
		loading: null,
		overlay: null,
	}),
	computed: {
		...mapGetters({
			multimedias: "multimedia/list"
		}),
	},
	async created() {
		this.loading = true
		if (!this.multimedias.count) {
			this.overlay = true
			await this.$store.dispatch("multimedia/filter", {is_approved: true})
			this.overlay = false
		}
		this.loading = false
	}
}
</script>
