<template>
	<v-card
		max-width="100vh"
		flat
		tile
		class="mx-auto transparent ma-2"
		min-height="87vh"
	>
		<v-card
			v-if="onGoingArticle"
			class="ma-2 mx-auto"
			max-width="100vh"
		>
			<v-toolbar flat>
				<v-app-bar-nav-icon style="font-size: 1.4rem;">
					<v-avatar>
						<v-img :src="require('@/assets/startWriting.png')" />
					</v-avatar>
				</v-app-bar-nav-icon>
				<v-toolbar-title class="pl-1 start-writing">
					Start Writing
				</v-toolbar-title>
				<v-spacer />
				<div class="mx-1" />
				<v-tooltip bottom>
					<template #activator="{on, attrs}">
						<v-btn
							color="indigo lighten-2"
							dark
							class="mr-1"
							v-bind="attrs"
							@click="saveDraft"
							v-on="on"
						>
							<v-icon class="px-1">
								mdi-content-save
							</v-icon>
						</v-btn>
					</template>
					<span>Draft</span>
				</v-tooltip>
				<v-tooltip bottom>
					<template #activator="{on, attrs}">
						<v-btn
							color="primary"
							dark
							class="post-article"
							v-bind="attrs"
							@click="postArticle"
							v-on="on"
						>
							<v-icon class="publish-icon px-1">
								mdi-send
							</v-icon>
						</v-btn>
					</template>
					<span>Publish</span>
				</v-tooltip>
			</v-toolbar>
			<v-fab-transition>
				<v-card
					v-if="!cover"
					height="300"
					tile
					flat
					class="upload-card"
					:color="(topImage) ? '' : 'grey lighten-2'"
					dark
				>
					<input
						v-show="false"
						id="top-image-input"
						ref="topImageInput"
						class="file-input"
						type="file"
						accept="image/*"
						@change="topImageInputChanged"
					>
					<v-fade-transition>
						<div
							v-if="!topImage"
							class="upload-wrapper"
						>
							<v-img
								class="upload-image"
								contain
								:src="getTopImage"
								height="60"
								@click="openUploader"
							/>
						</div>
						<v-img
							v-else
							contain
							height="300"
							max-width="936"
							:src="topImageUrl"
							class="cover-image"
						>
							<v-btn fab
								x-small
								class="ma-3 clear-image"
								@click="clearTopImage"
							>
								<v-icon
									color="red lighten-4"
								>
									mdi-close
								</v-icon>
							</v-btn>
							<v-btn fab
								x-small
								class="ma-3 set-image"
								@click="setCoverImage"
							>
								<v-icon
									color="green lighten-3"
								>
									mdi-check
								</v-icon>
							</v-btn>
						</v-img>
					</v-fade-transition>
				</v-card>
				<v-card
					v-else
					flat
					tile
					height="400"
					color="grey lighten-1"
				>
					<v-img
						contain
						:src="cover['image']"
						height="400"
					>
						<v-btn fab
							x-small
							color="red lighten-1"
							class="ma-4"
							@click="deleteCover"
						>
							<v-icon color="grey lighten-2">
								mdi-delete
							</v-icon>
						</v-btn>
					</v-img>
				</v-card>
			</v-fab-transition>
			<v-text-field
				v-model="headline"
				outlined
				color="grey"
				class="elevation-0 article-headline"
				height="80"
				hide-details="auto"
				placeholder="YOUR ARTICLE HEADER"
			/>
			<v-col cols="9"
				class="mx-auto"
			>
				<v-combobox
					v-model="tags"
					label="Set tags for your article"
					multiple
					chips
				>
					<template #selection="data">
						<v-chip
							:key="JSON.stringify(data.item)"
							v-bind="data.attrs"
							:input-value="data.selected"
							:disabled="data.disabled"
							@click:close="data.parent.selectItem(data.item)"
						>
							<v-avatar
								class="accent white--text"
								left
								v-text="data.item.slice(0, 1).toUpperCase()"
							/>
							#{{ data.item.toLowerCase() }}
						</v-chip>
					</template>
				</v-combobox>
			</v-col>
			<div
				id="editorjs"
				class="article-editor"
			/>
		</v-card>
	</v-card>
