<template>
	<v-card
		light
		max-width="650"
	>
		<v-toolbar
			dark
		>
			<v-avatar
				class="elevation-3"
				size="40"
				tile
			>
				<v-icon size="30">
					mdi-pencil-box
				</v-icon>
			</v-avatar>
			<v-spacer />
			<v-toolbar-title class="text-uppercase font-weight-bold">
				start a post
			</v-toolbar-title>
			<v-spacer />
			<v-avatar
				v-ripple
				class="elevation-3"
				size="40"
			>
				<v-icon
					@click="$emit('close-dialog')"
				>
					mdi-close-circle
				</v-icon>
			</v-avatar>
		</v-toolbar>
		<v-divider />
		<v-row
			id="post-detail-row"
			class="mx-2 pa-0"
			justify="start"
			align="center"
		>
			<v-col cols="2"
				class="pr-0 mr-0"
			>
				<v-avatar>
					<v-img
						class="elevation-6"
						src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
					/>
				</v-avatar>
			</v-col>
			<v-col
				cols="10"
				class="pl-0 ml-0"
			>
				<v-list two-line>
					<p class="ma-0 pa-0">
						Kiran Parajuli
					</p>
					<v-chip
						dense
						label
						style="font-size: 10px; font-weight: bold"
					>
						Member
						<v-icon right
							small
						>
							mdi-account-circle
						</v-icon>
					</v-chip>
				</v-list>
			</v-col>
			<v-col cols="12">
				<v-text-field
					id="title"
					v-model="post.title"
					class="ma-0 pa-0"
					name="title"
					placeholder="What is a title for your post, Kiran?"
					label="Title"
					hide-details="auto"
					outlined
					clearable
				/>
			</v-col>
			<v-col cols="12">
				<v-textarea
					id="description"
					v-model="post.description"
					class="ma-0 pa-0"
					name="description"
					placeholder="Write something about your activity, Kiran!"
					label="Description"
					outlined
					hide-details="auto"
					clearable
				/>
			</v-col>
		</v-row>
		<v-row
			id="add-resources-row"
			class="mx-5 pa-0"
			justify="center"
			align="center"
		>
			<p class="ma-0 pa-0">
				Add to your post
			</p>
			<v-spacer />
			<v-btn
				fab x-small
				dark
				color="#3aaada"
			>
				<v-icon>mdi-camera</v-icon>
			</v-btn>
			<v-btn
				fab x-small
				dark
				color="#9896f2"
			>
				<v-icon>mdi-music</v-icon>
			</v-btn>
			<v-btn
				fab x-small
				dark
				color="#009688"
			>
				<v-icon>mdi-video</v-icon>
			</v-btn>
			<v-btn
				fab x-small
				dark
				color="blue"
			>
				<v-icon>mdi-tag-faces</v-icon>
			</v-btn>
			<v-btn
				fab x-small
				dark
				color="red"
			>
				<v-icon>mdi-google-maps</v-icon>
			</v-btn>
		</v-row>
		<v-card-actions class="pa-4">
			<v-btn
				id="post-submit"
				block
				dark
				color="#288dba"
			>
				POST
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: "StartAPostComponent",
	emits: ["close-dialog"],
	data: () => ({
		post: {
			title: "",
			description: ""
		}
	}),
}
</script>

<style lang="sass">
#title
	font-family: Roboto, sans-serif
	font-size: 20px

#description
	margin-top: 0 !important
	padding-top: 15px !important
	font-size: 20px
	font-family: "Roboto", sans-serif
	line-height: 25px

#post-submit
	font-size: 18px
	letter-spacing: 0
	height: 42px
#add-resources-row
	padding: 8px !important
	border: 2px solid #008db6
	border-radius: 4px
	p
		font-size: 18px
	.v-btn
		margin-right: 4px
		margin-left: 4px
</style>
