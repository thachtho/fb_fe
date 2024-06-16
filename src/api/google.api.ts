import axios from 'axios'
import http from './http'

export const getDistance = async (input: {
  lat: any
  long: any
  address: string | null
}) => {
  const data = await axios.post('http://localhost:3000/api/distance', input)

  return data.data
}
