<template>
	<v-app>
		<router-view />
	</v-app>
</template>

<script>
export default {
	name: "App",
	data: () => ({
		//
	})
}
</script>
<style lang="scss">
.cursor {
	cursor: pointer
}

.form-title {
	font-size: 1rem;
	color: white;
	font-weight: 400;
	display: block;
	@media only screen and (max-width: 325px) {
		display: none
	}
}
.round-touch {
	border-radius: 4px;
}
.quick-sand-font {
	font-family: 'Quicksand', sans-serif;
}
.video-container {
	overflow: hidden;
	position: relative;
	width:100%;
}

.video-container::after {
	padding-top: 56.25%;
	display: block;
	content: '';
}

.video-container iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.send-icon-button {
	transform: rotate(-60deg)
}
</style>
