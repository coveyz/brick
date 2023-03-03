<script setup lang="ts">
import { ref } from 'vue';
const cropperImg = ref<string>(''); 

const onCropper = () => {
  console.log('✂️咔嚓')
}

</script>

<template>
	<el-card class="box-card app-container">
		<template #header>
			<div class="card-header">
				<span> 图片剪裁 </span>
			</div>
		</template>
		<div class="copper-container"></div>
    <el-button type="primary" @click="onCropper">裁剪</el-button>
	</el-card>
</template>

<style scoped lang="scss">
.copper-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
