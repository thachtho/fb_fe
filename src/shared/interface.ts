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
  locationStart?: IDistance | null, 
  locationEnd?: IDistance | null
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
