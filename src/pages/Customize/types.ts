export interface ITrainingJobs {
  id: number
  log: string
  stop: string
  status: string
  project: string
  username: string
  change_time: string
  create_time: string
  pipeline_url: string
  elapsed_time: string
  final_status: string
  display_status: DisplayStatus
  display_name: string
}

export interface ICodeList {
  codesets: ICode[]
  page_size: number
  page: number
  total: number
}

export interface IResultCodeList {
  data: ICode[]
  page_size: number
  page: number
  total: number
}
export interface ICode {
  changed_on: string
  code_id: number
  code_name: string
  codeset_path: string
  file_log: string
  is_deleted: number
  owner: string
  status: string
  storage_size: string
  storage_type: StorageType
}

export interface ICodeDetail {
  files_size: string //16384
  is_directory: boolean
  key: string //
  name: string //'.main.py.swp'
  update_at: string //'2022-11-24T14:30:02.320Z'
}

export enum StorageType {
  MINIO = 'MINIO',
  ALLUXIO = 'alluxio',
}

export interface IResultTrainingJobs {
  data: ITrainingJobs[]
  count: number
  label_columns: object
}

export enum ICreateType {
  FRAMEWORK = 'framework',
  FOUNDATION = 'foundation',
  HISTORY = 'history',
}

export const createTypeLocale = {
  [ICreateType.FRAMEWORK]: '算法框架',
  [ICreateType.FOUNDATION]: '预训练大模型',
  [ICreateType.HISTORY]: '历史任务',
}

export enum IFlavorType {
  NPU = 'NPU',
  GPU = 'GPU',
  CPU = 'CPU',
}

export enum ResourceType {
  SHARE = 'share',
  EXCLUSIVE = 'exclusive',
}

export const ResourceTypeLocale = {
  [ResourceType.EXCLUSIVE]: '专属资源池',
  [ResourceType.SHARE]: '共享资源池',
}

export interface IJobsParams {
  id: number
  name: string
  status: string
  namespace: string
  spec_html: string
  labels_html: string
  create_time: string
  info_json_html: string
  algorithm_json: string
  annotations_html: string
  status_more_html: string
}

export enum DisplayStatus {
  Creating = 'Creating',
  Pending = 'Pending',
  Running = 'Running',
  Failed = 'Failed',
  Error = 'Error',
  Succeeded = 'Succeeded',
  Deleted = 'Deleted',
  Completed = 'Completed',
  Terminating = 'Terminating',
  Terminated = 'Terminated',
  Abnormal = 'Abnormal',
}

export const DisplayStatusLocale = {
  [DisplayStatus.Creating]: '创建中',
  [DisplayStatus.Pending]: '排队中',
  [DisplayStatus.Running]: '运行中',
  [DisplayStatus.Failed]: '运行失败',
  [DisplayStatus.Error]: '运行失败',
  [DisplayStatus.Succeeded]: '运行完成',
  [DisplayStatus.Deleted]: '运行完成',
  [DisplayStatus.Completed]: '运行完成',
  [DisplayStatus.Terminating]: '终止中',
  [DisplayStatus.Terminated]: '已终止',
  [DisplayStatus.Abnormal]: '异常',
}

// ['Creating', { text: '创建中', status: 'initial' }],
// ['Pending', { text: '排队中', status: 'initial' }],

// ['Running', { text: '运行中', status: 'process' }],
// ['Terminating', { text: '终止中', status: 'process' }],

// ['Failed', { text: '运行失败', status: 'error', showFailMsg: true }],
// ['Error', { text: '运行失败', status: 'error', showFailMsg: true }],
// ['Terminated', { text: '已终止', status: 'error' }],

// ['Succeeded', { text: '运行完成', status: 'success' }],
// ['Deleted', { text: '运行完成', status: 'success' }],
// ['Completed', { text: '运行完成', status: 'success' }],

// ['Abnormal', { text: '异常', status: 'disabled' }],
