<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { useRouter, useRoute, LocationQuery } from 'vue-router';
import type { FormRules, FormInstance } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';

import { Motion } from '@/components';
import { useUserStore } from '@/store/modules/user';

const router = useRouter(),
	route = useRoute();

// 🍌 state
const loginRef = ref<FormInstance>(),
	operates = [
		{
			title: '手机登录',
			name: 'phone',
		},
		{
			title: '二维码',
			name: 'qRcode',
		},
		{
			title: '注册',
			name: 'register',
		},
	],
	form = reactive({
		username: 'coveyz',
		password: '123456',
	}),
	rules = reactive<FormRules>({
		username: [
			{
				required: true,
				trigger: 'blur',
				message: '请输入用户名',
			},
		],
		password: [
			{
				required: true,
				trigger: 'blur',
				message: '请输入密码',
			},
		],
	}),
	state = reactive({
		redirect: '',
		otherQuery: {},
	});

// 🍌 兼容路由
watch(
	() => route.query,
	(query) => {
		if (query) {
			state.redirect = query['redirect']?.toString() ?? '';
			state.otherQuery = getOtherQuery<LocationQuery>(query);
		}
	}
);

// 🍌 获取其他 query
function getOtherQuery<T>(query: T) {
	const map = {} as T;

	for (const key in query) {
		if (key !== 'redirect') {
			map[key] = query[key];
		}
	}
  
	return map;
}

/** 🍌 登录 */
const onLogin = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.validate((valid) => {
		if (!valid) return console.log('error submit');
		const userStore = useUserStore();
		userStore.login(form).then((res) => {
			console.log('res=>', res);
		});
	});
};
// 🍌 跳转操作
const handleOperation = (item: any) => {
	if (item.name !== 'register') return console.warn(`暂不开放${item.title}功能`);
	router.push({ path: `/user/${item.name}` });
};
</script>

<template>
	<el-form :model="form" :rules="rules" ref="loginRef" size="large">
		<Motion :delay="100">
			<!-- 用户名 -->
			<el-form-item prop="username">
				<el-input v-model="form.username" :prefix-icon="User" clearable />
			</el-form-item>
		</Motion>
		<Motion :delay="150">
			<el-form-item prop="password">
				<el-input type="password" v-model="form.password" :prefix-icon="Lock" show-password clearable />
			</el-form-item>
		</Motion>
		<!-- 🍌 登录 -->
		<Motion :delay="200">
			<el-form-item>
				<el-button type="primary" class="w-full mt-4" @click="onLogin(loginRef)" size="default"> 登录 </el-button>
			</el-form-item>
		</Motion>
		<!-- 🍌 其他方式 -->
		<Motion :delay="250">
			<el-form-item>
				<div class="w-full h-[20px] flex justify-between items-center">
					<el-button v-for="(item, index) in operates" :key="index" size="default" class="w-full mt-4" @click="handleOperation(item)">
						{{ item.title }}
					</el-button>
				</div>
			</el-form-item>
		</Motion>
	</el-form>
</template>

<style lang="scss" scoped></style>
