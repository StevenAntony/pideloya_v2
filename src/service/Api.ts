import axios from "axios"
import { keyStorage } from "../constants/keyStorage"
import object from "../helpers/object"
import useStorage from "../hooks/useStorage"
import Url from "./Url"

const Header = () => {

    const token = window.localStorage.getItem(keyStorage.AUTH_TOKEN)
    const myHeaders = new Headers()

    myHeaders.append("Accept", "application/json")
    myHeaders.append("Content-Type", "application/json")
    // myHeaders.append("company", company)
    myHeaders.append("Authorization", `Bearer ${token ?? ''}`)
    return myHeaders
}

const headerAxios = () => {
    const { getItem } = useStorage()

    const token = getItem('MARKETEXPRESS_AUTH')

    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token ? token.token : ''}`
    }
}

const HeaderFile = () => {
    const { getItem } = useStorage()

    const token = getItem('MARKETEXPRESS_AUTH')
    const myHeaders = new Headers()

    myHeaders.append("Accept", "application/json")
    myHeaders.append("Authorization", `Bearer ${token ? token.token : ''}`)
    return myHeaders
}

const URL = async (url: string, method: string, body: any) => {
    const raw = JSON.stringify(body)

    const requestOptions = {
        method: method,
        headers: Header(),
        body: raw
    }
    const response = await fetch(url, requestOptions)
    return response.json()
}

const Get = async (url: string, params = {}) => {
    const paramsQuery = object.isEmpty(params) ? '' : `?${new URLSearchParams(params)}`
    const requestOptions = {
        method: 'GET',
        headers: Header()
    }
    const response = await fetch(`${Url.API_V1}/${url}${paramsQuery}`, requestOptions)
    return response.json()
}

const GetAxios = async (url: string, body = null) => {
    try {
        let res = await axios({
            url: `${Url.API_V1}/${url}`,
            method: 'get',
            timeout: 8000,
            headers: headerAxios()
        })
        if (res.status == 200) {
            // test for status you want, etc
            console.log(res.status)
        }
        // Don't forget to return something
        return res.data
    }
    catch (err) {
        console.error(err);
    }
}

const Post = async (url: string, body: any) => {

    const raw = JSON.stringify(body)

    const requestOptions = {
        method: 'POST',
        headers: Header(),
        body: raw
    }

    const response = await fetch(`${Url.API_V1}/${url}`, requestOptions)
    return response.json()
}

const Put = async (url: string, body: any) => {

    const raw = JSON.stringify(body)

    const requestOptions: any = {
        method: 'PUT',
        headers: Header(),
        redirect: 'follow',
        body: raw
    }

    const response = await fetch(`${Url.API_V1}/${url}`, requestOptions)
    return response.json()
}

const Delete = async (url: string) => {

    const requestOptions = {
        method: 'DELETE',
        headers: Header()
    }
    const response = await fetch(`${Url.API_V1}/${url}`, requestOptions)
    return response.json()
}

const File = async (url: string, file: any) => {
    const formData = new FormData()
    formData.append('file[]', file)

    const requestOptions = {
        method: 'POST',
        headers: HeaderFile(),
        body: formData
    }

    const response = await fetch(`${Url.API_V1}/${url}`, requestOptions)
    return response.json()
}



export const Api = {
    Get, Post, Put, Delete, URL, File
}
