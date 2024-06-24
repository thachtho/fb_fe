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
      // let distance = null
      // const location = getCurrentNavigator()
      // if (location) {
      //   try {
      //     const address = getAddress(data.content)
  
      //     if (address) {
      //       const input = {
      //         lat: location.latitude,
      //         long: location.longitude,
      //         address: address || null
      //       }
      //       distance = await getDistance(input)
      //       data.distance = distance
      //     }
      //   } catch (error) {
      //     console.log('Distance error:::')
      //   }
      // }
      newPost.unshift({
        ...data
      })
      setPosts(newPost)
    }
    socket?.on('postMessage', async (data: IPost) => {
      getDistanceV1(data)
      // const newPosts = data.filter(item => item.content.length > 0)
      // getAllDistanceAsync(newPosts)
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

  const getAllDistanceAsyncV1 = async (posts: IPost[]) => {
    const location = getCurrentNavigator()

    const apis = posts.map((item) => {
      const input = {
        lat: location?.latitude,
        long: location?.longitude,
        address: getAddress(item.content) || null
      }

      return getDistance(input)
    })

    const responseDistance = await Promise.all(apis)
    const newDataDistance = posts.map((item, i) => {
      return {
        ...item,
        distance: responseDistance[i].length > 0 ? responseDistance[i] : null
      }
    })

    setPosts([...newDataDistance])
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await getPost()
      const newPosts = data.filter(item => item.content.length > 0)
      setPosts(data);
      await getAllDistanceAsyncV1(newPosts)
    })()
  }, [])
}

export { useGetMessage, useGetPost }
