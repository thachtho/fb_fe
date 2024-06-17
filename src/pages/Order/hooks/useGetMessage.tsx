import { getPost } from 'api/post.api'
import useSocket from 'hooks/useSocket'
import { useEffect } from 'react'
import { IPost } from 'shared/interface'
import useNavigator from 'state/navigator'
import useOrder from '../state'
import { getDistance } from 'api/google.api'
import { getAddress } from '../utils'

const useGetMessage = () => {
  const { socket } = useSocket()
  const { setPosts, getPosts } = useOrder()
  const { getCurrentNavigator } = useNavigator()

  useEffect(() => {
    socket?.on('postMessage', async (data: IPost) => {
      const newPost = getPosts() || []

      let distance = null
      const location = getCurrentNavigator()
      if (location) {
        try {
          const address = getAddress(data.content)

          if (address) {
            const input = {
              lat: location.latitude,
              long: location.longitude,
              address: address || null
            }
            distance = await getDistance(input)
            data.distance = distance
          }
        } catch (error) {
          console.log('Distance error:::')
        }
      }
      newPost.unshift({
        ...data
      })
      setPosts(newPost)
    })
  }, [socket])
}

const useGetPost = () => {
  const { getCurrentNavigator } = useNavigator()
  const { setPosts } = useOrder()

  const getAllDistance = async (posts: IPost[]) => {
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

    return newDataDistance
  }

  useEffect(() => {
    ;(async () => {
      const { data } = await getPost()
      const posts = await getAllDistance(data)
      setPosts(posts)
    })()
  }, [])
}

export { useGetMessage, useGetPost }
