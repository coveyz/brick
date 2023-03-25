<script setup lang="ts">
import { computed } from 'vue';
import { SelectConfigurationType,MultipleSelectConfigurationType, SelectItemOptionsType } from '@/packages/index';

const props = defineProps<{
	item: SelectConfigurationType | MultipleSelectConfigurationType;
	optionsData: any;
}>();

const options = computed<SelectItemOptionsType>(() => {
	const { item, optionsData } = props;
  
	if (Array.isArray(item.options)) {
		return item.options;
	} else {
		return optionsData[item.options] || [];
	}
});

const selectProps = () => {
	const { type } = props.item;
	if (type === 'mulSelect') {
		return {
			multiple: true,
			collapseTags: true,
			collapseTagsTooltip: true,
		};
	}
	return {};
};
</script>

<template>
	<el-select v-model="item.value" :placeholder="`请选择${item.text}`" :disabled="item.disabled" v-bind="selectProps()">
		<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
	</el-select>
</template>

<style scoped></style>
