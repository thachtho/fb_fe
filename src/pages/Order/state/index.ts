import { IPost } from 'shared/interface'
import { create } from 'zustand'
const initialState = {
  posts: null
}

type OrderType = {
  posts: IPost[] | null
  setPosts: (posts: IPost[] | null) => void
  restore: () => void
  getPost: () => IPost[] | null
}

const useOrder = create<OrderType>((set, get) => ({
  posts: null,
  setPosts: (posts: IPost[] | null) => set(() => ({ posts })),
  getPost: () => get().posts,

  restore: () => set({ ...initialState })
}))

export default useOrder
