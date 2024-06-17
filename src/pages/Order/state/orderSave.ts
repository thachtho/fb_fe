import { IPost } from 'shared/interface'
import { create } from 'zustand'

type OrderSaveType = {
  isOpenModalOrderSave: boolean
  setIsOpenModalOrderSave: (isOpenModalOrderSave: boolean) => void
  posts: IPost[] | null
  setPosts: (posts: IPost[] | null) => void
}

const useOrderSave = create<OrderSaveType>((set) => ({
  isOpenModalOrderSave: false,
  setIsOpenModalOrderSave: (isOpenModalOrderSave: boolean) =>
    set(() => ({ isOpenModalOrderSave })),
  posts: null,
  setPosts: (posts: IPost[] | null) => set(() => ({ posts }))
}))

export default useOrderSave
