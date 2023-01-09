import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import {
  Button,
  message,
  PaginationProps,
  Popconfirm,
  Space,
  Table,
  Tag,
} from 'antd'
import { ColumnsType } from 'antd/lib/table'
import React, { memo, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Wrapper from 'components/ContainerLayout/ListWrapper'
import {
  useAddNewTrainingJobsMutation,
  useDeleteTrainingJobsMutation,
  useLazyGetTrainingJobParamsByIdQuery,
  useLazyGetTrainingJobsQuery,
  useStopTrainingJobsMutation,
} from './services'
import { DisplayStatus, DisplayStatusLocale, ITrainingJobs } from './types'
import { uuid } from 'utils/utils'
import { datefmtFn, durationTs } from 'utils/format'

export const renderStatus = (text: DisplayStatus) => {
  let result: React.ReactNode
  switch (text) {
    case DisplayStatus.Creating:
    case DisplayStatus.Pending:
      result = (
        <Tag icon={<ClockCircleOutlined />} color="default">
          {DisplayStatusLocale[text]}
        </Tag>
      )
      break
    case DisplayStatus.Running:
    case DisplayStatus.Terminating:
      result = (
        <Tag icon={<SyncOutlined spin />} color="processing">
          {DisplayStatusLocale[text]}
        </Tag>
      )
      break
    case DisplayStatus.Failed:
    case DisplayStatus.Error:
    case DisplayStatus.Terminated:
      result = (
        <Tag icon={<ClockCircleOutlined />} color="error">
          {DisplayStatusLocale[text]}
        </Tag>
      )
      break
    case DisplayStatus.Succeeded:
    case DisplayStatus.Deleted:
    case DisplayStatus.Completed:
      result = (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {DisplayStatusLocale[text]}
        </Tag>
      )
      break
    case DisplayStatus.Abnormal:
      result = (
        <Tag icon={<ExclamationCircleOutlined />} color="warning">
          {DisplayStatusLocale[text]}
        </Tag>
      )
      break
    default:
      result = (
        <Tag icon={<ClockCircleOutlined />} color="default">
          {DisplayStatusLocale[text]}
        </Tag>
      )
      break
  }
  return result
}

const CustomizeTask: React.FC = memo(props => {
  const [getCoustomTraining, { data: datasource }] =
    useLazyGetTrainingJobsQuery()
  const [deleteTaskHandle] = useDeleteTrainingJobsMutation()
  const [stopTaskHandle] = useStopTrainingJobsMutation()
  const [getTrainingParams] = useLazyGetTrainingJobParamsByIdQuery()
  const [addNewTrainingJob, { isLoading: addLoading }] =
    useAddNewTrainingJobsMutation()
  const navigate = useNavigate()

  const log = useCallback(
    (logId: number) => () => {
      navigate(`log/${logId}`)
    },
    [navigate],
  )

  const columns: ColumnsType<ITrainingJobs> = [
    {
      title: '任务名称',
      dataIndex: 'display_name',
      key: 'display_name',
      render: (text, record) => <a onClick={log(record.id)}>{text}</a>,
    },

    {
      title: '算法框架',
      dataIndex: 'display_engine',
      key: 'display_engine',
    },

    {
      title: '运行时长',
      dataIndex: 'elapsed_time',
      key: 'elapsed_time',
      render: text => durationTs(text),
    },

    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: text => datefmtFn(text, 'YYYY-MM-DD HH:mm:ss'),
    },

    {
      title: '资源占用',
      dataIndex: 'flavor_desc',
      key: 'flavor_desc',
    },

    {
      title: '状态',
      dataIndex: 'display_status',
      key: 'display_status',
      render: text => renderStatus(text),
    },
    {
      title: '操作',
      width: '15%',
      key: 'action',
      render: (_: any, record: ITrainingJobs) => {
        const displayStatus = record.display_status
        return (
          <Space size="middle">
            <a key={uuid(8, 16)} onClick={log(record.id)}>
              日志
            </a>

            <Popconfirm
              title="确定重跑该任务吗"
              onConfirm={restartTask(record.id)}
            >
              <a key={uuid(8, 16)}>重跑</a>
            </Popconfirm>

            <Popconfirm
              title="确定删除该任务吗"
              onConfirm={deleteTask(record.id)}
            >
              <a key={uuid(8, 16)}>删除</a>
            </Popconfirm>

            {[DisplayStatus.Running, DisplayStatus.Terminating].includes(
              displayStatus,
            ) ? (
              <Popconfirm
                title="确定停止该任务吗"
                onConfirm={stopTask(record.id)}
              >
                <a key={uuid(8, 16)}>停止</a>
              </Popconfirm>
            ) : null}
          </Space>
        )
      },
    },
  ]

  const restartTask = useCallback(
    (id: number) => async () => {
      try {
        const { data } = await getTrainingParams({ id })
        if (data) {
          const algorithmJson = JSON.parse(data.algorithm_json)
          const newTask = {
            kind: 'job',
            name: `${data.name}-${uuid(8, 16)}`,
            algorithm: algorithmJson,
          }
          await addNewTrainingJob({ ...newTask }).unwrap()
          message.success('任务已重跑')
        }
      } catch (error) {
        message.error(error as string)
      }
    },
    [addNewTrainingJob, getTrainingParams],
  )

  const deleteTask = useCallback(
    (id: number) => async () => {
      try {
        await deleteTaskHandle({ id })
        message.success('删除成功')
      } catch (error) {
        message.error(error as string)
      }
    },
    [deleteTaskHandle],
  )

  const stopTask = useCallback(
    (id: number) => async () => {
      try {
        await stopTaskHandle({ id }).unwrap()
        message.success('已停止')
      } catch (error) {
        console.log('error: ', error)
        // message.error(error as string)
      }
    },
    [stopTaskHandle],
  )

  const create = useCallback(() => {
    navigate('create')
  }, [navigate])

  const loadList = useCallback(
    (params = {}) => {
      getCoustomTraining(params)
    },
    [getCoustomTraining],
  )

  const reload = useCallback(() => {
    getCoustomTraining({})
  }, [getCoustomTraining])

  const operations = (
    <Space>
      {/* <Button>任务名称</Button>
      <Button onClick={detail}>任务状态</Button> */}
      <Button type="primary" onClick={create}>
        创建任务
      </Button>
      <Button icon={<SyncOutlined />} onClick={reload}></Button>
    </Space>
  )

  const onChange: PaginationProps['onChange'] = (
    pageNumber: number,
    pageSize: number,
  ) => {
    console.log('Page: ', pageNumber, 'pagesize: ', pageSize)
    getCoustomTraining({
      page: pageNumber - 1,
      pageSize,
    })
  }

  useEffect(() => {
    loadList({})
  }, [loadList])

  return (
    <Wrapper
      pagination={{
        showQuickJumper: true,
        defaultCurrent: 1,
        total: datasource?.count,
        onChange: onChange,
      }}
    >
      <div className="tool">{operations}</div>
      <article className="w-full h-full">
        <Table
          rowKey={record => uuid(8, 16)}
          dataSource={datasource?.data || []}
          // dataSource={[]}
          columns={columns}
          pagination={false}
        />
      </article>
    </Wrapper>
  )
})

export default CustomizeTask
