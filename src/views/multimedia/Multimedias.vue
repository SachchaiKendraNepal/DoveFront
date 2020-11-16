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
			<multimedia-post :post="multimediaPost" />
		</v-col>
		<v-col
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		>
			<multimedia-post :post="multimediaPost" />
		</v-col>
		<v-col
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		>
			<multimedia-post :post="multimediaPost" />
		</v-col>
		<v-col
			cols="12"
			xl="3"
			lg="4"
			md="4"
			sm="6"
		>
			<multimedia-post :post="multimediaPost" />
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
	data: () => ({
		multimediaPost: {
			id: 1,
			title: "Alice in the Wonderland",
			author: "Kiran Parajuli",
			description: "Alice, now 19 years old, follows a rabbit in a blue coat to a magical wonderland from her dreams where she is reunited with her friends who make her realise her true destiny."
		}
	})
}
</script>
<style lang="sass" scoped>

</style>
