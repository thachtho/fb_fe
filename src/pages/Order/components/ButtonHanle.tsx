import { Button } from 'antd'
import { IPost } from 'shared/interface'
import { regexPhoneNumber } from '../utils'
import SaveIcon from 'components/icons/Save'
import useLocalStorage from 'hooks/useLocalstorage'
import { toast } from 'react-toastify'

interface IProps {
  item: IPost
  isSaved?: boolean
}
function ButtonHanle({ item, isSaved = false }: IProps) {
  const { setLocalStorage, getLocalStorage } = useLocalStorage()
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
    let arrLocal = []
    const dataLocal = getLocalStorage('orderSave')

    if (dataLocal) {
      arrLocal = JSON.parse(dataLocal)
    }

    const isCheck = (arrLocal as IPost[]).find(
      (post) => post.postId === item.postId
    )

    if (!isCheck) {
      arrLocal.push(item)
      toast('Lưu thành công!', {
        autoClose: 500
      })
      return setLocalStorage('orderSave', JSON.stringify(arrLocal))
    }
  }
  return (
    <div className="mt-2 flex items-center justify-between">
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

      {!isSaved && (
        <div
          className="mr-6 flex cursor-pointer items-center justify-center"
          onClick={() => handleSave()}
        >
          <SaveIcon />
        </div>
      )}
    </div>
  )
}

export default ButtonHanle
