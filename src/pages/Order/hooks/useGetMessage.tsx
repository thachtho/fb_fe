import { getPost } from 'api/post.api'
import useDistance from 'hooks/useDistance'
import useNavigator from 'hooks/useNavigator'
import useSocket from 'hooks/useSocket'
import { useEffect } from 'react'
import { IPost } from 'shared/interface'
import useOrder from '../state'

const useGetMessage = () => {
  const { currentNavagator } = useNavigator()
  const { calculateDistance, getCoordinates } = useDistance()
  const { socket } = useSocket()
  const { posts } = useOrder()
  const { setPosts } = useOrder()

  const getLocationMeToShop = async (locationStart: string) => {
    const locationA = await getCoordinates(locationStart)
    const locationB = {
      latitude: currentNavagator?.latitude,
      longitude: currentNavagator?.longitude
    }
    // console.log('locationA', locationA)
    console.log('locationB', locationB)

    // if (locationA) {
    //   const km = await calculateDistance(locationA, locationB)
    // }
  }

  useEffect(() => {
    socket?.on('postMessage', async (data: IPost[]) => {
      setPosts(data)
    })
  }, [socket])
}

const useGetPost = () => {
  const { setPosts } = useOrder()
  useEffect(() => {
    ;(async () => {
      const { data } = await getPost()
      setPosts(data)
    })()
  }, [])
}

export { useGetMessage, useGetPost }
