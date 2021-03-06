<template>
	<div class="home-page">
		<div class="banner">
			<div class="container">
				<h1 class="logo-font">小白人</h1>
				<p>A place to share your knowledge.</p>
			</div>
		</div>

		<div class="container page">
			<div class="row">
				<div class="col-md-9">
					<div class="feed-toggle">
						<ul class="nav nav-pills outline-active">
							<li v-if="user" class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{
										active: tab === 'your_feed',
									}"
									exact
									:to="{
										name: 'home',
										query: {
											tab: 'your_feed',
										},
									}"
									>Your Feed</nuxt-link
								>
							</li>
							<li class="nav-item">
								<nuxt-link
									class="nav-link"
									:class="{
										active: tab === 'global_feed',
									}"
									exact
									:to="{
										name: 'home',
										query: {
											tab: 'global_feed',
										},
									}"
									>Global Feed</nuxt-link
								>
							</li>
							<li class="nav-item" v-if="tag">
								<nuxt-link
									class="nav-link"
									:class="{
										active: tab === 'tag',
									}"
									exact
									:to="{
										name: 'home',
										query: {
											tab: 'tag',
											tag: tag,
										},
									}"
									># {{ tag }}</nuxt-link
								>
							</li>
						</ul>
					</div>

					<div
						v-for="article in articles"
						:key="article.slug"
						class="article-preview"
					>
						<div class="article-meta">
							<nuxt-link
								:to="{
									name: 'profile',
									params: {
										username: article.author.username,
									},
								}"
								><img :src="article.author.image"
							/></nuxt-link>
							<div class="info">
								<nuxt-link to="/profile" class="author">{{
									article.author.username
								}}</nuxt-link>
								<span class="date">{{
									article.createdAt | date("MMM DD YYYY")
								}}</span>
							</div>
							<button
								:class="{
									active: article.favorited,
								}"
								:disabled="article.favoriteDisabled"
								@click.prevent="onFavorite(article)"
								class="btn btn-outline-primary btn-sm pull-xs-right"
							>
								<i class="ion-heart"></i> {{ article.favoritesCount }}
							</button>
						</div>
						<nuxt-link
							:to="{
								name: 'article',
								query: {
									slug: article.slug,
								},
							}"
							class="preview-link"
						>
							<h1>{{ article.title }}</h1>
							<p>{{ article.description }}</p>
							<span>Read more...</span>
						</nuxt-link>
					</div>
					<!-- 分页列表 -->
					<nav>
						<ul class="pagination">
							<li
								class="page-item"
								:class="{
									active: item === page,
								}"
								v-for="item in totalPage"
								:key="item"
							>
								<nuxt-link
									class="page-link"
									:to="{
										name: 'home',
										query: {
											page: item,
											tag: $route.query.tag,
											tab: tab,
										},
									}"
									>{{ item }}</nuxt-link
								>
							</li>
						</ul>
					</nav>
					<!-- /分页列表 -->
				</div>

				<div class="col-md-3">
					<div class="sidebar">
						<p>Popular Tags</p>

						<div class="tag-list">
							<nuxt-link
								v-for="tag in tags.slice(0, 10)"
								:key="tag"
								:to="{
									name: 'home',
									query: {
										tab: 'tag',
										tag: tag,
									},
								}"
								class="tag-pill tag-default"
								>{{ tag }}</nuxt-link
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {
	getArticles,
	getYourFeedArticles,
	addFavorite,
	deleteFavorite,
} from "@/api/article";
import { getTags } from "@/api/tag";
import { mapState } from "vuex";
export default {
	name: "HomeIndex",
	async asyncData({ query }) {
		const page = Number.parseInt(query.page || 1);
		const limit = 20;
		const tab = query.tab || "global_feed";
		const tag = query.tag;

		const loadAtricles =
			tab === "your_feed" ? getYourFeedArticles : getArticles;

		const [articleRes, tagRes] = await Promise.all([
			loadAtricles({
				limit,
				offset: (page - 1) * limit,
				tag,
			}),
			getTags(),
		]);

		const { articles, articlesCount } = articleRes.data;
		const { tags } = tagRes.data;

		articles.forEach((article) => (article.favoriteDisabled = false));

		return {
			articles, // 文章列表
			articlesCount,
			tags,
			limit,
			page,
			tab,
			tag,
		};
	},
	watchQuery: ["page", "tag", "tab"],
	computed: {
		...mapState(["user"]),
		totalPage() {
			return Math.ceil(this.articlesCount / this.limit);
		},
	},
	methods: {
		async onFavorite(article) {
			try {
				article.favoriteDisabled = true
				if (article.favorited) {
					// 取消点赞
					await deleteFavorite(article.slug)
					article.favorited = false
					article.favoritesCount += -1
				} else {
					// 添加点赞
					await addFavorite(article.slug)
					article.favorited = true
					article.favoritesCount += 1
				}
				article.favoriteDisabled = false
			} catch (error) {
			}
		},
	},
};
</script>

<style></style>
