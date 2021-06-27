<template>
	<v-col
		cols="12"
	>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-autocomplete :search-input.sync="follower"
			:value="value"
			:items="followers.results"
			:loading="followersLoading"
			attach=""
			solo
			clearable
			item-text="username"
			item-value="id"
			hide-details="auto"
			label="SELECT FOLLOWER"
			placeholder="Start typing"
			prepend-inner-icon="mdi-card-account-details-outline"
			:error-messages="getErrorMessage"
			@input="inputChanged('input', $event)"
		>
			<template #no-data>
				<v-list-item>
					<v-list-item-title>
						No <code>follower</code> found.
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-col>
</template>
<script>
import AdminFieldErrorMessage from "@/mixins/AdminFieldErrorMessage";
import AutocompleteInputChanged from "@/mixins/AutocompleteInputChanged";
import FollowerAutocomplete from "@/mixins/FollowerAutocomplete";

export default {
	name: "FollowerField",
	mixins: [
		FollowerAutocomplete,
		AdminFieldErrorMessage,
		AutocompleteInputChanged
	],
	props: {
		/* eslint-disable vue/require-prop-types */
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
			name: "user",
			mixinData: {
				setter: "user/setSelectedFollower"
			}
		}
	},
	created() {
		if (this.value) {
			this.$store.dispatch("user/filter", {
				search: this.value.username,
			})
		}
	},
}
</script>
