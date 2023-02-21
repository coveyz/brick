<script setup lang="ts"></script>

<template>
	<section class="app-main">
		<transition name="fade-transform" mode="out-in">
			<router-view class="main-content" />
		</transition>
	</section>
</template>

<style scoped lang="scss">
.app-main {
	min-height: calc(100vh - 50px);
	width: 100%;
	position: relative;
	overflow: hidden;
}
.main-content {
	margin: 24px;
}
</style>
