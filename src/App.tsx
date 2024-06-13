import OrderPage from 'pages/Order'
import kittenHeader from '../public/zalo.png'
import './app.scss'
import { useEffect } from 'react'
import useNavigator from 'hooks/useNavigator'

function App() {
  const { setCurrentNavigator } = useNavigator()
  const handleRedirectZalo = () => {
    window.open('https://zalo.me/g/jzvyin775')
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((success) => {
      setCurrentNavigator(success.coords)
    })
  }, [])

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
