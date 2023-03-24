<script setup lang="ts">
import { reactive, ref } from 'vue';
// import { useWatermark } from './hooks';
import { useWatermark } from '@/hooks';
// import { useWatermark } from '@brick/admin-box';

const state = reactive({
	mark: 'coveyz',
	color: '#409EFF',
});

const local = ref();

const setPartPageWatermark = (type: string) => {
	const target = type == 'part' ? local : ref(null);
	const { setWatermark } = useWatermark(target);
	setWatermark(state.mark, { fillStyle: state.color, type: 'children', forever: true });
};

const setPartPageWatermarkImg = (type: string) => {
	const target = type == 'part' ? local : ref(null);
	const { setWatermark } = useWatermark(target);
	setWatermark(state.mark, { fillStyle: state.color, type: 'blob', forever: true });
};

const clearPartPageWatermark = (type: string) => {
	const target = type === 'part' ? local : ref(null);
	const { clearWatermark } = useWatermark(target);
	clearWatermark();
};
</script>

<template>
	<el-card class="box-card app-container">
		<template #header>
			<div class="card-header">
				<span> 水印 </span>
			</div>
		</template>
		<!-- content -->
    <!-- <br /> -->
		<span> 水印: </span>
		<el-input v-model="state.mark" placeholder="" style="width: 200px" class="mb-4 mr-4" />
		<span> 颜色： </span>
		<el-color-picker v-model="state.color" />
		<br />
		<el-button @click="setPartPageWatermark('all')">创建 全局 水印</el-button>
		<el-button @click="clearPartPageWatermark('all')">清空 全局 水印</el-button>

		<br />
		<el-button @click="setPartPageWatermark('part')">创建 局部 水印</el-button>
		<el-button @click="clearPartPageWatermark('part')">清空 局部 水印</el-button>
		<div ref="local" class="w-[1080px] h-[400px] mt-4 mb-4 border-dotted border-2 border-sky-500">
			<span>555</span>
		</div>
		<el-button @click="setPartPageWatermarkImg('part')">创建 局部 水印Img</el-button>
		<el-button @click="setPartPageWatermarkImg('all')">创建 全局 水印Img</el-button>
	</el-card>
</template>

<style lang="scss" scoped></style>
