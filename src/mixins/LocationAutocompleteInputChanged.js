const LocationAutocompleteInputChanged = {
	methods: {
		inputChanged(type, data) {
			this.$emit(type, data)
			this.$store.dispatch(this.mixinData.locationSetter, {value: data})
		}
	}
}

export default  LocationAutocompleteInputChanged