</template>
<script>
import $ from "jquery"
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import Underline from "@editorjs/underline";
import TextVariantTune from "@editorjs/text-variant-tune";
const Quote = require("@editorjs/quote");
const Marker = require("@editorjs/marker");
const Checklist = require("@editorjs/checklist");
const Paragraph = require("@editorjs/paragraph");
const Embed = require("@editorjs/embed");
import Undo from "editorjs-undo";
const urls = require("@/urls.json")
import DragDrop from "editorjs-drag-drop";
import {getAccessToken} from "@/Helper";
import {mapGetters} from "vuex";
import Snack from "@/mixins/Snack";


export default {
	mixins: [Snack],
	data: () => ({
		editor: null,
		topImage: null,
		topImageUrl: null,
		headline: null,
		tags: null,
		cover: null
	}),
	computed: {
		getTopImage() {
			return require("@/assets/uploadImage.png")
		},
		...mapGetters({
			onGoingArticle: "article/detail"
		})
	},
	mounted() {

	},
	async created() {
		await this.initialize()
		await this.initEditor(this.onGoingArticle)
	},
	methods: {
		async initialize() {
			const started = await this.$store.dispatch("article/startWriting")
			if (!started) await this.openSnack("Cannot start an article for you." +
				" Please contact administrator.")
			else {
				this.headline = this.onGoingArticle.title
				if (this.onGoingArticle.tags) {
					this.tags = this.onGoingArticle.tags.split(",")
				}
				if (this.onGoingArticle["cover_images"].length > 0) {
					this.cover = this.onGoingArticle["cover_images"][0]
				}
			}
		},
		initEditor(article) {
			this.editor = new EditorJS({
				onReady: () => {
					const editor = this.editor
					const undo = new Undo({ editor });
					new DragDrop(editor);
				},
				autofocus: true,
				holder: "editorjs",
				tools: {
					header: {
						class: Header,
						shortcut: "CMD+SHIFT+H",
						config: {
							placeholder: "Enter a header",
							levels: [1, 2, 3, 4, 5],
							defaultLevel: 1
						}
					},
					underline: Underline,
					list: List,
					textVariant: TextVariantTune,
					quote: {
						class: Quote,
						inlineToolbar: true,
						shortcut: "CMD+SHIFT+O",
						config: {
							quotePlaceholder: "Enter a quote",
							captionPlaceholder: "Quote's author",
						},
					},
					Marker: {
						class: Marker,
						shortcut: "CMD+SHIFT+M",
					},
					checklist: {
						class: Checklist,
						inlineToolbar: true,
					},
					paragraph: {
						class: Paragraph,
						inlineToolbar: true,
					},
					image: {
						class: ImageTool,
						config: {
							/**
							 * Custom uploader
							 */
							uploader: {
								/**
								 * Send URL-string to the server. Backend should load image by this URL and return an uploaded image data
								 * @param {string} url - pasted image URL
								 * @return {Promise.<{success, file: {url}}>}
								 */
								uploadByUrl(url) {
									var formData = new FormData();
									formData.append("image_url", url)
									formData.append("article", article.id)
									return $.ajax({
										url: `${urls.base_url}/api/${urls.articleImageUrl.list}`,
										type: "post",
										headers: {
											"Authorization": "Token " + getAccessToken()
										},
										contentType: false,
										data: formData,
										processData: false,
									}).then(res => {
										return {
											success: 1,
											file: {
												url: res.image_url,
											}
										};
									})
								},
								/**
								 * Upload file to the server and return an uploaded image data
								 * @param {File} file - file selected from the device or pasted by drag-n-drop
								 * @return {Promise.<{success, file: {url}}>}
								 */
								uploadByFile(file){
									var formData = new FormData();
									formData.append("image", file)
									formData.append("article", article.id)
									console.log(formData.get("image"))
									return $.ajax({
										url: `${urls.base_url}/api/${urls.articleImage.list}`,
										type: "post",
										headers: {
											"Authorization": "Token " + getAccessToken()
										},
										contentType: false,
										data: formData,
										processData: false,
									}).then(res => {
										return {
											success: 1,
											file: {
												url: res.image,
											}
										};
									})
								},
							}
						}
					},
					embed: Embed,
				},
				tunes: ["textVariant"],
				data: (this.onGoingArticle.description)
					? JSON.parse(this.onGoingArticle.description)
					: {}
			})
		},
		async saveDraft() {
			console.log(this.tags)
			const outputData = await this.editor.save()
			const res = await this.$store.dispatch("article/patch", {
				id: this.onGoingArticle.id,
				body: {
					title: this.headline,
					description: JSON.stringify(outputData),
					tags: (this.tags.length > 0) ? this.tags.join(",") : null
				}
			})
			if (res) await this.openSnack("Your article is saved as draft successfully.", "success")
			else await this.openSnack("Failed to save article as draft. Please try again.")
		},
		async postArticle() {
			const outputData = await this.editor.save()
			const res = await this.$store.dispatch("article/patch", {
				id: this.onGoingArticle.id,
				body: {
					title: this.headline,
					description: JSON.stringify(outputData)
				}
			})
			if (res) {
				const res = await this.$store.dispatch("article/completeWriting", {id: this.onGoingArticle.id})
				if (res) {
					await this.openSnack("Your article is published and will be visible after approval.", "success")
					await this.$router.push({name: "HOME"})
				}
				else await this.openSnack("Article failed to be completed. Please try again")
			} else await this.openSnack("Article publish failed. Please try again")
		},
		openUploader() {
			this.$refs.topImageInput.click()
		},
		topImageInputChanged(e) {
			if (e.target.getAttribute("id") === "top-image-input") {
				this.topImage = e.target.files[0]
				this.topImageUrl = URL.createObjectURL(this.topImage)
			}
		},
		clearTopImage() {
			this.topImage = null
			this.topImageUrl = null
		},
		async setCoverImage() {
			const formData = this.$helper.getFormData({
				article: this.onGoingArticle.id,
				image: this.topImage
			})
			await this.$store.dispatch("article/addCoverImage", formData)
			await this.initialize()
		},
		async deleteCover() {
			await this.$store.dispatch("article/deleteCover", {id: this.cover.id})
			await this.$store.dispatch("article/fetchSingle", {id: this.onGoingArticle.id})
			await this.initialize()
			this.cover = null
		}
	}
}
</script>

