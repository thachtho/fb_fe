import { Modal } from 'antd'
import useOrderSave from '../state/orderSave'
import MainOrder from './MainOrder'
import { DeleteOutlined } from '@ant-design/icons'
import useLocalStorage from 'hooks/useLocalstorage'
import { toast } from 'react-toastify'
import { LOCAL_STORAGE } from 'shared/constant'

const OrderSave = () => {
  const { isOpenModalOrderSave, setIsOpenModalOrderSave, posts } =
    useOrderSave()
  const handleOk = () => {
    setIsOpenModalOrderSave(false)
  }

  return (
    <>
      <Modal
        title={<Title/>}
        open={isOpenModalOrderSave}
        onOk={handleOk}
        closable={false} 
        cancelButtonProps={{ style: { display: 'none' } }} 
        bodyStyle={{ maxHeight: '400px', overflowY: 'scroll' }}
      >
        <div>
          {posts && posts.length > 0 && (
            <MainOrder posts={posts} isSaved={true} />
          )}
        </div>
      </Modal>
    </>
  )
}

const Title = () => {
  const { setIsOpenModalOrderSave } =
  useOrderSave()
  const { removeLocalStorage } = useLocalStorage()
  const removelAll = () => {
    removeLocalStorage(LOCAL_STORAGE.ORDER_SAVE)
    toast('Xóa thành công!', {
      autoClose: 500
    })
    setIsOpenModalOrderSave(false)
  }
  return (
    <div className='flex justify-between items-center cursor-pointer' onClick={() => removelAll()}>
      <span>Đơn đã lưu</span>
      <div className='flex flex-col justify-center items-center'><DeleteOutlined className='text-xl'/><span>Xóa hết</span></div>
    </div>
  )
}

export default OrderSave
