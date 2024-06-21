import CONSTANT from 'shared/constant'
import { Socket, io } from 'socket.io-client'
import { create } from 'zustand'

type SocketType = {
  socket: Socket | null,
  connect: () => void
}


const useSocket = create<SocketType>((set) => ({
  socket: null,
  connect: () =>
  set(() => ({ socket: connectSocket() })),
}))

const connectSocket = () => {
  const socket = io(CONSTANT.URL_SOCKET)
  socket.on('connect', () => {
    console.log('Connected to server admin page!.')
  })
  socket.on('error', (error) => {
    console.error('Socket connection error:', error)
  })
  socket.on('disconnect', () => {
    console.log('Disconnected from socket')
  })

  return socket
}

export default useSocket
