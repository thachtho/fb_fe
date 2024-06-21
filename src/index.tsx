import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from 'App'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter as Router } from 'react-router-dom';
const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(
  <>
    <Router>
      <App />
    </Router>
    <ToastContainer />
  </>
)
