<script setup lang="ts">
import { ref } from 'vue';
import { Form as BrickForm } from '@/packages';
import wrapper from './components/Wrapper.vue'

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
    default: true
  }
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
      <BrickForm :config="props.config" :inline="true" ref="form" :optionsData="props.optionsData" />
      <el-button size="small" @click="getFileds">获取数据</el-button>
      <el-button size="small" @click="resetFileds">清空数据</el-button>
    </wrapper>
	</div>
  <div class="" v-else>
    <BrickForm :config="props.config" :inline="true" ref="form" :optionsData="props.optionsData" />
  </div>
</template>

<style scoped></style>
