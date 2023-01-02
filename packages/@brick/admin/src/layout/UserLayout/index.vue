<script lang="ts">
import { defineComponent, toRaw } from 'vue';
import { bg, illustration } from './utils/static';
import { Navbar } from './components';

export default defineComponent({
	setup() {
		return {
			illustration: toRaw(illustration),
		};
	},
	components: { Navbar },
	data() {
		return {
			bgimg: bg,
		};
	},
});
</script>

<template>
	<div class="select-none">
		<img :src="bgimg" class="wave" />

		<div class="flex-c absolute right-5 top-3">
			<!-- 🍌 主体 -->
			<Navbar />
		</div>
		<div class="user-container">
			<div class="img">
				<component :is="illustration" />
			</div>
			<div class="user-box">
				<RouterView />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.wave {
	position: fixed;
	height: 100%;
	left: 0;
	bottom: 0;
	z-index: -1;
}
.user-container {
	width: 100vw;
	height: 100vh;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-gap: 18rem;
	padding: 0 2rem;
}
.img {
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.user-box {
	display: flex;
	align-items: center;
	text-align: center;
}

@media screen and (max-width: 1180px) {
	.user-container {
		grid-gap: 9rem;
	}
}
@media screen and (max-width: 968px) {
	.user-container {
		grid-template-columns: 1fr;
	}
	.user-box {
		justify-content: center;
	}
	.wave {
		display: none;
	}
	.img {
		display: none;
	}
}
</style>
