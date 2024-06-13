import { getPost } from 'api/post.api'
import useSocket from 'hooks/useSocket'
import { useEffect } from 'react'
import { IPost } from 'shared/interface'
import useOrder from '../state'
import useDistance from 'hooks/useDistance'

const useGetMessage = () => {
  const { socket } = useSocket()
  const { getLocationMeToShop } = useDistance()
  const { setPosts, getPost } = useOrder()

  useEffect(() => {
    socket?.on('postMessage', async (data: IPost) => {
      let posts = getPost()

      if (!posts) {
        posts = []
      }
      const meToShop = await getLocationMeToShop(data.content)
      data.meToShop = meToShop

      posts.unshift({ ...data })
      setPosts(posts)
    })
  }, [socket])
}

const useGetPost = () => {
  const { setPosts } = useOrder()
  const { getLocationMeToShop } = useDistance()
  useEffect(() => {
    ;(async () => {
      const { data: posts } = await getPost()

      for (const post of posts) {
        const meToShop = await getLocationMeToShop(post.content)
        post.meToShop = meToShop
      }
      setPosts(posts)
    })()
  }, [])
}

export { useGetMessage, useGetPost }
