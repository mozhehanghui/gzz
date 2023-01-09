import ViewFormFooter from 'components/ViewFormFooter'
import { formItemLayout } from 'config/antdConf/publicFormItemLayout'
import { useParams } from 'react-router-dom'

const usePageDefaultConf = props => {
  const { type } = useParams()
  const isView = type === 'view'
  // const isEdit = type === 'edit'

  return {
    PageContainerProps: {
      header: {
        title: '',
        breadcrumb: {},
      },
    },
    ProFormProps: {
      ...formItemLayout,
      className: isView && 'readonly',
      layout: 'horizontal',
      labelAlign: 'left',
      labelWrap: true,
      readonly: isView,
      submitter: {
        render: (_, dom) => <ViewFormFooter dom={dom} isView={isView} />,
      },
    },
  }
}

export default usePageDefaultConf
