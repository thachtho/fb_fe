/* eslint-disable tailwindcss/no-custom-classname */
import Header from './components/Header'
import MainOrder from './components/MainOrder'
import OrderSave from './components/OderSave'
import { useGetMessage, useGetPost } from './hooks/useGetMessage'
import './index.scss'
import useOrder from './state'
import useOrderSave from './state/orderSave'

function OrderPage() {
  const { posts } = useOrder()

  useGetPost()
  useGetMessage()

  return (
    <>
      <Header />
      {posts && posts.length > 0 && <MainOrder posts={posts} />}
      <OrderSave />
    </>
  )
}

export default OrderPage
