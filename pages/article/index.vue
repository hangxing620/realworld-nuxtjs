<template>
	<div class="article-page">
		<div class="banner">
			<div class="container">
				<h1>{{ article.title }}</h1>
				<article-meta :article="article" />
			</div>
		</div>

		<div class="container page">
			<div class="row article-content">
				<div class="col-md-12" v-html="article.body">
					
				</div>
			</div>

			<hr />

			<div class="article-actions">
				<article-meta :article="article" />
			</div>

			<div class="row">
				<div class="col-xs-12 col-md-8 offset-md-2">
					<article-comments :article="article" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { getArticle } from '@/api/article.js'
import MarkdonwIt from 'markdown-it'
import ArticleMeta from './comoonents/article-meta.vue'
import ArticleComments from './comoonents/article-comments.vue'
export default {
	name: 'ArticleIndex',
	async asyncData({ query }) {
		const { data } = await getArticle(query.slug)
		const { article } = data
		return {
			article
		}
	},
	components: {
		ArticleMeta,
		ArticleComments
	},
};
</script>

<style></style>
