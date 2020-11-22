<template>
	<tab-item-card value="tab-Photos">
		<template #content>
			<v-card class="ma-2">
				<v-card-title class="display-1">
					Photos
				</v-card-title>
				<v-card-text class="headline pb-0">
					This November
				</v-card-text>
				<v-row class="ma-0 pa-0 px-1">
					<v-col
						v-for="n in 9"
						:key="n"
						class="d-flex child-flex pa-1"
						cols="4"
					>
						<v-img
							:src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
							:lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
							aspect-ratio="1"
							class="grey lighten-2"
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
				<v-card-text class="headline pb-0">
					This Year 2020
				</v-card-text>
				<v-row class="ma-0 pa-0 px-1">
					<v-col
						v-for="n in 9"
						:key="n"
						class="d-flex child-flex pa-1"
						cols="4"
					>
						<v-img
							:src="`https://picsum.photos/500/300?image=${n * 5 + 10}`"
							:lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
							aspect-ratio="1"
							class="grey lighten-2"
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
		</template>
	</tab-item-card>
</template>
<script>
export default {
	name: "ProfilePhotosTabView",
	components: {
		TabItemCard: () => import("@/components/ProfileTabItem")
	}
}
</script>
