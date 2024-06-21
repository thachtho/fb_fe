import { create } from 'zustand';

interface IUserInfo {
    phone: string;
}

type NavigatorType = {
    userInfo: IUserInfo | null
    setUserInfo: (userInfo: IUserInfo | null) => void
}

const useApp = create<NavigatorType>((set) => ({
    userInfo: { phone: '' },
    setUserInfo: (userInfo: IUserInfo | null) =>
    set(() => ({ userInfo })),

}))

export default useApp