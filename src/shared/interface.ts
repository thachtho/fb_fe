/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ITimeOfPost {
  hours: number,
  minutes: number
}
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
  locationEnd?: IDistance | null,
  time?: ITimeOfPost,
  distanceAB?: number
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
