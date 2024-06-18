import http from './http'

export const getDistance = async (input: {
  lat: any
  long: any
  address: string | null
}) => {
  const data = await http.post('/distance', input)

  return data.data
}
