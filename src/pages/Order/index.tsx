/* eslint-disable tailwindcss/no-custom-classname */
import { IPost } from 'shared/interface'
import Header from './components/Header'
import MainOrder from './components/MainOrder'
import OrderSave from './components/OderSave'
import { useGetMessage, useGetPost } from './hooks/useGetMessage'
import './index.scss'
import useOrder from './state'

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
      <Header />
      {posts && posts.length > 0 && <MainOrder posts={posts} />}
      <OrderSave />
    </>
  )
}

export default OrderPage
