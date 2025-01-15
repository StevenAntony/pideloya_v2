import { Spin } from 'antd'
import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'

export default function LoadingApp({ children }) {

    const { loadingAccount } = useAuthContext()

    return (
        // <Spin tip="Cargando aplicación..." spinning={spinning}>
        //     { children }
        // </Spin>
        <div>
            { loadingAccount && <div className="spinner-wrapper">
                <div className="spinner">
                    <div className="sk-folding-cube">
                        <div className="sk-cube1 sk-cube"></div>
                        <div className="sk-cube2 sk-cube"></div>
                        <div className="sk-cube4 sk-cube"></div>
                        <div className="sk-cube3 sk-cube"></div>
                    </div>
                </div>
            </div>}
            { children }
        </div>
    )
}
