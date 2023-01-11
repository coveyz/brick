<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { setType } from './types';

const classObj: setType = reactive({
  //todo 🍌
	classes: computed(() => {
		return {
			hideSidebar: true,
			openSidebar: true,
			mobile: true,
			withoutAnimation: false,
		};
	}),
});
</script>

<template>
	<div class="app-wrapper" :class="classObj.classes">BasicLayout</div>
	<!-- <router-view /> -->
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';

.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
}
</style>
