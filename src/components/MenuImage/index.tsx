import { Avatar } from 'antd'
import { SPACE_TIMES } from 'assets/styles/styledcom/StyleConstants'

interface IMenuImageProps {
  src?: any
}
function MenuImage({ src }: IMenuImageProps & Partial<HTMLSpanElement>) {
  return (
    <Avatar
      shape="square"
      style={{ width: '14px', height: '14px', marginRight: SPACE_TIMES(2) }}
      src={src}
    />
  )
}

export default MenuImage
