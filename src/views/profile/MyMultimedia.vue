<template>
	<v-card flat>
		<v-row v-if="myMultimedias.length > 0"
			justify="start"
			align="center"
			class="ma-0 pa-4"
		>
			<v-col
				v-for="(item, keyring) in myMultimedias"
				:key="keyring"
				cols="12"
			>
				<multimedia :post="item" />
			</v-col>
		</v-row>
		<div v-else
			class="ma-4"
		>
			<v-chip>No multimedias</v-chip>
		</div>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "MyMultimedia",
	components: {
		Multimedia: () => import("@/components/multimedia/MultimediaList.vue"),
	},
	computed: {
		...mapGetters({
			myMultimedias: "multimedia/list"
		})
	}
}
</script>

<style scoped>

</style>
