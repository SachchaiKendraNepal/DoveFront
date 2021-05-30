const AutocompleteInputChanged = {
	methods: {
		async inputChanged(type, data) {
			this.$emit(type, data)
			if (!this.mixinData) return
			if (this.mixinData.setter) {
				await this.$store.dispatch(this.mixinData.setter, {value: data})
			}
		}
	}
}

export default  AutocompleteInputChanged
