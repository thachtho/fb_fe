/* eslint-disable tailwindcss/no-custom-classname */
import timeAgo from 'utils/time'
import ButtonHanle from './components/ButtonHanle'
import ScandalAndMoney from './components/ScandalAndMoney'
import { useGetMessage, useGetPost } from './hooks/useGetMessage'
import './index.scss'
import useOrder from './state'
import { handleRemoveSpecialCharactersContent } from './utils'

function OrderPage() {
  const { posts } = useOrder()
  useGetPost()
  useGetMessage()
  console.log(111111, posts)

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
                <b className="item-m3 text-lg">{newContent}</b>
                <ButtonHanle content={content} />
              </div>
            </div>
          )
        })}
    </>
  )
}

export default OrderPage
