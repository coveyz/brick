import { RouteRecordRaw } from 'vue-router'

export type UserType = {
  token?: string,
  roles?: Array<string>,
  name: string,
  avatar: string,
  introduction: string
}

export type PermissionType = {
  addRoutes: Array<RouteRecordRaw>,
  routes: Array<RouteRecordRaw>
}