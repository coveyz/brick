<script setup lang="ts">
import { onMounted } from 'vue';
import { useRenderIcon } from '@/components/Icons/hooks/hook';


const props = defineProps({
	icon: {
		type: String,
		default: '',
	},
	title: {
		type: String,
		default: '',
	},
});

onMounted(() => {
	console.log(props);
});


</script>

<template>
	<!-- <i v-if="props.icon" :class="useRenderIcon(props.icon)" /> -->
  <template v-if="props.icon">
    <component 
      :is="useRenderIcon(props.icon, {width: '20', height: '20',})"
    />
  </template>
	<span v-if="props.title"> {{ props.title }} </span>
</template>

<style scoped></style>
