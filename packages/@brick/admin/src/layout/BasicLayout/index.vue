<script lang="ts" setup>
import 'animate.css';
import { computed, reactive } from 'vue';
import { setType } from './types';
import { Sidebar,Navbar,AppMain } from './components';
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
    <div class="main-container" >
      <div :class="{'fix-header': useApp.fixedHeader}">
        <Navbar />
      </div>
      <app-main />
    </div>
	</div>
</template>

<style scoped lang="scss">
@import '@/styles/mixins.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
	@include clearfix;
	position: relative;
	height: 100%;
	width: 100%;
	&.mobile.openSidebar {
		position: fixed;
		top: 0;
	}
  .fix-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{sidebarWidth});
    transition: width .28s;
  }
  .hideSidebar .fix-header {
    width: calc(100% - 54px);
  }
}
</style>
