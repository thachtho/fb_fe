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
    socket?.on('postMessage', async (data: IPost[]) => {
      const newPosts = data.filter(item => item.content.length > 0)
      console.log(111111, newPosts)
      getAllDistanceAsync(newPosts)
      // const posts = getPosts() || [];
      // const dataCheck = posts.find((item) =>item.postId === data.postId);

      // if (dataCheck) {
      //   const currentPosition = getCurrentNavigator()
        
      //   const locationA = {   
      //     latitude: currentPosition?.latitude,
      //     longitude: currentPosition?.longitude
      //   }
      //   const startNavigator = data.startNavigator
      //   const { lat, lng } = startNavigator || {}
      //   const locationB = {   
      //     latitude: lat,
      //     longitude: lng 
      //   }

      //   if (locationA && locationB.latitude !== 0 && locationB.longitude.length !== 0) {
      //     const distance = calculateDistance(locationA, locationB)
      //     dataCheck.distance = parseFloat(distance.toFixed(1));
      //   }

      //   setPosts([...posts])

      //   return;
      // }

      // posts.unshift({
      //   ...data
      // })
      // setPosts(posts)
    })
  }, [socket])
}

const useGetPost = () => {
  const { getCurrentNavigator } = useNavigator()
  const { setPosts } = useOrder()

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

  useEffect(() => {
    ;(async () => {
      const { data } = await getPost()
      const newPosts = data.filter(item => item.content.length > 0)
      await getAllDistanceAsync(newPosts)
      // setPosts(data);
    })()
  }, [])
}

export { useGetMessage, useGetPost }
