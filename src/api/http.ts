import axios, { AxiosInstance } from 'axios'
import CONSTANT from 'shared/constant'

class Http {
  instance: AxiosInstance
  accessToken = localStorage.getItem('accessToken')
  refreshToken = localStorage.getItem('refreshToken')

  constructor() {
    this.instance = axios.create({
      baseURL: CONSTANT.URL,
      timeout: 10000,
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new Http().instance
export default http
