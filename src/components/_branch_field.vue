<template>
	<v-col
		cols="12"
	>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-autocomplete :search-input.sync="branch"
			:value="value"
			:items="branches.results"
			:loading="branchesLoading"
			attach=""
			solo
			item-text="name"
			item-value="id"
			label="SELECT BRANCH"
			placeholder="Start typing"
			prepend-inner-icon="mdi-city"
			:error-messages="getErrorMessage"
			@input="inputChanged('input', $event)"
		>
			<template #no-data>
				<v-list-item>
					<v-list-item-title>
						No <code>branch</code> found.
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-col>
</template>
<script>
import BranchAutocomplete from "@/mixins/BranchAutocomplete";
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";

export default {
	name: "BranchField",
	mixins: [
		BranchAutocomplete,
		AdminFieldErrorMessage,
		AutocompleteInputChanged
	],
	props: {
		value: {
			required: true
		},
		errors: {
			type: Object,
			required: false,
			default: () => {}
		},
	},
	emits: ["input"],
	data() {
		return {
			name: "branch",
			mixinData: {
				setter: "branch/setSelectedBranch"
			}
		}
	},
}
</script>
