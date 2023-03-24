<script setup lang="ts">
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';

import { useWrapper } from '../hooks';

const { id, hidden, showHiddenBtn, toggle } = useWrapper();

console.log('hidden=>', hidden, 'showHiddenBtn=>', showHiddenBtn);
</script>

<template>
	<div :id="id" class="search-wrapper" :class="{ 'wrapper-hidden': hidden }">
		<slot />
		<div class="form-btn" @click="toggle" v-if="showHiddenBtn">
			<el-button v-if="hidden" :icon="ArrowDown" class="more-btn" />
			<el-button v-else :icon="ArrowUp" class="more-btn" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.wrapper-hidden {
	height: 90px;
	overflow: hidden;
	transition: all 2s;
}
.search-wrapper {
	position: relative;
	.form-btn {
		position: absolute;
		top: 0;
		right: 0;
		width: 100px;
		overflow: hidden;
		.more-brn {
			margin-top: 20px;
		}
	}
}
</style>
