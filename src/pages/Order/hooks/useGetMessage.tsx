import { getPost } from 'api/post.api'
import useSocket from 'hooks/useSocket'
import { useEffect } from 'react'
import { IPost } from 'shared/interface'
import useNavigator from 'state/navigator'
import useOrder from '../state'
import { getDistance } from 'api/google.api'

const useGetMessage = () => {
  const { socket } = useSocket()
  const { posts } = useOrder()
  const { setPosts, getPosts } = useOrder()
  const { getCurrentNavigator } = useNavigator()

  useEffect(() => {
    socket?.on('postMessage', async (data: IPost) => {
      const newPost = getPosts() || []
      newPost.unshift({
        ...data
      })

      // const location = getCurrentNavigator()
      // const distance = await getDistance()
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
