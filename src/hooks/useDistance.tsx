import axios from 'axios'
import { getDistance } from 'geolib'
import { IDistance } from 'shared/interface'
import useNavigator from './useNavigator'
import { regexLocation } from 'utils'

function useDistance() {
  const { getCurrentNavigator } = useNavigator()
  async function getCoordinates(location: string) {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        location
      )}&format=json&limit=1`
    )
    const data = await response.data

    if (data.length > 0) {
      const { lat, lon } = data[0]
      return { latitude: parseFloat(lat), longitude: parseFloat(lon) }
    } else {
      return null
    }
  }

  async function calculateDistance(locationA: IDistance, locationB: IDistance) {
    try {
      const distance = getDistance(locationA, locationB)
      const distanceInKm = distance / 1000

      return distanceInKm
    } catch (error) {
      return null
    }
  }

  const getLocationMeToShop = async (content: string) => {
    const locationStart = regexLocation(content)

    if (locationStart && locationStart?.length > 0) {
      const locationA = await getCoordinates(locationStart)
      const currentNavagator = getCurrentNavigator()
      const locationB = {
        latitude: currentNavagator?.latitude,
        longitude: currentNavagator?.longitude
      }

      if (locationA) {
        const km = await calculateDistance(locationA, locationB)

        return km
      }
    }

    return null
  }

  return {
    calculateDistance,
    getCoordinates,
    getLocationMeToShop
  }
}

export default useDistance
