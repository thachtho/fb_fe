import axios from 'axios'
import { getDistance } from 'geolib'
import { IDistance } from 'shared/interface'

function useDistance() {
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

  return {
    calculateDistance,
    getCoordinates
  }
}

export default useDistance
