<template>
	<div class="sidebar-social-media">
		<div class="sidebar-social-media-title">
			<span><u>Follow Us On Facebook</u></span>
		</div>
		<!--		<div class="facebook-container">-->
		<!--			<div class="fb-page"-->
		<!--				data-href="https://www.facebook.com/Sachhaikendra-Nepal-2186630364921086" data-tabs="timeline"-->
		<!--				data-height="350"-->
		<!--				data-small-header="false" data-adapt-container-width="true"-->
		<!--				data-hide-cover="false" data-show-facepile="true"-->
		<!--			>-->
		<!--				<blockquote cite="https://www.facebook.com/Sachhaikendra-Nepal-2186630364921086"-->
		<!--					class="fb-xfbml-parse-ignore"-->
		<!--				>-->
		<!--					<a href="https://www.facebook.com/Sachhaikendra-Nepal-2186630364921086">Sachchai Kendra Nepal</a>-->
		<!--				</blockquote>-->
		<!--			</div>-->
		<!--		</div>-->
	</div>
</template>
<script>
export default {
	computed: {
		getWidth() {
			const width = window.innerWidth;
			return width < 500 ? 280 : 300;
		},
	}
};
</script>

<style lang="sass" scoped>
.sidebar-social-media
	.sidebar-social-media-title
		color: white
		font-size: 18px
		margin: 0 0 15px 0
		font-weight: 500
		u
			border-bottom: 5px dotted grey
		@media only screen and (max-width: 600px)
			padding: 0 0 10px 20px
	.facebook-container
		margin-top: 5px
		display: block
		@media only screen and (max-width: 600px)
			padding: 0 20px
		@media only screen and (max-width: 200px)
			display: none

</style>
