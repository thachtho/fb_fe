/* eslint-disable tailwindcss/no-custom-classname */
import ReactHtmlParser from 'html-react-parser'
import { IPost } from 'shared/interface'
import { handleRemoveSpecialCharactersContent } from '../utils'
import timeAgo from 'utils/time'
import ScandalAndMoney from './ScandalAndMoney'
import ButtonHanle from './ButtonHandle'
import Distance from './Distance'

interface IProps {
  posts: IPost[]
  isSaved?: boolean
}

function MainOrder({ posts, isSaved = false }: IProps) {
  return (
    <>
      {posts &&
        posts.map((item, i) => {
          const { content, distance, distanceAB, time } = item
          const newContent = handleRemoveSpecialCharactersContent(content)

          return (
            <div key={i} className="latest-order">
              <div
                className={`latest-order-item ${item?.isNew ? 'new' : 'old'}`}
              >
                <span className="name item-m3">
                  {ReactHtmlParser(item.name.replace('GOJO', ''))}
                  {!isSaved && (
                    <span className={`${item?.isNew ? 'is-new' : 'is-old'}`}>
                      ({timeAgo(new Date(item.created_at))})
                    </span>
                  )}
                </span>
                {distance && <Distance distance={distance} distanceAB={distanceAB} time={time}/> }
                <ScandalAndMoney content={content} />
                <b className="item-m3 text-lg">{ReactHtmlParser(newContent)}</b>
                <ButtonHanle item={item} isSaved={isSaved} />
              </div>
            </div>
          )
        })}
    </>
  )
}

export default MainOrder
