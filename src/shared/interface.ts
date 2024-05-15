interface IPost {
  id: number
  name: string
  userId: number
  content: string
  phone: string
  created_at: Date
  isNew?: boolean
}

export type { IPost }
