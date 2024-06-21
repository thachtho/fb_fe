import { create } from 'zustand'

type LoginType = {
  isLoginScreen: boolean
  setIsLoginScreen: (isLoginScreen: boolean) => void

}

const useLogin = create<LoginType>((set) => ({
    isLoginScreen: true,
    setIsLoginScreen: (isLoginScreen: boolean) => set(() => ({ isLoginScreen })),
}))

export default useLogin
