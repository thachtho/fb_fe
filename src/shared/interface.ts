/* eslint-disable @typescript-eslint/no-explicit-any */
interface IPost {
  name: string
  userId: string
  content: string
  created_at: Date
  postId: string
  groupId: string
  isNew?: boolean
  meToShop?: number | null
}

export interface IDistance {
  latitude: any
  longitude: any
}

export type { IPost }
