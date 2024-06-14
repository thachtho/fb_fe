import { Modal } from 'antd'
import useOrderSave from '../state/orderSave'

const OrderSave = () => {
  const { isOpenModalOrderSave, setIsOpenModalOrderSave } = useOrderSave()
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
      ></Modal>
    </>
  )
}

export default OrderSave
