import { Button } from 'antd'
import { regexPhoneNumber } from 'utils'

interface IProps {
  content: string
}
function ButtonHanle({ content }: IProps) {
  const phone = regexPhoneNumber(content)

  const handlePhone = () => {
    if (phone) {
      alert(phone)
    }
  }

  return (
    <div className="mt-2">
      <Button className="mr-2" type="primary" onClick={() => handlePhone()}>
        Gọi
      </Button>
      <Button className="mr-2" type="primary">
        Nhắn
      </Button>
      <Button type="primary">Xem</Button>
    </div>
  )
}

export default ButtonHanle
