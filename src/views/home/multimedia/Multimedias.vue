<template>
	<v-row
		justify="center"
		align="center"
		class="mx-4"
	>
		<v-col
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		>
			<multimedia-post />
		</v-col>
		<v-col
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		>
			<multimedia-post />
		</v-col>
		<v-col
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		>
			<multimedia-post />
		</v-col>
		<v-col
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		>
			<multimedia-post />
		</v-col>
	</v-row>
</template>
<script>
import MultimediaPost from "@/components/Multimedia"

export default {
	name: "MultimediaView",
	components: {
		MultimediaPost
	},
}
</script>
<style lang="sass" scoped>

</style>
