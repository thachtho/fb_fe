import { Button } from 'antd'
import { IPost } from 'shared/interface'
import { regexPhoneNumber } from '../utils'
import SaveIcon from 'components/icons/Save'
import useLocalStorage from 'hooks/useLocalstorage'
import { toast } from 'react-toastify'
import { LOCAL_STORAGE } from 'shared/constant'

interface IProps {
  item: IPost
  isSaved?: boolean
}
function ButtonHandle({ item, isSaved = false }: IProps) {
  const { setLocalStorage, getLocalStorage } = useLocalStorage()
  const phone = regexPhoneNumber(item.content)

  const handlePhone = () => {
    if (phone) {
      window.open(`tel:${phone}`)
    }
  }

  const handleMessenger = () => {
    handleSave(false)
    window.location.href = `https://m.me/${item.userId}`
  }

  const handleWatch = () => {
    handleSave(false)
    window.location.href = `https://www.facebook.com/groups/${item.groupId}/posts/${item.postId}/`
  }

  const handleSave = (isToast = true) => {
    let arrLocal = []
    const dataLocal = getLocalStorage(LOCAL_STORAGE.ORDER_SAVE)

    if (dataLocal) {
      arrLocal = JSON.parse(dataLocal)
    }

    const isCheck = (arrLocal as IPost[]).find(
      (post) => post.postId === item.postId
    )

    if (!isCheck) {
      arrLocal.push(item)
      if (isToast) {
        toast('Lưu thành công!', {
          autoClose: 500
        })
      }

      return setLocalStorage(LOCAL_STORAGE.ORDER_SAVE, JSON.stringify(arrLocal))
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

export default ButtonHandle
