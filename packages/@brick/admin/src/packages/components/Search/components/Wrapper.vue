<script setup lang="ts">
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';

import { useWrapper } from '../hooks';

const { id, hidden, showHiddenBtn, toggle } = useWrapper();

console.log('hidden=>', hidden, 'showHiddenBtn=>', showHiddenBtn);
</script>

<template>
	<div :id="id" class="search-wrapper" :class="{ 'wrapper-hidden': hidden }">
		<slot name="content" />
		<div class="form-btn">
			<slot name="operate" />
			<div @click="toggle" v-if="showHiddenBtn">
				<el-button v-if="hidden" :icon="ArrowDown" class="more-btn" />
				<el-button v-else :icon="ArrowUp" class="more-btn" />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.wrapper-hidden {
	height: 90px;
	overflow: hidden;
	transition: all 2s;
}
.search-wrapper {
	position: relative;
	.form-btn {
		position: absolute;
		top: 0;
		right: 0;
		width: 120px;
		overflow: hidden;
		.more-btn {
			margin-top: 20px;
		}
		::v-deep {
			.el-button {
				height: 30px;
				line-height: 30px;
				padding: 0px 10px;
				margin-left: 5px;
				font-size: 12px;
			}
		}
	}
	::v-deep {
		.el-form {
			display: flex;
			justify-content: flex-start;
			margin-right: 110px;
			flex-wrap: wrap;
		}
		.el-form-item {
			display: flex;
			justify-content: flex-start;
			margin-right: 0;
			padding-right: 10px;
			@media screen and (max-width: 1440px) {
				width: 23%;
			}
			@media screen and (min-width: 1920px) {
				width: 16.6%;
			}
			@media screen and (min-width: 1440px) and (max-width: 1920px) {
				width: 20%;
			}
		}
		.el-form-item[col='2'] {
			@media screen and (max-width: 1440px) {
				width: 46%;
			}
			@media screen and (min-width: 1920px) {
				width: 33.2%;
			}
			@media screen and (min-width: 1440px) and (max-width: 1920px) {
				width: 40%;
			}
		}
		.el-form-item[col='3'] {
			@media screen and (max-width: 1440px) {
				width: 30%;
			}
			@media screen and (min-width: 1920px) {
				width: 30%;
			}
			@media screen and (min-width: 1440px) and (max-width: 1920px) {
				width: 30%;
			}
		}

		.el-input__inner {
			height: 30px !important;
			line-height: 30px !important;
		}

		.el-form-item__label {
			border: 1px solid #e5e7ec;
			font-size: 12px;
			text-align: center;
			padding: 0 5px;
			border-right: none;
			max-width: 100px;
			overflow: hidden;
			height: 32px;
			line-height: 32px;
			position: relative;
			font-weight: 400;
			flex: 0 0 auto;
		}

		.el-form-item__label::after {
			content: '';
			border: 1px solid #e5e7ec;
			position: absolute;
			top: 5px;
			right: 0;
			height: 20px;
		}

		.el-form-item__content {
			line-height: 30px;
			flex: 1 1 auto;
			display: flex;
			align-items: center;
			.el-select,
			.el-autocomplete,
			.el-cascader {
				width: 100%;
				vertical-align: top;
			}
			.el-date-editor {
				width: 100%;
				vertical-align: top;
			}
			.el-input {
				vertical-align: top;
				width: 100%;
				margin: 0;
			}
		}

		.el-input__wrapper.is-focus {
			box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
		}
	}
}
</style>
