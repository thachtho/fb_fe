import { CopyOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { IPost } from 'shared/interface'
import { regexPhoneNumber } from '../utils'

interface IProps {
  item: IPost
}
function ButtonHanle({ item }: IProps) {
  const phone = regexPhoneNumber(item.content)

  const handlePhone = () => {
    if (phone) {
      window.open(`tel:${phone}`)
    }
  }

  const handleMessenger = () => {
    window.location.href = `https://m.me/${item.userId}`
  }

  const handleWatch = () => {
    window.location.href = `https://www.facebook.com/groups/${item.groupId}/posts/${item.postId}/`
  }

  const handleSave = () => {
    alert('Đang phát triển')
  }
  return (
    <div className="mt-2 flex justify-between">
      <div>
        <Button
          disabled={phone ?? ''.length > 0 ? false : true}
          className="mr-2"
          type="primary"
          onClick={() => handlePhone()}
        >
          Gọi
        </Button>
        <Button
          className="mr-2"
          type="primary"
          onClick={() => handleMessenger()}
        >
          Nhắn
        </Button>
        <Button type="primary" onClick={() => handleWatch()}>
          Xem
        </Button>
      </div>

      <div
        className="mr-3 flex items-center justify-center"
        onClick={() => handleSave()}
      >
        <CopyOutlined className="text-2xl" />
      </div>
    </div>
  )
}

export default ButtonHanle
