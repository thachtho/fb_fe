import useLocalStorage from 'hooks/useLocalstorage'
import useSetNavigator from 'hooks/useNavigator'
import useSocket from 'hooks/useSocket'
import Auth from 'pages/Auth'
import OrderPage from 'pages/Order'
import { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { LOCAL_STORAGE } from 'shared/enum'
import useApp from 'state/useApp'
import kittenHeader from '../public/zalo.png'
import './app.scss'
import AcceptMember from 'pages/Admin/AcceptMember'
import useCheckCrashUser from 'hooks/useCheckCrashUser'

function App() {
  const navigation = useNavigate();
  useSetNavigator()
  useCheckCrashUser()
  const { getLocalStorage } = useLocalStorage()
  const { setUserInfo, setIsCheckCrash } = useApp()
  const storeExitUser = getLocalStorage(LOCAL_STORAGE.USER_INFO)
  const { connect } = useSocket()

  useEffect(() => {
    if (storeExitUser) {
      setIsCheckCrash(true)
      connect()
      setUserInfo(JSON.parse(storeExitUser));
    } else {
      navigation('/signin');
    }
  }, []);

  const handleRedirectZalo = () => {
    window.open('https://zalo.me/g/jzvyin775')
  }

  return (
    <div>
      <Routes>
        <Route path="/signin" element={<Auth />} />
        <Route>
          <Route index element={<Main />} />
        </Route>
        <Route path="/admin/accept-member" element={<AcceptMember />} />
        <Route path="*" element={<Main />} />
      </Routes>
        <div
          className="fixed bottom-14 right-2"
          onClick={() => handleRedirectZalo()}
        >
          <img src={kittenHeader} style={{ width: '70px' }} />
        </div>
    </div>

  )
}
const Main = () => {
  return (
    <div>
      <OrderPage />

    </div>
  )
}
export default App
