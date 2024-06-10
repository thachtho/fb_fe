import { Button } from 'antd'
import { IPost } from 'shared/interface'
import { regexPhoneNumber } from 'utils'

interface IProps {
  item: IPost
}
function ButtonHanle({ item }: IProps) {
  const phone = regexPhoneNumber(item.content)

  const handlePhone = () => {
    if (phone) {
      window.open(`tel:+${phone}`)
    }
  }

  const handleMessenger = () => {
    window.location.href = `https://m.me/${item.userId}`
  }

  const handleWatch = () => {
    window.location.href = `https://www.facebook.com/groups/${item.groupId}/posts/${item.postId}/`
  }

  return (
    <div className="mt-2">
      <Button className="mr-2" type="primary" onClick={() => handlePhone()}>
        Gọi
      </Button>
      <Button className="mr-2" type="primary" onClick={() => handleMessenger()}>
        Nhắn
      </Button>
      <Button type="primary" onClick={() => handleWatch()}>
        Xem
      </Button>
    </div>
  )
}

export default ButtonHanle
