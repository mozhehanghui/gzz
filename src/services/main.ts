import { request } from 'utils/request'

export async function getPictureList() {
  return request(`picture/list`, {
    method: 'POST',
  })
}

export interface ITaskProps {
  text: string // 创意描述
  style: string // 风格
  label: string // 标签
  num_images: number // 图片数量
  scale: number //  引导力度
  steps: number // 解噪步数
}
export async function createTask(taskOptions: ITaskProps) {
  return request(`/text2image/predict`, {
    method: 'POST',
    data: taskOptions,
  })
}

export async function loadResultImage(options: { task_id: string }) {
  return request(`/text2image/get_result`, {
    method: 'POST',
    data: options,
  })
}
