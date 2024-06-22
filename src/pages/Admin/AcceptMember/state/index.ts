import { IUser } from 'shared/interface'
import { create } from 'zustand'

export interface IMember extends IUser{
  id: string
}

type MemberActionType = {
  members: IMember[] | null
  setMembers: (members: IMember[]) => void

}

const useAcceptMember = create<MemberActionType>((set) => ({
    members: null,
    setMembers: (members: IMember[]) => set(() => ({ members })),
}))

export default useAcceptMember
