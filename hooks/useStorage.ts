"use client"
const useStorage = () => {
    const getItem = (key : string) => {
        if (typeof window === 'undefined') return null
        const data = window.localStorage.getItem(key)
        return data && JSON.parse(data)
    }

    const setItem = (key : string, value: any) => {
        if (typeof window === 'undefined') return null
        window.localStorage.setItem(key, JSON.stringify(value))
    }

    return { getItem, setItem }
}

export default useStorage