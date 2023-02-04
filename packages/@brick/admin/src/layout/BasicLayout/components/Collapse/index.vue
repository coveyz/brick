<script setup lang="ts">
import { computed } from 'vue';
import { useRenderIcon } from '@/components/Icons/hooks/hook';
import variables from '@/styles/variables.module.scss';

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{(e: 'toggleClick'): void}>()
// const emit = defineEmits(['toggleClick'])

const iconClass = computed(() => {
	return [
		'ml-4',
		'mb-1',
		'w-[16px]',
		'h-[16px]',
		'inline-block',
		'align-middle',
		'text-primary',
		'cursor-pointer',
		'duration-[360ms]',
		'hover:text-primary',
		'dark:hover:!text-white',
	];
});

const toggleClick = () => {
  emit('toggleClick')
}
</script>

<template>
	<div class="container">
		<!-- 👷‍♀️ 颜色后期调整 -->
		<component :is="useRenderIcon('hamburger', { fill: variables.menuActiveText })" :class="[iconClass]" @click="toggleClick" />
	</div>
</template>

<style scoped lang="scss">
.container {
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 40px;
	line-height: 40px;
	user-select: none;
	box-shadow: 0 0 6px -2px var(--el-color-primary);
}
</style>
