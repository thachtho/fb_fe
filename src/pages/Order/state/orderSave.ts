import { create } from 'zustand'

type OrderSaveType = {
  isOpenModalOrderSave: boolean
  setIsOpenModalOrderSave: (isOpenModalOrderSave: boolean) => void
}

const useOrderSave = create<OrderSaveType>((set) => ({
  isOpenModalOrderSave: false,
  setIsOpenModalOrderSave: (isOpenModalOrderSave: boolean) =>
    set(() => ({ isOpenModalOrderSave }))
}))

export default useOrderSave
