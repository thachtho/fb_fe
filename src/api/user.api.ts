import { IUser } from 'shared/interface'
import http from './http'
import { IMember } from 'pages/Admin/AcceptMember/state'

export const createUser = (data: IUser) => http.post<IUser[]>('/users', data)
export const getUsers = () => http.get<IMember[]>('/users')
export const getUserByPhone = (phone: string) => http.get<IMember[]>(`/users/phone/${phone}`)
export const accepMember = (phone: string) => http.patch(`/users/access-by-phone/${phone}`)
export const deleteMember = (id: string) => http.delete(`/users/${id}`)
