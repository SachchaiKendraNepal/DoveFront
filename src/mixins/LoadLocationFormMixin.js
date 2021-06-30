const LoadLocationFormMixin = {
	methods: {
		async loadLocationItems(item) {
			await this.$store.dispatch("location/setCountries", item.country)
			await this.$store.dispatch("location/setProvinces", item.province)
			await this.$store.dispatch("location/setDistricts", item.district)
			await this.$store.dispatch("location/setMunicipalities", item.municipality)
			await this.$store.dispatch("location/setMunicipalityWards", item.municipality_ward)
			await this.$store.dispatch("location/setVdcs", item.vdc)
			await this.$store.dispatch("location/setVdcWards", item.vdc_wards)
		}
	}
}

export default LoadLocationFormMixin
