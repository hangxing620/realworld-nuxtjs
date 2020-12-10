<template>
	<div class="settings-page">
		<div class="container page">
			<div class="row">
				<div class="col-md-6 offset-md-3 col-xs-12">
					<h1 class="text-xs-center">Your Settings</h1>

					<form>
						<fieldset>
							<fieldset class="form-group">
								<input
									class="form-control"
									type="text"
									placeholder="URL of profile picture"
									v-model="otherUser.image"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Your Name"
									v-model="otherUser.username"
								/>
							</fieldset>
							<fieldset class="form-group">
								<textarea
									class="form-control form-control-lg"
									rows="8"
									placeholder="Short bio about you"
									v-model="otherUser.bio"
								></textarea>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="text"
									placeholder="Email"
									v-model="otherUser.email"
								/>
							</fieldset>
							<fieldset class="form-group">
								<input
									class="form-control form-control-lg"
									type="password"
									placeholder="Password"
									v-model="otherUser.password"
								/>
							</fieldset>
							<button
								class="btn btn-lg btn-primary pull-xs-right"
								@click.prevent="handleSubmit"
							>
								Update Settings
							</button>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import { updateUser } from "@/api/user.js";

export default {
	name: 'SettingsIndex',
	middleware: 'hasAuth',
	computed: {
		...mapState(["user"]),
	},
	data() {
		return {
			otherUser: {
				email: "",
				bio: "",
				image: "",
				password: "",
				username: "",
			},
		};
	},
	created() {
		this.voluation();
	},
	methods: {
		voluation() {
			if (this.user) {
				this.otherUser.email = this.user.email && this.user.email;
				this.otherUser.bio = this.user.bio && this.user.bio;
				this.otherUser.image = this.user.image && this.user.image;
				this.otherUser.username = this.user.username && this.user.username;
			}
		},
		async handleSubmit() {
			try {
				const user = {
					...this.otherUser,
				};
				if (!this.otherUser.password) {
					delete user.password;
				}
				const { data } = await updateUser({
					user: user,
				});
				console.log(data);
				this.$router.push({
					name: "home",
					query: {
						tab: "your_feed",
					},
				});
			} catch (error) {}
		},
	},
};
</script>

<style></style>
