<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { setType } from './types';
import { Sidebar } from './components';
import { useAppStore } from '@/store/modules/app';

const useApp = useAppStore();

const classObj: setType = reactive({
	//todo 🍌
	classes: computed(() => {
		return {
			hideSidebar: !useApp.sidebar.opened,
			openSidebar: useApp.sidebar.opened,
			mobile: false,
			withoutAnimation: useApp.sidebar.withoutAnimation,
		};
	}),
});
</script>

<template>
	<div class="app-wrapper" :class="classObj.classes">
		<Sidebar />
	</div>
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
