import axios from 'axios'

export const getDistance = async () => {
  const data = await axios.get('http://localhost:3000/api/distance')

  return data.data
}
