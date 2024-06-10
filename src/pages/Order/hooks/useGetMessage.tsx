import { getPost } from 'api/post.api'
import useSocket from 'hooks/useSocket'
import { useEffect } from 'react'
import { IPost } from 'shared/interface'
import useOrder from '../state'

const useGetMessage = () => {
  const { socket } = useSocket()
  const { posts, setPosts } = useOrder()
  useEffect(() => {
    socket?.on('postMessage', (data: IPost[]) => {
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
