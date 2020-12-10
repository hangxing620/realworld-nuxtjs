<template>
	<div class="auth-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">{{ isLogin ? "Sign in" : "Sign up" }}</h1>
					<p class="text-xs-center">
						<nuxt-link v-if="isLogin" to="/register"
							>Need an account?</nuxt-link
						>
						<nuxt-link v-else to="/login">Have an account?</nuxt-link>
					</p>

					<ul class="error-messages">
            <li
              v-for="(message, index) in errors"
              :key="index"
            >{{ message }} </li>
					</ul>

					<form  @submit.prevent="handleSubmit">
						<fieldset class="form-group" v-if="!isLogin">
							<input
								class="form-control form-control-lg"
								type="text"
								placeholder="Your Name"
								v-model="user.username"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="text"
								placeholder="Email"
								v-model="user.email"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="password"
								placeholder="Password"
								v-model="user.password"
							/>
						</fieldset>
						<button class="btn btn-lg btn-primary pull-xs-right">
							{{ isLogin ? "Sign in" : "Sign up" }}
						</button>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { login, register } from "@/api/user";

const Cookie = process.client ? require("js-cookie") : undefined;

export default {
	middleware: 'noAuth',
	name: "LoginOrRegister",
	computed: {
		isLogin() {
			return this.$route.name === "login";
		},
	},
	data() {
		return {
			user: {
				username: "",
				email: "934752907@qq.com",
				password: "12345678",
			},
			errors: {
      }, // 错误消息
		};
	},
	methods: {
		async handleSubmit() {
			try {
				const { data } = this.isLogin
					? await login({
							user: this.user,
					  })
					: await register({
							user: this.user,
            });
        
        this.$store.commit('setUser', data.user)

        Cookie.set('user', data.user)

        this.$router.push('/')
			} catch (error) {
        // console.dir(error)
        this.errors = error.response.data.errors
      }
		},
	},
};
</script>

<style></style>
