import useSocket from 'hooks/useSocket'
import { useEffect, useState } from 'react'
import { IPost } from 'shared/interface'
import useNavigator from 'state/navigator'
import useOrder from '../state'
import { calculateDistance } from '../utils'

const useGetMessage = () => {
  const { socket } = useSocket()
  const { setPosts, getPosts } = useOrder()
  const { getCurrentNavigator } = useNavigator()

  useEffect(() => {
    const getDistanceV1 = async (data: IPost) => {
      const newPost = getPosts() || []
      let distance = null
      const currentPosition = getCurrentNavigator()
      
      const locationMe = {   
        latitude: currentPosition?.latitude,
        longitude: currentPosition?.longitude
      }

      if (locationMe && data?.location) {
        try {
          distance = calculateDistance(locationMe, data?.location)
          data.distance = distance
        } catch (error) {
          console.log('Distance error:::')
        }
      }
      newPost.unshift({
        ...data
      })
      setPosts(newPost)
    }
    socket?.on('postMessage', async (data: IPost) => {
      getDistanceV1(data)
    })
  }, [socket])
}

const useGetPost = () => {
  const { getCurrentNavigator, currentNavagator } = useNavigator()
  const { setPosts } = useOrder()
  const getAllDistanceAsyncV1 = async (posts: IPost[]) => {
    const currentPosition = getCurrentNavigator()
    const locationMe = {   
      latitude: currentPosition?.latitude,
      longitude: currentPosition?.longitude
    }

    for (const item of posts) {
      if (locationMe?.latitude && locationMe?.longitude && item?.location) {
        try {
          const distance = calculateDistance(locationMe, item?.location)
          item.distance = distance
        } catch (error) {
          console.log('Distance error:::')
        }
      }
    }

    setPosts([...posts])
  }

  useEffect(() => {
    ;(async () => {
      // const { data } = await getPost()
      // const newPost = data.filter(item => (item.content || '').length > 0)
      const posts: any = [
        {
          "content": "145 huỳnh thúc kháng  21/24 lê hồng phong Phí 15k",
          "time": "Vừa xong",
          "postId": "3715157592040110",
          "userId": "/dieuhuong0509?eav=AfYpv8fvGtC-EcFDTo_NDEIHUDbvgFV1W-lSiHiIwHhGFSFz7dYXFbUG9Rmy80sQtR4&amp;refid=18&amp;_ft_=encrypted_tracking_data.0AY8HFQNbPE9VMcU-PLjCSwjb92ZqkRyiHpc3xjXiBwNLh5tku9erC2DMOemoDYd27u_s7fspcNJrl-b1ejtsaJedrmmkiZ1HR5u_MjRh6Bb56wPOrtRlh75R25pU05VKBHI2SacOZfLiRxBqmbYgBTwfnVi_KskIKgsYdkbN05lc_8DJ0Nfo0e8OP7JHeZ-w8bFYTkHeP4vXWKYktqy9hCeKdxR2pql-j3aK_WYGuvLZtyBYzkTqEvBvJhW6MvyeeSKmHE0tb0xSuCM5fra63iSKrDT5VHE9928tlDch_IW-B89dUmkl4Jl1ewETqtf6h-qYUxdLEH0mwb_YTLGgZiMYsjuG-qoowpi4ew79ut1RDnvMFJ6OehGOtozM2LRBo021SAoswYiuObbIozZNu0h7jdCRKlFa0eGwnH0n1xL-wGxGasilBLNIp24OXYtWkJGbpkoM-bZsZRQIc0RPyYEyPEHB34Vm_tYrPHVjQgkme6vIF6K2aP3U4fTUZuMmkpjaxEH68gXV0vBnla6b8CAN4OhnPs3yns8wHcejzEtCZYI7v7aECoTKmI-qK6FSd3DxX2tK7aiIRq_OL2RilMUrDsfSqlR5XPx4NTQffhdQvhA1bvGkZOlq-8ry_z33BlgdP9-5reYIgJJGozrD60EUrLNjj_dSceTIyON4_YrpQDvaus2U3Cv7vMc3Xyy1N38OfPjM0vdTHgwpzVmdmdw3lmscrP87KPgIrxEoxmp5ETVxU_mBRbTmo1JPGYv8vYQxsMHwNJoUHSjlTnruB-056-2UtNNGGWqZGm0V_aSJnOyhQbdhBBOFtph6D7CstNSs49SRI7NgjOsuAo5VhHJWRufjbqjPqwDTF7FrBeU2QlgqmehEf0cHKqEbwahTCjxjUW9WTcqogsSeleSUSdlkV3jKMA&amp;__tn__=C-R&amp;paipv=0",
          "name": "Lê Diệu Hương",
          "groupId": "1390167227872503",
          "created_at": "2024-06-29T05:48:16.366Z",
          "location": {
          "latitude": "16.0592317",
          "longitude": "108.2181951"
          }
          },
        ]
      const navigator = getCurrentNavigator();
      navigator?.latitude && navigator?.longitude && await getAllDistanceAsyncV1(posts)
    })()
  }, [getCurrentNavigator()])
}

export { useGetMessage, useGetPost }
