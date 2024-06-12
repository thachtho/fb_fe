/* eslint-disable tailwindcss/no-custom-classname */
import ReactHtmlParser from 'html-react-parser'
import timeAgo from 'utils/time'
import ButtonHanle from './components/ButtonHanle'
import ScandalAndMoney from './components/ScandalAndMoney'
import { useGetMessage, useGetPost } from './hooks/useGetMessage'
import './index.scss'
import useOrder from './state'
import { handleRemoveSpecialCharactersContent } from './utils'
import { useEffect } from 'react'

function OrderPage() {
  const { posts, setPosts } = useOrder()
  useGetPost()
  useGetMessage()

  // const postsFake: IPost[] = [
  //   {
  //     name: 'Ngọc Ánh',
  //     content: 'Xin chao 0822423246',
  //     postId: '3700158433540026',
  //     userId: '100001814073295',
  //     created_at: new Date(),
  //     groupId: '1390167227872503',
  //     isNew: true
  //   }
  // ]

  useEffect(() => {
    const interval = setInterval(() => {
      if (posts && posts.length > 0) {
        const newPost = [...posts]
        setPosts(newPost)
      }
    }, 10000) // 3000 milliseconds = 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {posts &&
        posts.map((item, i) => {
          const { content } = item
          const newContent = handleRemoveSpecialCharactersContent(content)

          return (
            <div key={i} className="latest-order">
              <div
                className={`latest-order-item ${item?.isNew ? 'new' : 'old'}`}
              >
                <span className="name item-m3">
                  {item.name}
                  <span className={`${item?.isNew ? 'is-new' : 'is-old'}`}>
                    ({timeAgo(new Date(item.created_at))})
                  </span>
                </span>
                <ScandalAndMoney content={content} />
                <b className="item-m3 text-lg">{ReactHtmlParser(newContent)}</b>
                <ButtonHanle item={item} />
              </div>
            </div>
          )
        })}
    </>
  )
}

export default OrderPage
