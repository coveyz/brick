<script setup>
import { useRenderIcon } from '@/components/Icons/hooks/hook';

const githubUrl = `https://github.com/coveyz/brick/tree/main/packages/%40brick/admin`

</script>

<template>
	<a class="github-corner" :href="githubUrl" aria-label="View source on Github" target="_blank">
		<component :is="useRenderIcon('github', { width: 80, height: 80, fill: '#40c9c6', color: '#fff' })" />
  </a>
</template>

<style scoped>
.github-corner {
	position: absolute;
	top: 0;
	right: 0;
	border: 0;
}
.github-corner:hover .octo-arm {
	animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
	0%,
	100% {
		transform: rotate(0);
	}
	20%,
	60% {
		transform: rotate(-25deg);
	}
	40%,
	80% {
		transform: rotate(10deg);
	}
}
</style>
