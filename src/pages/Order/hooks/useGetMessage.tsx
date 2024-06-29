import { getPost } from 'api/post.api'
import useSocket from 'hooks/useSocket'
import { useEffect } from 'react'
import { IPost } from 'shared/interface'
import useNavigator from 'state/navigator'
import useOrder from '../state'
import { calculateDistance } from '../utils'

const useGetMessage = () => {
  const { socket } = useSocket()
  const { setPosts, getPosts } = useOrder()
  const { getCurrentNavigator } = useNavigator()

  useEffect(() => {
    const getDistanceV1 = async (data: IPost) => {
      const newPost = getPosts() || []
      let distance = null
      const currentPosition = getCurrentNavigator()
      
      const locationMe = {   
        latitude: currentPosition?.latitude,
        longitude: currentPosition?.longitude
      }

      if (locationMe && data?.locationStart) {
        try {
          distance = calculateDistance(locationMe, data?.locationStart)
          data.distance = distance
        } catch (error) {
          console.log('Distance error:::')
        }
      }
      newPost.unshift({
        ...data
      })
      setPosts(newPost)
    }
    socket?.on('postMessage', async (data: IPost) => {
      getDistanceV1(data)
    })
  }, [socket])
}

const useGetPost = () => {
  const { getCurrentNavigator } = useNavigator()
  const { setPosts } = useOrder()

  const getAllDistanceAsyncV1 = async (posts: IPost[]) => {
    const currentPosition = getCurrentNavigator()
    const locationMe = {   
      latitude: currentPosition?.latitude,
      longitude: currentPosition?.longitude
    }

    for (const item of posts) {
      if (locationMe?.latitude && locationMe?.longitude && item?.locationStart) {
        try {
          const distance = calculateDistance(locationMe, item?.locationStart)
          item.distance = distance
        } catch (error) {
          console.log('Distance error:::')
        }
      }
    }

    setPosts([...posts])
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await getPost()
      const newPost = data.filter(item => (item.content || '').length > 0)

      const navigator = getCurrentNavigator();
      navigator?.latitude && navigator?.longitude && await getAllDistanceAsyncV1(newPost)
    })()
  }, [getCurrentNavigator()])
}

export { useGetMessage, useGetPost }
