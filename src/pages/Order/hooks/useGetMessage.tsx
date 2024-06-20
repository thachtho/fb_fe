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
    socket?.on('postMessage', async (data: IPost) => {
      const posts = getPosts() || [];
      const dataCheck = posts.find((item) =>item.postId === data.postId);

      if (dataCheck) {
        let distance = null;
        const currentPosition = getCurrentNavigator()
        const startNavigator = data.startNavigator
        const locationA = {   
          latitude: currentPosition?.latitude,
          longitude: currentPosition?.longitude
        }
        const { lat, lng } = startNavigator || {}
        const locationB = {   
          latitude: lat,
          longitude: lng 
        }

        if (locationA && locationB.latitude !== 0 && locationB.longitude.length !== 0) {
          distance = calculateDistance(locationA, locationB)
          dataCheck.distance = parseFloat(distance.toFixed(1));
        }

        setPosts([...posts])

        return;
      }

      posts.unshift({
        ...data
      })
      setPosts(posts)
    })
  }, [socket])
}

const useGetPost = () => {
  const { getCurrentNavigator } = useNavigator()
  const { setPosts } = useOrder()

  const getAllDistanceAsync = async (posts: IPost[]) => {
    const location = getCurrentNavigator()

    const postNotNullAddress = posts.map((item) => {
      return { ...item, address: getAddress(item.content) || null }
    }).filter((item) => item.address)
    const apis = postNotNullAddress.map((item) => {
      const input = {
        lat: location?.latitude,
        long: location?.longitude,
        address: getAddress(item.content) || null
      }

      return getDistance(input)
    })
    
    const responseDistance = (await Promise.all(apis))
    const newPostNotNullAddress = postNotNullAddress.map((item, i)  => {
      return {
        ...item, distance: responseDistance[i]
      }
    })

    const newDataPosts = posts.map((item, i) => {
      const postDistance = newPostNotNullAddress.find(item1 => item1.postId === item.postId) 

      return {
        ...item, ...postDistance
      }
    })
    setPosts(newDataPosts)
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await getPost()
      setPosts(data)
      // await getAllDistanceAsync(data)
    })()
  }, [])
}

export { useGetMessage, useGetPost }
