<template>
	<div class="dashboard-container">
    <github-corner />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GithubCorner from './components/GithubCorner.vue';

// import axios from 'axios';
export default defineComponent({
	components: { GithubCorner },
	setup() {
		return {};
	},
	created() {},
	methods: {
		//todo github repo release
		// getGitHubInfo() {
		// axios.get('https://api.github.com/repos/coveyz/brick').then((res) => {
		// 	console.log('rres=>', res);
		// });
		// },
	},
});
</script>

<style scoped lang="scss">
.dashboard-container {
	padding: 32px;
	background-color: #f0f2f5;
	position: relative;
}
</style>
