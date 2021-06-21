<template>
	<v-card :loading="loading">
		<v-tabs
			v-model="profileImagesTab"
			background-color="transparent"
			color="basil"
			grow
		>
			<v-tab
				v-for="item in aboutPhotosTabItems"
				:key="item"
			>
				{{ item }}
			</v-tab>
		</v-tabs>

		<v-tabs-items v-model="profileImagesTab">
			<v-tab-item>
				<v-card
					color="basil"
					flat
					min-height="360"
				>
					<v-row v-if="myArticleImages.length > 0"
						class="ma-0 pa-0"
					>
						<v-col
							v-for="item in myArticleImages"
							:key="item"
							class="d-flex child-flex"
							cols="4"
						>
							<v-card
								height="200"
								max-width="300"
							>
								<v-img
									:src="item.image"
									max-width="300"
									height="300"
								/>
							</v-card>
						</v-col>
					</v-row>
					<div
						v-else
						class="d-flex align-center justify-center"
						style="min-height: 360px;"
					>
						<v-chip label>
							No article images
						</v-chip>
					</div>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card
					color="basil"
					flat
					min-height="360"
				>
					<v-row v-if="myMultimediaImages.length > 0"
						class="ma-0 pa-0"
					>
						<v-col
							v-for="item in myMultimediaImages"
							:key="item"
							class="d-flex child-flex"
							cols="4"
						>
							<v-card
								height="200"
								max-width="300"
							>
								<v-img
									:src="item.image"
									max-width="300"
									height="300"
								/>
							</v-card>
						</v-col>
					</v-row>
					<div
						v-else
						class="d-flex align-center justify-center"
						style="min-height: 360px;"
					>
						<v-chip>
							No multimedia images
						</v-chip>
					</div>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card
					color="basil"
					flat
					min-height="360"
				>
					<v-row v-if="coverImages.length > 0"
						class="ma-0 pa-0"
					>
						<v-col
							v-for="item in coverImages"
							:key="item"
							class="d-flex child-flex"
							cols="4"
						>
							<v-card
								height="200"
								max-width="300"
							>
								<v-img
									:src="item.image"
									max-width="300"
									height="300"
								/>
							</v-card>
						</v-col>
					</v-row>
					<div
						v-else
						class="d-flex align-center justify-center"
						style="min-height: 360px;"
					>
						<v-chip label>
							No cover images
						</v-chip>
					</div>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card
					color="basil"
					flat
					min-height="360"
				>
					<v-row v-if="profileImages.length > 0"
						class="ma-0 pa-0"
					>
						<v-col
							v-for="item in profileImages"
							:key="item"
							class="d-flex child-flex"
							cols="4"
						>
							<v-card
								height="200"
								max-width="300"
							>
								<v-img
									:src="item.image"
									max-width="300"
									height="300"
								/>
							</v-card>
						</v-col>
					</v-row>
					<div
						v-else
						class="d-flex align-center justify-center"
						style="min-height: 360px;"
					>
						<v-chip>
							No profile images
						</v-chip>
					</div>
				</v-card>
			</v-tab-item>
			<v-tab-item>
				<v-card
					color="basil"
					flat
					min-height="360"
				>
					<v-row v-if="myEventImages.length > 0"
						class="ma-0 pa-0"
					>
						<v-col
							v-for="item in myEventImages"
							:key="item"
							class="d-flex child-flex"
							cols="4"
						>
							<v-card
								height="200"
								max-width="300"
							>
								<v-img
									:src="item.image"
									max-width="300"
									height="300"
								/>
							</v-card>
						</v-col>
					</v-row>
					<div
						v-else
						class="d-flex align-center justify-center"
						style="min-height: 360px;"
					>
						<v-chip>
							No event images
						</v-chip>
					</div>
				</v-card>
			</v-tab-item>
		</v-tabs-items>
	</v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
	name: "ProfilePhotosTab",
	data() {
		return {
			loading: false,
			profileImagesTab: null,
			aboutPhotosTabItems: [
				"Profile",
				"Cover",
				"Article",
				"Multimedia",
				"Event"
			],
		}
	},
	computed: {
		...mapGetters({
			myArticles: "article/list",
			myMultimedias: "multimedia/list",
			myEvents: "event/list"
		}),
		myArticleImages() {
			if (this.myArticles) {
				let articleImages = []
				if (this.myArticles.count > 0) {
					this.myArticles.results.forEach(myArticle => {
						articleImages.push(myArticle["article_images"])
					})
					return articleImages
				} else return []
			}
			return []
		},
		myMultimediaImages() {
			if (this.myMultimedias) {
				let multimediaImages = []
				if (this.myMultimedias.count > 0) {
					this.myMultimedias.results.forEach(myMultimedia => {
						multimediaImages.push(myMultimedia["multimedia_images"])
					})
					return multimediaImages
				} else return []
			}
			return []
		},
		myEventImages() {
			if (this.myEvents) {
				let eventImages = []
				if (this.myEvents.count > 0) {
					this.myEvents.results.forEach(myEvent => {
						eventImages.push(myEvent["images"])
					})
					return eventImages
				} else return []
			}
			return []
		},
		coverImages() {
			return this.$helper.getCurrentUser()["profile"]["cover_images"]
		},
		profileImages() {
			return this.$helper.getCurrentUser()["profile"]["profile_images"]
		}
	}
}
</script>

<style scoped>

</style>