<style lang="sass" scoped>
::v-deep.article-headline input
	color: dimgrey !important
	background-color: transparent
	border-radius: 10px
	font-size: 2.1rem
	line-height: 2.5rem
	font-family: 'Quicksand', sans-serif
	font-weight: 600
	padding: 2px 4px
	min-height: 70px
.article-editor
	background-color: transparent
	max-width: 800px
	min-height: 80vh
	margin: auto
	padding-top: 40px
.article-headline
	max-width: 750px
	margin: auto
	padding: 30px 30px 0 30px
.upload-image
	filter: grayscale(100%)
	opacity: .8
	cursor: pointer
	transition: all .5s
.upload-image:hover
	filter: grayscale(0)
	opacity: 1
.upload-card
	display: flex
	align-items: center
	justify-content: center
.upload-wrapper
	border: 2px dashed grey
	border-radius: 6px !important
	padding: 12px
.start-writing
	color: dimgrey
	font-family: "Pacifico",sans-serif
	font-size: 1rem
	line-height: 1.4rem
	min-height: 1.6rem
	margin-bottom: -4px
.publish-icon
	transform: rotate(340deg)
	margin-top: -4px
.cover-image
	position: relative
	.clear-image
		position: absolute
		left: 20px
	.set-image
		position: absolute
		right: 20px
</style>
