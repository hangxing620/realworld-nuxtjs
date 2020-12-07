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
						<template
              v-for="(messages, field) in errors"
            >
              <li
                v-for="(message, index) in messages"
                :key="index"
              >{{ field }} {{ messages }}</li>
            </template>
					</ul>

					<form  @submit.prevent="handleSubmit">
						<fieldset class="form-group" v-if="!isLogin">
							<input
								class="form-control form-control-lg"
								type="text"
								placeholder="Your Name"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="text"
								placeholder="Email"
							/>
						</fieldset>
						<fieldset class="form-group">
							<input
								class="form-control form-control-lg"
								type="password"
								placeholder="Password"
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
				email: "lpzmail@163.com",
				password: "12345678",
			},
			errors: {
        'email': 'emial is a error',
        'password': 'password is an error'
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
							user: thi.user,
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
