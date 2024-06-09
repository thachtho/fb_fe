interface IPost {
  name: string
  userId: string
  content: string
  created_at: Date
  postId: string
  groupId: string
  isNew?: boolean
}

export type { IPost }
