<template>
	<v-card class="mb-8 mt-2"
		min-height="82vh"
		flat
		color="transparent"
	>
		<no-multimedia-card
			v-if="pins.length === 0"
			text="There are not any pinned multimedias yet. You can always watch other videos or our youtube videos."
		/>
		<div v-else>
			<multimedia-list
				:posts="pins"
			/>
		</div>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "PinnedMedias",
	components: {
		NoMultimediaCard: () => import("@/components/multimedia/NoMultimediaCard.vue"),
		MultimediaList: () => import("@/components/multimedia/MultimediaList.vue"),
	},
	computed: {
		...mapGetters({
			multimedias: "multimedia/list"
		}),
		pins() {
			if (!this.multimedias) return []
			if (!this.multimedias.results) return []
			let temp = []
			this.multimedias.results.forEach(media => {
				if (media.is_pinned) {
					temp.push(media)
				}
			})
			return temp
		}
	}
}
</script>

<style scoped>
.no-data-gradient {
	background: #e5d9fc;
}
</style>
