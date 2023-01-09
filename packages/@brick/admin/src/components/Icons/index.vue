<script setup lang="ts">
import { defineComponent, toRaw } from 'vue';

import { useRenderIcon } from './hooks/hook';
import iconifyIconOffline from '@/components/Icons/hooks/iconifyIconOnline';
</script>

<template>
	<div>
		<el-input :prefix-icon="useRenderIcon('user', { width: '300' })" />
		<el-input :prefix-icon="useRenderIcon('2mp', { xxx: '300' })" />
		<el-input :prefix-icon="useRenderIcon('material-symbols:3d-rotation', { xxx: '300' })" />
    <iconifyIconOffline icon="la:address-card-solid"/>
	</div>
</template>

<style scoped></style>
