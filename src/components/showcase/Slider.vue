<template>
	<v-card :loading="loading">
		<v-carousel
			class="not-round"
			cycle
			height="700"
			hide-delimiter-background
			:show-arrows="false"
		>
			<v-carousel-item
				v-for="(item,i) in items"
				:key="i"
				:src="item.src"
			/>
		</v-carousel>
	</v-card>
</template>
<script>
export default {
	data: () => ({
		loading: false,
		groupMembers: null,
		leading: null,
		clapping: null,
		praying: null,
		items: [
			{src: "https://linkpicture.com/q/mass_clapping.jpg"},
			{src: "https://wallpaperaccess.com/full/19849.jpg"},
			{src: "https://cdn.wallpapersafari.com/10/51/h6L8oM.jpg"},
			{src: "https://scontent.fpkr1-1.fna.fbcdn.net/v/t1.0-9/106922503_2624236627827122_630605177776418106_o.jpg?_nc_cat=108&_nc_sid=0debeb&_nc_ohc=xqPHFSuy5P0AX_kj3_A&_nc_ht=scontent.fpkr1-1.fna&oh=1185e223b787c1bdaec4640528cd2298&oe=5F9F96C3"},
			{src: "https://scontent.fpkr1-1.fna.fbcdn.net/v/t1.0-9/89721996_2530177323899720_4575941994920017920_o.jpg?_nc_cat=108&_nc_sid=cdbe9c&_nc_ohc=uES2lZddZB4AX-iyEPB&_nc_ht=scontent.fpkr1-1.fna&oh=eab99811787e665a378ec34eff1fccd2&oe=5F9C942F"},
			{src: "https://scontent.fpkr1-1.fna.fbcdn.net/v/t1.0-9/87267997_2517803278470458_2564901709792935936_o.jpg?_nc_cat=107&_nc_sid=cdbe9c&_nc_ohc=jmpf2GzUYOUAX8tB-r1&_nc_ht=scontent.fpkr1-1.fna&oh=378022ebaaca8045c234043ff6182141&oe=5F9EECC3"}
		],
	}),
}
</script>
<style lang="sass" scoped>
.not-round
	border-radius: 0!important
</style>
