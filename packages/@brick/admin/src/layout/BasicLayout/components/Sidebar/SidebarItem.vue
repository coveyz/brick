<script setup lang="ts">
import path from 'path-browserify';
import { PropType, ref } from 'vue';
import { childrenType } from './types';
import AppLink from './Link.vue';
import Item from './Item.vue';

const props = defineProps({
	item: {
		type: Object as PropType<any>,
	},
	isNest: {
		type: Boolean,
		default: false,
	},
	basePath: {
		type: String,
		default: '',
	},
});

const onlyOneChild: childrenType = ref(null);

function hasOneShowingChild(children: childrenType[] = [], parent: childrenType) {
	const showingChildren = children.filter((item) => {
		if (item.meta && item.meta.hidden) {
			return false;
		} else {
			onlyOneChild.value = item;
			return true;
		}
	});
	console.log('showingChildren🥓>', showingChildren);
	//* 如果 子路由只有一个
	if (showingChildren.length === 1) {
		return true;
	}

	if (showingChildren.length === 0) {
		onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
		return true;
	}

	return false;
}

const resolvePath = (routePath: string) => {
	console.log('basePath', props.basePath);
	console.log('routePath', routePath);
	//todo
	//todo
	return path.resolve(props.basePath, routePath);
};
</script>

<template>
	<div v-if="!props.item.hidden">
		<!-- if -->
		<template
			v-if="
				hasOneShowingChild(props.item.children, props.item) &&
				(!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
				!props.item.alwaysShow
			"
		>
			<app-link :to="resolvePath(onlyOneChild.path)" v-if="onlyOneChild.meta">
				<el-menu-item :index="resolvePath(props.item.path)">
					<Item :icon="onlyOneChild.meta?.icon || (props.item.meta && props.item.meta.icon)" :title="onlyOneChild.meta?.title" />
				</el-menu-item>
			</app-link>
		</template>
		<!-- else -->

		<el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
			<template #title>
				<Item v-if="props.item.meta" :icon="props.item.meta && props.item.meta.icon" :title="props.item.meta.title" />
			</template>
			<template v-if="props.item.children.length">
				<SidebarItem
					v-for="child in props.item.children"
					:key="child.path"
					:is-nest="true"
					:item="child"
					:base-path="resolvePath(child.path)"
					class="nest-menu"
				/>
			</template>
		</el-sub-menu>
	</div>
</template>

<style scoped></style>
