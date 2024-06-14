/* eslint-disable tailwindcss/no-custom-classname */
import ReactHtmlParser from 'html-react-parser'
import { IPost } from 'shared/interface'
import { handleRemoveSpecialCharactersContent } from '../utils'
import timeAgo from 'utils/time'
import ScandalAndMoney from './ScandalAndMoney'
import ButtonHanle from './ButtonHanle'

function MainOrder({ posts }: { posts: IPost[] }) {
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

export default MainOrder
