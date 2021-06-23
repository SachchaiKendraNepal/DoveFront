const AutocompleteInputChanged = {
	methods: {
		async inputChanged(type, data) {
			this.$emit(type, data)
		}
	}
}

export default AutocompleteInputChanged
