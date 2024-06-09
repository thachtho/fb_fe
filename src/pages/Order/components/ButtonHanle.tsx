import { Button } from 'antd'
import { IPost } from 'shared/interface'
import { regexPhoneNumber } from 'utils'

interface IProps {
  item: IPost
}
function ButtonHanle({ item }:  IProps) {
  const phone = regexPhoneNumber(item.content)

  const handlePhone = () => {
    if (phone) {
      alert(phone)
    }
  }

  const handleWatch = () => {
    window.location.href = `fb://facewebmodal/f?href=https://www.facebook.com/groups/${item.groupId}/permalink/${item.postId}/`;
  }


  return (
    <div className="mt-2">
      <Button className="mr-2" type="primary" onClick={() => handlePhone()}>
        Gọi
      </Button>
      <Button className="mr-2" type="primary">
        Nhắn
      </Button>
      <Button type="primary" onClick={() => handleWatch()}>Xem</Button>
    </div>
  )
}

export default ButtonHanle
