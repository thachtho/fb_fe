import { AimOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons'
import SaveIcon from 'components/icons/Save'
import useLocalStorage from 'hooks/useLocalstorage'
import { IPost } from 'shared/interface'
import useOrderSave from '../state/orderSave'

import useAuth from 'hooks/useAuth'
import { LOCAL_STORAGE } from 'shared/enum'

function Header() {
  const { setIsOpenModalOrderSave, setPosts } = useOrderSave()
  const { getLocalStorage } = useLocalStorage()
  const { logOut } = useAuth()

  const handleSetting = () => {
    alert('Đang phát triển!')
  }

  const handleSaved = () => {
    let arrLocal = []
    const dataLocal = getLocalStorage(LOCAL_STORAGE.ORDER_SAVE)

    if (dataLocal) {
      arrLocal = JSON.parse(dataLocal)
    }
    arrLocal = (arrLocal as IPost[]).reverse()
    setPosts(arrLocal)
    setIsOpenModalOrderSave(true)
  }

  return (
    <div className="mt-3 flex justify-between items-center">
      <div className='text-white'>
        <AimOutlined />
        <span className='ml-2'>Đà Nẵng</span>
      </div>
      <div className='flex items-center justify-end'>
        <div
          className="flex cursor-pointer flex-col items-center justify-center"
          onClick={() => handleSaved()}
        >
          <SaveIcon />
          <span className='text-white'>Đã lưu</span>
        </div>
        <div
          className="ml-3 mr-2 flex cursor-pointer flex-col items-center justify-center"
          onClick={() => handleSetting()}
        >
          <SettingOutlined className="text-2xl text-white" />
          <span className='text-white'>Cài đặt</span>
        </div>  
        <div className='ml-3 mr-2 flex cursor-pointer flex-col items-center justify-center' onClick={() => logOut()}>
          <LogoutOutlined className="text-2xl text-white" />
          <span className='text-white'>Đăng xuất</span>
        </div>
      </div>

    </div>
  )
}

export default Header
