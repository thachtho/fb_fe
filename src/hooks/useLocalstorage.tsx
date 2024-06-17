function useLocalStorage() {
  const getLocalStorage = (key: string) => {
    return localStorage.getItem(key)
  }

  const setLocalStorage = (key: string, data: string) => {
    return localStorage.setItem(key, data)
  }

  const removeLocalStorage = (key: string) => {
    localStorage.removeItem(key)
  }

  return {
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
  }
}

export default useLocalStorage
