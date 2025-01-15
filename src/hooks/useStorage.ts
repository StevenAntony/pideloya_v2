"use client"
const useStorage = () => {
    const getItem = (key: string) => {
        if (typeof window === 'undefined') return null
        const data = window.localStorage.getItem(key)
        return data && JSON.parse(data)
    }

    const setItem = (key: string, value: any) => {
        if (typeof window === 'undefined') return null
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    const removeItem = (key: string) => {
        if (typeof window === 'undefined') return null
        window.localStorage.removeItem(key)
    }

    return { getItem, setItem, removeItem }
}

export default useStorage
