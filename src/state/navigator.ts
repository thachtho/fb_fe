import { IDistance } from 'shared/interface'
import { create } from 'zustand'

type NavigatorType = {
  currentNavagator: IDistance | null
  setCurrentNavigator: (posts: IDistance | null) => void
  getCurrentNavigator: () => IDistance | null
}

const useNavigator = create<NavigatorType>((set, get) => ({
  currentNavagator: {
    latitude: null,
    longitude: null
  },
  setCurrentNavigator: (currentNavagator: IDistance | null) =>
    set(() => ({ currentNavagator })),
  getCurrentNavigator: () => get().currentNavagator
}))

export default useNavigator
