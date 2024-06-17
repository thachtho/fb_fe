function useLocalStorage() {
  const getLocalStorage = (key: string) => {
    return localStorage.getItem(key)
  }

  const setLocalStorage = (key: string, data: string) => {
    return localStorage.setItem(key, data)
  }

  return {
    setLocalStorage,
    getLocalStorage
  }
}

export default useLocalStorage
