import useSocket from 'hooks/useSocket'
import { useEffect } from 'react'
import useOrder from '../state'
import { IPost } from 'shared/interface'
import { combinePosts } from '../utils'
import { getPost } from 'api/post.api'

const useGetMessage = () => {
  const { socket } = useSocket()
  const { posts, setPosts } = useOrder()
  useEffect(() => {
    socket?.on('postMessage', (data: IPost[]) => {
      // const newPosts = combinePosts(posts || [], data)
      console.log(111, data)
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
