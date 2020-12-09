<template>
	<div class="editor-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-10 offset-md-1 col-xs-12">
					<form @submit.prevent="handleSubmitArticle">
						<fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control form-control-lg"
									placeholder="Article Title"
									v-model="article.title"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="What's this article about?"
									v-model="article.description"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control"
									rows="8"
									placeholder="Write your article (in markdown)"
									v-model="article.body"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									type="text"
									class="form-control"
									placeholder="Enter tags"
									v-model="tags"
								/>
								<div class="tag-list"></div>
							</fieldset>
							<button
								class="btn btn-lg pull-xs-right btn-primary"
								type="button"
								@click.prevent="handleSubmitArticle"
							>
								Publish Article
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { addArticle } from '@/api/article.js'

export default {
	data() {
		return {
			article: {
				title: '',
				description: '',
				body: '',
				tagList: []
			},
			tags: ''
		}
	},
	methods: {
		async handleSubmitArticle() {
			this.article.tagList = this.tags.split(' ')
			const { data } = await addArticle({
				article: this.article
			})
			console.log(data);
		}
	}
};
</script>

<style></style>
