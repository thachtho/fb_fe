import { useEffect } from 'react'
import Navigator from 'state/navigator'

function useSetNavigator() {
  const { setCurrentNavigator } = Navigator()
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((success) => {
      setCurrentNavigator(success.coords)
    })
  }, [])
}

export default useSetNavigator
