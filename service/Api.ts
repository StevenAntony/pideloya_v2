import useStorage from "@/hooks/useStorage"
import Url from "./Url"

const Header = (): HeadersInit => {
    const { getItem } = useStorage()

    const token = getItem('PIDELOYA_AUTH')
    const myHeaders = new Headers()
    const company = getItem('company')

    myHeaders.append("Accept", "application/json")
    myHeaders.append("Content-Type", "application/json")
    // myHeaders.append("company", company)
    myHeaders.append("Authorization", `Bearer ${token ? token.token : ''}`)
    return myHeaders
}

const Get = async (url: string, body?: null|any|undefined) => {
    const raw = JSON.stringify(body)

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: Header(),
        body: raw
    }
    const response = await fetch(`${Url.API_V1}/${url}`, requestOptions)
    return response.json()
}

const Post = async (url: string, body: any) => {

    const raw = JSON.stringify(body)

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: Header(),
        body: raw
    }

    const response = await fetch(`${Url.API_V1}/${url}`, requestOptions)
    return response.json()
}

const Put = async (url: string, body: any) => {

    const raw = JSON.stringify(body)

    const requestOptions: RequestInit = {
        method: 'PUT',
        headers: Header(),
        redirect: 'follow',
        body: raw
    }

    const response = await fetch(url, requestOptions)
    return response.json()
}

export const Api = {
    Get, Post, Put
}