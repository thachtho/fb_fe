import { IUser } from 'shared/interface'
import http from './http'

export const createUser = (data: IUser) => http.post<IUser[]>('/users', data)
