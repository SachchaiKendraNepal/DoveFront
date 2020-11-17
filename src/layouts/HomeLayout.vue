<template>
	<div>
		<tool-bar />
		<scroll-up />
	</div>
</template>

<script>
export default {
	name: "SacchaiHomeLayout",
	components: {
		ToolBar: () => import("@/views/home_layout/ToolBar"),
		ScrollUp: () => import("@/components/ScrollTop")
	}
}
</script>

