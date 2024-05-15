import { IPost } from 'shared/interface'
import { create } from 'zustand'
const initialState = {
  posts: null
}

type OrderType = {
  posts: IPost[] | null
  setPosts: (posts: IPost[] | null) => void
  restore: () => void
}

const useOrder = create<OrderType>((set) => ({
  posts: null,
  setPosts: (posts: IPost[] | null) => set(() => ({ posts })),

  restore: () => set({ ...initialState })
}))

export default useOrder
