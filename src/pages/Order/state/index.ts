import { IPost } from 'shared/interface'
import { create } from 'zustand'
const initialState = {
  posts: null
}

type OrderType = {
  posts: IPost[] | null
  setPosts: (posts: IPost[] | null) => void
  getPosts: () => IPost[] | null
  restore: () => void
}

const useOrder = create<OrderType>((set, get) => ({
  posts: null,
  setPosts: (posts: IPost[] | null) => set(() => ({ posts })),
  getPosts: () => get().posts,
  restore: () => set({ ...initialState })
}))

export default useOrder
