<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Logo from './Logo.vue';
import { useNav } from './hooks/useNav';
import { usePermissionStore } from '@/store/modules/permission';
import SidebarItem from './SidebarItem.vue';

// todo 🍌 Logo
const showLogo = ref(true),
	isCollapse = ref(false),
	route = useRoute();

const { routers, menuSelect } = useNav();

const menuData = computed(() => {
	return usePermissionStore().routes;
});

</script>

<template>
	<div :class="['sidebar-container', showLogo ? 'has-logo' : '']">
		<Logo v-if="showLogo" :collapse="isCollapse" />
		<!-- 👷‍♀️ 导航栏 -->
		<el-scrollbar wrap-class="scrollbar-wrapper">
			<!-- todo outer-most -->
			<!-- todo @select="(indexPath: string) => menuSelect(indexPath, routers)" -->
			<el-menu
				router
				unique-opened
				mode="vertical"
				class="outer-most select-none"
				:collapse="isCollapse"
				:collapse-transition="false"
				:default-active="route.path"
			>
				<SidebarItem v-for="route in menuData" :key="route.path" :item="route" :base-path="route.path" class="outer-most select-none" />
			</el-menu>
		</el-scrollbar>
		<!-- 👷‍♀️ 开关导航栏 -->
	</div>
</template>

<style scoped></style>
