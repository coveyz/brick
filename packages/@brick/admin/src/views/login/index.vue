<script setup lang="ts">
import { reactive, ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue';
import { Motion } from '@/components';
import type { FormRules, FormInstance } from 'element-plus';

const loginRef = ref<FormInstance>(),
	form = reactive({
		username: 'coveyz',
		password: '123456',
	}),
	rules = reactive<FormRules>({});
/** 🍌 登录 */
const onLogin = async (formEl: FormInstance | undefined) => {
	if (!formEl) return;
  console.log('formEl=>',formEl)
	formEl.validate((valid) => {
		if (valid) {
			console.log('submit!');
		} else {
			console.log('error submit!');
			return false;
		}
	});
};
</script>

<template>
	<el-form :model="form" :rules="rules" ref="loginRef" size="default">
		<Motion :delay="100">
			<!-- 用户名 -->
			<el-form-item prop="username">
				<el-input v-model="form.username" class="w-50 m-2" :prefix-icon="User"> </el-input>
			</el-form-item>
		</Motion>
		<Motion :delay="150">
			<el-form-item prop="password">
				<el-input type="password" v-model="form.password" class="w-50 m-2" :prefix-icon="Lock" show-password> </el-input>
			</el-form-item>
		</Motion>
		<!-- 🍌 登录 -->
		<Motion :delay="200">
			<el-button type="primary" class="w-full mt-4" @click="onLogin(loginRef)"> 登录 </el-button>
		</Motion>
	</el-form>
</template>

<style lang="scss" scoped></style>
