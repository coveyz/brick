<script setup lang="ts">
import { ref } from 'vue';
import { Form as BrickForm } from '~/index';
import wrapper from './components/Wrapper.vue';

const props = defineProps({
	config: {
		type: Array,
		default: () => [],
	},
	optionsData: {
		type: Object,
		default: () => ({}),
	},
	isWrapper: {
		type: Boolean,
		default: true,
	},
});
const form = ref();

const getFileds = () => {
	console.log('getFileds->', form.value.getFields(), props.optionsData);
};

const resetFileds = () => {
	console.log('reset-form->', form.value.resetFileds());
};

defineExpose({
	getFileds,
	resetFileds,
});
</script>
<template>
	<div v-if="isWrapper">
		<wrapper>
			<!-- <component :is="BrickForm" :config="props.config" :inline="true" ref="form" /> -->
			<template #content>
				<BrickForm :config="props.config" :inline="true" ref="form" :optionsData="props.optionsData" />
			</template>
			<template #operate>
				<div class="">
					<el-button type="primary" @click="getFileds">查询</el-button>
					<el-button @click="resetFileds">清空</el-button>
				</div>
			</template>
		</wrapper>
	</div>
	<div class="" v-else>
		<BrickForm :config="props.config" :inline="true" ref="form" :optionsData="props.optionsData" />
	</div>
</template>

<style scoped></style>
