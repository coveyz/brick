<script setup lang="ts">
import { computed } from 'vue';
import { SelectConfigurationType, SelectItemOptionsType } from '@/packages/index';

const props = defineProps<{
	item: SelectConfigurationType;
	optionsData: any;
}>();

const options = computed<SelectItemOptionsType>(() => {
	const { item, optionsData } = props;
	const { options } = item;
	if (Array.isArray(options)) {
		return options;
	} else {
		return optionsData[options] || [];
	}
});
</script>

<template>
	<el-select v-model="item.value"  :placeholder="`请选择${item.text}`" :disabled="item.disabled">
		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
	</el-select>
</template>

<style scoped></style>
