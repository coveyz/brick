<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Logo from './Logo.vue';
import variables from '@/styles/variables.module.scss';
import SidebarItem from './SidebarItem.vue';
import { usePermissionStore } from '@/store/modules/permission';
import { LeftCollapse } from '../index';
import { useAppStore } from '@/store/modules/app';

// todo 🍌 Logo
const showLogo = ref(true),
	route = useRoute(),
	useApp = useAppStore();

const isCollapse = computed(() => {
	return !useApp.sidebar.opened;
});

const menuData = computed(() => {
	return usePermissionStore().routes;
});

const activeMenu = computed(() => {
	const { meta, path } = route;
	if (meta.activeMenu) {
		return meta.activeMenu as string; //todo
	}
	return path;
});

const variabless = computed(() => {
	return variables;
});

const toggleSideBar = () => {
	// console.log('toggleSideBar=>');
	useApp.toggleSideBar();
};

</script>

<template>
	<div :class="['sidebar-container', showLogo ? 'has-logo' : '']">
    {{ isCollapse }}
		<Logo v-if="showLogo" :collapse="isCollapse" />
		<!-- 👷‍♀️ 导航栏 -->
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<!-- todo outer-most -->
			<el-menu
				router
				mode="vertical"
				unique-opened
				class="outer-most select-none"
				:collapse="isCollapse"
				:collapse-transition="false"
				:default-active="activeMenu"
				:background-color="variabless.menuBg"
				:text-color="variabless.menuText"
				:active-text-color="variabless.menuActiveText"
			>
				<SidebarItem v-for="route in menuData" :key="route.path" :item="route" :base-path="route.path" class="outer-most select-none" />
			</el-menu>
		</el-scrollbar>
		<!-- 👷‍♀️ 开关导航栏 -->
		<left-collapse @toggleClick="toggleSideBar" />
	</div>
</template>

<style scoped></style>
