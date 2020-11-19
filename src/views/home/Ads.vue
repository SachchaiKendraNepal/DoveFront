<template>
	<div class="ads-container">
		<v-card color="teal"
			dark
		>
			<v-card-title>
				Ads One<v-icon class="pl-3"
					color="aliceblue"
				>
					mdi-cash-usd
				</v-icon>
				<v-spacer />
				<v-icon>mdi-adobe</v-icon>
			</v-card-title>
			<v-card-subtitle>First Advertisement</v-card-subtitle>
			<v-card-text>This is a first advertisement.</v-card-text>
			<v-card-actions>
				<v-btn depressed
					color="teal darken-3"
				>
					See More
				</v-btn>
			</v-card-actions>
		</v-card>
		<v-card class="mt-3" color="green darken-4"
			dark
		>
			<v-card-title>
				Ads Two<v-icon class="pl-3"
					color="aliceblue"
				>
					mdi-cash-usd
				</v-icon>
				<v-spacer />
				<v-icon>mdi-bird</v-icon>
			</v-card-title>
			<v-card-subtitle>Second Advertisement</v-card-subtitle>
			<v-card-text>This is a second advertisement.</v-card-text>
			<v-card-actions>
				<v-btn depressed
					color="green darken-3"
				>
					See More
				</v-btn>
			</v-card-actions>
		</v-card>
		<v-card class="mt-3" color="orange darken-4"
			dark
		>
			<v-card-title>
				Ads Two<v-icon class="pl-3"
					color="aliceblue"
				>
					mdi-cash-usd
				</v-icon>
				<v-spacer />
				<v-icon>mdi-airplane-landing</v-icon>
			</v-card-title>
			<v-card-subtitle>Second Advertisement</v-card-subtitle>
			<v-card-text>This is a second advertisement.</v-card-text>
			<v-card-actions>
				<v-btn depressed
					color="orange darken-3"
				>
					See More
				</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>
<script>
export default {
	name: "HomeAdsColumnView"
}
</script>
