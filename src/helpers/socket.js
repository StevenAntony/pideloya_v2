import io from 'socket.io-client'

export const socket = import.meta.env.VITE_HOST_SOCKET ? io(import.meta.env.VITE_HOST_SOCKET) : null
