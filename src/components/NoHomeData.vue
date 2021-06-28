<template>
	<v-card
		color="transparent"
		class="no-post py-3"
		flat
		min-height="73vh"
	>
		<v-chip color="purple lighten-5"
			label
		>
			{{ topText }}
		</v-chip>
		<v-card height="200"
			max-width="500"
			class="ma-4 mx-auto"
			color="transparent"
		>
			<v-img
				height="200"
				:src="image"
			/>
		</v-card>
		<v-chip label
			color="blue lighten-4"
		>
			{{ bottomText }}
		</v-chip>
	</v-card>
</template>

<script>
export default {
	name: "NoHomeData",
	props: {
		image: {
			type: String,
			default: "https://media.giphy.com/media/1O2BRZcDgIfDsKMTbG/giphy.gif"
		}
	},
	computed: {
		getKey() {
			if (this.$route.name === "HOME") return "posts"
			else if (this.$route.name === "SACHCHAI NEPAL ARTICLES") return "articles"
			else if (this.$route.name === "SACHCHAI NEPAL MULTIMEDIAS") return "multimedias"
			else if (this.$route.name === "SACHCHAI NEPAL EVENTS") return "events"
			else return "none"
		},
		topText() {
			return `There are not any approved Sachchai ${this.getKey} available right now. Please visit us later.`
		},
		bottomText() {
			return "Contribute to Sachchai Kendra Nepal by sharing your great moments with us."
		}
	}
}
</script>

<style scoped lang="sass">
.no-post
	text-align: center
	color: lightslategrey
	font-size: .875rem
</style>
