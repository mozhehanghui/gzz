import { IPagination } from 'types'
import { IGetGroupsAndPoolReturn, IGetSomeSystemMetricReturn } from './thunk'

export interface ResourceState {
  pools: IResourcePoolListItem[] | []
  k8sClusters: IK8sClusters[]
}

export interface IK8sClusters {
  name: string
  description?: string
  capacity: number
  allocated?: number
  providerInfo?: {
    provider?: string
    clusterID?: string
    labels?: string[]
  }
  apiServerURL?: string
  status?: string
}

export enum IResourceType {
  POOL = 'pool',
  GROUP = 'group',
}

interface IResourceBase {
  createTime: string
  updateTime: string
  deleteTime: null
  name: string
  type: IResourceType
  capacity: number // 总容量
  allocated: number //可使用容量
  clusters: Array<String>
  namespace: string //非必须 k8s namespace
  description: string
  groups: IResourceGroupListItem[] | []
  parent: string //非必须  group类型所属pool
  used?: number
}

export type IResourcePool = Omit<Partial<IResourceBase>, 'parent'>
export type IResourcePoolListItem = Omit<IResourceBase, 'parent'>
export type IResourceGroup = Omit<Partial<IResourceBase>, 'groups'>
export type IResourceGroupListItem = Omit<IResourceBase, 'groups'>

export type ICreatePool = Pick<
  IResourceBase,
  'name' | 'description' | 'clusters' | 'capacity' | 'type'
>

export type ICreateGroup = Pick<
  IResourceBase,
  'name' | 'description' | 'clusters' | 'capacity' | 'type'
> & { poolName: string }

export type IUpdatePool = Pick<
  IResourcePool,
  'name' | 'type' | 'capacity' | 'clusters' | 'description'
> & { id?: number }

export type IUpdateGroup = IUpdatePool & { poolName?: string }

export type IDeletePool = Pick<IUpdatePool, 'type' | 'name'>

export type IDeleteGroup = IDeletePool & {
  poolName?: string
}
export interface UserState {
  drawing: boolean
  username: string
  loginLoading: boolean
  collapsed: boolean
  pools: IResourcePoolListItem[] | []
  poolsPagination: IPagination
  delegationPools: IResourcePoolListItem[] | []
  k8sClusters: IK8sClusters[]
  systemMetrics: IGetSomeSystemMetricReturn
  PoolAndGroups: IGetGroupsAndPoolReturn
  validDCUToCreatePool: number
  storageMap: Object
  routeMeta: any
}

export interface AppState {
  drawing: boolean
}
export interface User {
  username: string
  storageMap?: Object
}

export interface LoginParams {
  params: {
    username: string
    password: string
  }
  resolve: () => void
}

export interface IGroupsListByPoolParams {
  poolName: string
  groupName?: string
}
