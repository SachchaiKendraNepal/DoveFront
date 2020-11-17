<template>
	<v-tab-item value="tab-photos">
		<v-dialog
			v-model="fullScreenDialog"
			max-width="90vw"
			max-height="90vh"
		>
			<v-row class="ma-0 pa-0"
				justify="center" align="center"
			>
				<v-col cols="12">
					<v-img :src="selectedImage"
						max-width="100%"
						max-height="80vh"
						@click.stop="closeImageDialog"
					/>
				</v-col>
			</v-row>
		</v-dialog>
		<v-card flat>
			<!--								<v-card-text v-show="eventImages.length === 0">-->
			<!--									No photos added yet!-->
			<!--								</v-card-text>-->
			<v-row class="ma-0 pa-2">
				<v-col
					v-for="n in 9"
					:key="n"
					class="d-flex child-flex"
					cols="4"
				>
					<v-img
						:src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
						:lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
						class="grey lighten-2"
						@click.stop="zoomImage('https://i.pinimg.com/originals/ff/c4/3f/ffc43fa252e7a7bd99e8a70a1b2aa499.jpg')"
					>
						<template #placeholder>
							<v-row
								class="fill-height ma-0"
								align="center"
								justify="center"
							>
								<v-progress-circular
									indeterminate
									color="grey lighten-5"
								/>
							</v-row>
						</template>
					</v-img>
				</v-col>
			</v-row>
		</v-card>
	</v-tab-item>
</template>
<script>
export default {
	name: "EventDetailPhotosTabContent",
	props: {
		event: {
			type: Object,
			required: true
		}
	},
	data: () => ({
		selectedImage: null,
		fullScreenDialog: false,
	}),
	methods: {
		closeImageDialog() {
			this.fullScreenDialog = false
			this.selectedImage = null
		},
		zoomImage(url) {
			this.fullScreenDialog=true
			this.selectedImage = url
		}
	}
}
</script>
