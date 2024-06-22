/* eslint-disable @typescript-eslint/no-explicit-any */
interface IPost {
  name: string
  userId: string
  content: string
  created_at: Date
  postId: string
  groupId: string
  isNew?: boolean
  distance?: number | null,
  startNavigator?: { lat: any, lng: any }
}

export interface IDistance {
  latitude: any
  longitude: any
}

interface ILogin {
  phone: string;
  password: string;
}

interface IUser {
  phone: string,
  password: string,
  access?: boolean
}
export type { IPost, ILogin, IUser }
