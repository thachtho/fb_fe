/* eslint-disable tailwindcss/no-custom-classname */
import { Spin } from 'antd'
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

  return (
    <>
      <Header />
      {!posts || posts.length === 0 ? (
        <div className="flex items-center justify-center">
          <Spin />
        </div>
      ) : (
        <>
          <MainOrder posts={posts} />
          <OrderSave />
        </>
      )}
    </>
  )
}

export default OrderPage
