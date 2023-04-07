<script setup lang="ts">
import { fa } from 'element-plus/es/locale';
import { ref, reactive, onMounted } from 'vue';
import { throttleAndDebounce, Search, useWatermark } from '~/index';
// import Search from '~/components/Search/index.vue';

import config, { fakeData } from './config';

const searchRef = ref(),
	appContainer = ref(),
	state = reactive({
		optionsData: {},
	});

onMounted(() => {
	// console.log('throttleAndDebounce=>', throttleAndDebounce);
	initData();
	initWaterMark();
});

const initData = () => {
	setTimeout(() => {
		const data = fakeData;
		state.optionsData = data;
	}, 3000);
};

const initWaterMark = () => {
	console.log('searchRef=>', appContainer);

	const { setWatermark } = useWatermark(appContainer);

	setWatermark('脱离苦海', { fillStyle: 'red', type: 'children' });
};
</script>

<template>
	<div class="app-container" ref="appContainer">
		<Search ref="searchRef" :config="config" :optionsData="state.optionsData" />
	</div>
</template>

<style scoped></style>
