import { create } from 'zustand';

interface IUserInfo {
    phone: string;
}

type AppType = {
    userInfo: IUserInfo | null
    setUserInfo: (userInfo: IUserInfo | null) => void
    isCheckCrash: boolean,
    setIsCheckCrash: (isCheckCrash: boolean) => void
    getIsCheckCrash: () => boolean
}

const useApp = create<AppType>((set, get) => ({
    userInfo: { phone: '' },
    setUserInfo: (userInfo: IUserInfo | null) =>
    set(() => ({ userInfo })),
    isCheckCrash: false,
    setIsCheckCrash: (isCheckCrash: boolean) =>
    set(() => ({ isCheckCrash })),
    getIsCheckCrash: () => get().isCheckCrash

}))

export default useApp