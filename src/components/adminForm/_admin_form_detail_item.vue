<template>
	<p class="ma-0 py-1">
		<v-icon class="small-detail-icon">
			{{ fieldIcon }}
		</v-icon>
		<b>{{ fieldName }}:</b>
		<span v-if="fieldValue"
			class="px-1"
		>
			{{ fieldValue }}
		</span>
		<span v-else
			class="px-1"
		>
			<slot name="content" />
		</span>
	</p>
</template>
<script>
export default {
	name: "AdminFormDetailItem",
	props: {
		fieldIcon: {
			type: String,
			required: true
		},
		fieldName: {
			type: String,
			required: true
		},
		fieldValue: {
			type: String,
			required: false,
			default: null
		}
	}
}
</script>
<style lang="scss" scoped>
.small-detail-icon {
	margin-top: -4px;
	margin-right: 4px;
}
</style>
