<template>
	<v-card
		min-height="82vh"
		color="transparent"
	>
		<no-multimedia-card
			v-if="images.length === 0"
			text="Image database is empty."
		/>
		<v-card v-for="p in images"
			:key="p.id" class="my-2 mx-1"
		>
			<card-img :src="p.image"
				height="35vh"
				:contain="false"
			/>
			<div class="py-1" />
			<multimedia-action />
		</v-card>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "Images",
	components: {
		NoMultimediaCard: () => "@/components/multimedia/NoMultimediaCard.vue",
		MultimediaAction: () => import("@/components/multimedia/MultimediaAction.vue")
	},
	computed: {
		...mapGetters({
			multimedias: "multimedia/list"
		}),
		images() {
			if(!this.multimedias) return []
			if(!this.multimedias.results) return []
			let temp = []
			this.multimedias.results.forEach(media => {
				temp = temp.concat(media["multimedia_images"])
			})
			return temp
		}
	}
}
</script>

<style scoped>

</style>
