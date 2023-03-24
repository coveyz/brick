<script setup lang="ts">
import { InputConfigurationType } from '@/packages/index';

defineProps<{ item: InputConfigurationType }>()

</script>
<template>
	<el-input 
    clearable
    v-model="item.value"
    :placeholder="`请输入${item.text}`"
    :disabled="item.disabled"
  />
</template>

<style scoped></style>
