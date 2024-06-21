import OrderPage from 'pages/Order'
import kittenHeader from '../public/zalo.png'
import './app.scss'
import useSetNavigator from 'hooks/useNavigator'
import { Route, Routes, useNavigate } from 'react-router-dom'
import SignIn from 'pages/Auth/Login'
import { useEffect } from 'react'
import useLocalStorage from 'hooks/useLocalstorage'
import { LOCAL_STORAGE } from 'shared/constant'
import useApp from 'state/useApp'

function App() {
  const navigation = useNavigate();
  useSetNavigator()
  const { getLocalStorage } = useLocalStorage()
  const { setUserInfo } = useApp()
  const storeExitUser = getLocalStorage(LOCAL_STORAGE.USER_INFO)

  useEffect(() => {
    if (storeExitUser) {
      setUserInfo(JSON.parse(storeExitUser));
    } else {
      navigation('/signin');
    }
  }, []);

  return (
    <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route>
          <Route index element={<Main />} />
        </Route>
        <Route path="*" element={<Main />} />
      </Routes>
  )
}
const Main = () => {
  const handleRedirectZalo = () => {
    window.open('https://zalo.me/g/jzvyin775')
  }

  return (
    <div>
      <OrderPage />
      <div
        className="fixed bottom-14 right-2"
        onClick={() => handleRedirectZalo()}
      >
        <img src={kittenHeader} style={{ width: '70px' }} />
      </div>
    </div>
  )
}
export default App
