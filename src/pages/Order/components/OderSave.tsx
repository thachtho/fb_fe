import { Modal } from 'antd'
import useOrderSave from '../state/orderSave'
import MainOrder from './MainOrder'

const OrderSave = () => {
  const { isOpenModalOrderSave, setIsOpenModalOrderSave, posts } =
    useOrderSave()
  const handleOk = () => {
    setIsOpenModalOrderSave(false)
  }

  const handleCancel = () => {
    setIsOpenModalOrderSave(false)
  }

  return (
    <>
      <Modal
        title="Đơn đã lưu"
        open={isOpenModalOrderSave}
        onOk={handleOk}
        onCancel={handleCancel}
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

export default OrderSave
