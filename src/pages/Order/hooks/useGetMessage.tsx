import { getPost } from 'api/post.api'
import useSocket from 'hooks/useSocket'
import { useEffect } from 'react'
import { IPost } from 'shared/interface'
import useNavigator from 'state/navigator'
import useOrder from '../state'
import { getDistance } from 'api/google.api'
import { calculateDistance, getAddress } from '../utils'

const useGetMessage = () => {
  const { socket } = useSocket()
  const { setPosts, getPosts } = useOrder()
  const { getCurrentNavigator } = useNavigator()



  useEffect(() => {
    const getAllDistanceAsync = async (posts: IPost[]) => {
      const currentPosition = getCurrentNavigator()
      const locationA = {   
        latitude: currentPosition?.latitude,
        longitude: currentPosition?.longitude
      }
  
      for (const post of posts) {
        try {
          const startNavigator = post.startNavigator
          const { lat, lng } = startNavigator || {}
          const locationB = {   
            latitude: lat,
            longitude: lng 
          }
  
          if (locationA && (locationB?.latitude && locationB?.latitude !== 0) && (locationB?.longitude && locationB?.longitude !== 0)) {
            const distance = calculateDistance(locationA, locationB)
  
            post.distance = distance ? parseFloat(distance.toFixed(1)) : null;
          }       
        } catch (error) {
          return null
        }
      }
  
      setPosts([...posts])
    }

    const getDistanceV1 = async (data: IPost) => {
      const newPost = getPosts() || []
      let distance = null
      const currentPosition = getCurrentNavigator()
      
      const locationMe = {   
        latitude: currentPosition?.latitude,
        longitude: currentPosition?.longitude
      }

      if (locationMe && data?.location) {
        try {
          distance = calculateDistance(locationMe, data?.location)
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
      if (locationMe && item?.location) {
        try {
          const distance = calculateDistance(locationMe, item?.location)
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
      await getAllDistanceAsyncV1(newPost)
    })()
  }, [])
}

export { useGetMessage, useGetPost }
