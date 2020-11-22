<template>
	<v-card class="ma-2">
		<div class="peek-heading">
			<p>
				<v-icon color="white">
					mdi-folder-multiple-image
				</v-icon><span class="ml-2">Peek Photos</span>
			</p>
		</div>
		<v-row class="ma-0 pa-1">
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
<script>
export default {
	name: "PeekPhotosView",
}
</script>
<style lang="sass" scoped>
.stick
	position: -webkit-sticky
	position: sticky
	top: 450px
.peek-heading
	padding: 10px 0 0 15px
	background-color: #228396
	p
		margin: 0
		padding-bottom: 10px
		color: white
</style>
