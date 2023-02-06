<script setup lang="ts">
import { reactive } from 'vue';

const props = defineProps({
	collapse: Boolean,
});

const state = reactive({
  title: 'Brick Admin',
  logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
});

</script>

<template>
	<div class="sidebar-logo-container" :class="{ collapsee: props.collapse }">
		<transition name="sidebarLogoFade">
			<router-link v-if="props.collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="state.logo" :src="state.logo" class="sidebar-logo">
        <!-- <img v-if="state.logo" src="../../../../assets/vite.svg" class="sidebar-logo"> -->
				<h1 class="sidebar-title"> {{ state.title }} </h1>
			</router-link>
			<router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <!-- <img v-if="state.logo" :src="state.logo" class="sidebar-logo"> -->
        <img v-if="state.logo" src="../../../../assets/vite.svg" class="sidebar-logo">
				<h1 class="sidebar-title"> {{ state.title }} </h1>
			</router-link>
		</transition>
	</div>
</template>

<style lang="scss" scoped>

</style>
