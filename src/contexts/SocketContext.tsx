import { useState, useEffect, useContext, createContext } from 'react'
import io from 'socket.io-client'

const SocketContext = createContext({
    socketIO: null,
    waitEvent: (nameEvent: string, callback: (...args: any[]) => void) => {}
})

export function SocketProvider({
    children
}: { children: React.ReactNode }) {
    const [socketIO, setSocketIO] = useState<any>(null)
    // const [connect, setConnect] = useState(false)

    useEffect(() => {
        if (import.meta.env.VITE_HOST_SOCKET) {
            const socketDraft = io(import.meta.env.VITE_HOST_SOCKET)
            setTimeout(() => {
                setSocketIO(socketDraft)
            }, 3000)
            return () => {
                if (socketIO) {
                    socketIO.disconnect()
                }
            }
        }
    }, [])

    function waitEvent(nameEvent: string, callback: (...args: any[]) => any) {
        if (socketIO) {
            socketIO.on(nameEvent, callback)
        }
    }

    return (
        <SocketContext.Provider
            value={{
                socketIO,
                waitEvent
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

export function useSocketIO() {
    return useContext(SocketContext)
}

export default SocketContext
