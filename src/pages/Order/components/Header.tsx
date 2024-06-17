import { SettingOutlined } from '@ant-design/icons'
import SaveIcon from 'components/icons/Save'
import useLocalStorage from 'hooks/useLocalstorage'
import useOrderSave from '../state/orderSave'
import { IPost } from 'shared/interface'

function Header() {
  const { setIsOpenModalOrderSave, setPosts } = useOrderSave()
  const { getLocalStorage } = useLocalStorage()

  const handleSetting = () => {
    alert('Đang phát triển!')
  }

  const handleSaved = () => {
    let arrLocal = []
    const dataLocal = getLocalStorage('orderSave')

    if (dataLocal) {
      arrLocal = JSON.parse(dataLocal)
    }
    arrLocal = (arrLocal as IPost[]).reverse()
    setPosts(arrLocal)
    setIsOpenModalOrderSave(true)
  }
  return (
    <div className="mt-3 flex items-center justify-end">
      <div
        className="flex cursor-pointer flex-col items-center justify-center"
        onClick={() => handleSaved()}
      >
        <SaveIcon />
        <span>Đã lưu</span>
      </div>
      <div
        className="ml-3 mr-2 flex cursor-pointer flex-col items-center justify-center"
        onClick={() => handleSetting()}
      >
        <SettingOutlined className="text-2xl" />
        <span>Cài đặt</span>
      </div>
    </div>
  )
}

export default Header
