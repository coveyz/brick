<script setup lang="ts">
import { computed } from 'vue';
import { DateConfigurationType, baseDateType } from '~/types';
const props = defineProps<{
	item: DateConfigurationType;
}>();

/** @description dateType */
const dataType = computed<baseDateType>(() => {
	const { dateType } = props.item;
	if (!dataType) return 'date';
	return dateType;
});

/** @description date ui formate */
const dateFormat = computed<string>(() => {
	const { format } = props.item;
	if (!format) return 'YYYY/MM/DD';
	return format;
});

/** @description date value formate */
const dateValuFormat = computed<string>(() => {
	const { valueFormat } = props.item;
	if (!valueFormat) return 'YYYY-MM-DD';
	return valueFormat;
});

/** @description special date prop */
const dateSpecialProps = () => {
	const { dateType } = props.item;
	if (dateType === 'daterange' || dateType === 'datetimerange' || dateType === 'monthrange') {
		const { rangeSeparator, startPlaceholder, endPlaceholder } = props.item;
		return {
			rangeSeparator: rangeSeparator ? rangeSeparator : 'To',
			startPlaceholder: startPlaceholder ? startPlaceholder : '--',
			endPlaceholder: endPlaceholder ? endPlaceholder : '--',
		};
	}
	return {};
};
</script>

<template>
	<el-date-picker
		v-model="item.value"
		:type="dataType"
		:placeholder="`请选择${item.text}日期`"
		:format="dateFormat"
		:value-format="dateValuFormat"
		v-bind="dateSpecialProps()"
	/>
</template>

<style scoped></style>
