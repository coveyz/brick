<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { Search } from '@/packages';
import config, { fakeData } from './config';

const searchRef = ref(),
	state = reactive({
		optionsData: {},
	});

onMounted(() => {
	initData();
});

const initData = () => {
	setTimeout(() => {
		const data = fakeData;
		state.optionsData = data;
	}, 3000);
};
</script>

<template>
	<div class="app-container">
		<!-- {{ config }} -->
		<Search 
      ref="searchRef"
      :config="config"
      :optionsData="state.optionsData"
    /> 
	</div>
</template>

<style scoped></style>
