import { message } from 'antd'
import React from 'react'
import TryValidationRequest from './validations/TryValidationRequest'

export default function responseApi(info: any) {
    if (info.success) {
        message.success(info.message)
    }else{
        if (info.code === 422) {
            message.warning(
                <TryValidationRequest
                    validations={info.data}
                />
            , 10)
        }else{
            message.error(info.message)
        }
    }
}
