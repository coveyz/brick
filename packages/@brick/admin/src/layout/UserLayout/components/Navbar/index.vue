<template>
	<el-switch v-model="dataTheme" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" @change="dataThemeChange" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDataThemeChange } from '@/hooks/useDataThemeChange';
import { Sunny, Moon } from '@element-plus/icons-vue';

export default defineComponent({
	setup() {
		const { dataTheme, dataThemeChange } = useDataThemeChange();
		dataThemeChange();
		return { dataTheme, dataThemeChange, Sunny, Moon };
	},
	data() {
		return {};
	},
});
</script>

<style scoped></style>
