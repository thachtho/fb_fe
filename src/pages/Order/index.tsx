/* eslint-disable tailwindcss/no-custom-classname */
import ReactHtmlParser from 'html-react-parser'
import timeAgo from 'utils/time'
import ButtonHanle from './components/ButtonHanle'
import ScandalAndMoney from './components/ScandalAndMoney'
import { useGetMessage, useGetPost } from './hooks/useGetMessage'
import './index.scss'
import useOrder from './state'
import { handleRemoveSpecialCharactersContent } from './utils'
import { IPost } from 'shared/interface'
import Header from './components/Header'

function OrderPage() {
  const { posts } = useOrder()
  useGetPost()
  useGetMessage()

  // const postsFake: IPost[] = [
  //   {
  //     name: 'Ngọc Ánh',
  //     content: '07 Hồ Nguyên Trừng đi 20 Ngũ Hành Sơn',
  //     postId: '3700158433540026',
  //     userId: '100001814073295',
  //     created_at: new Date(),
  //     groupId: '1390167227872503',
  //     isNew: true
  //   }
  // ]

  return (
    <>
      {posts &&
        posts.map((item, i) => {
          const { content } = item
          const newContent = handleRemoveSpecialCharactersContent(content)

          return (
            <div key={i} className="latest-order">
              <Header />
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
