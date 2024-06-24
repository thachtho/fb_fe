import CONSTANT from 'shared/constant'
import { Socket, io } from 'socket.io-client'
import { create } from 'zustand'

type SocketType = {
  socket: Socket | null,
  connect: (userInfo: any) => void,
  disConnect: () => void
}

const useSocket = create<SocketType>((set, get) => ({
  socket: null,
  connect: (userInfo: any) => set(() => ({ socket: connectSocket(userInfo) })),
  disConnect: () => get().socket?.disconnect(),
}))

const connectSocket = (userInfo: any) => {
  const socket = io(CONSTANT.URL_SOCKET, {
    query: { phone: userInfo?.phone },
    secure: true,
  })
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
