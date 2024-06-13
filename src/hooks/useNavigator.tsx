import { useEffect, useState } from 'react'
import { IDistance } from 'shared/interface'

function useNavigator() {
  const [currentNavagator, setCurrentNavigator] = useState<IDistance>({
    latitude: null,
    longitude: null
  })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((success) => {
      setCurrentNavigator(success.coords)
    })
  }, [])

  return {
    currentNavagator
  }
}

export default useNavigator
