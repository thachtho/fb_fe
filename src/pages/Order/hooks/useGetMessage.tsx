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
          const input = {
            lat: location.latitude,
            long: location.longitude,
            address: address || null
          }
          if (address) {
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
  const { setPosts } = useOrder()

  useEffect(() => {
    ;(async () => {
      const { data } = await getPost()
      setPosts(data)
    })()
  }, [])
}

export { useGetMessage, useGetPost }
