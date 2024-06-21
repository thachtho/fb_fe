import { LOCAL_STORAGE } from "shared/constant"

function useLocalStorage() {
  const getLocalStorage = (key: LOCAL_STORAGE) => {
    return localStorage.getItem(key)
  }

  const setLocalStorage = (key: string, data: string) => {
    return localStorage.setItem(key, data)
  }

  const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key)
  }

  const clearLocalStorage = () => {
    localStorage.clear()
  }

  return {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage,
    clearLocalStorage
  }
}

export default useLocalStorage
