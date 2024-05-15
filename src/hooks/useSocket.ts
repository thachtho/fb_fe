import CONSTANT from 'shared/constant'
import { Socket, io } from 'socket.io-client'
import { create } from 'zustand'

type SocketType = {
  socket: Socket
}

const socket = io(CONSTANT.URL)
socket.on('connect', () => {
  console.log('Connected to server admin page!.')
})
socket.on('error', (error) => {
  console.error('Socket connection error:', error)
})
socket.on('disconnect', () => {
  console.log('Disconnected from socket')
})

const useSocket = create<SocketType>(() => ({
  socket: socket
}))

export default useSocket
