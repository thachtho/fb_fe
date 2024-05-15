import { IPost } from 'shared/interface'
import http from './http'

export const getPost = () => http.get<IPost[]>('/post')
