import { Spin } from 'antd'
import React from 'react'

export default function LoadingFull({ children, spinning }) {
    return (
        // <Spin tip="Cargando aplicación..." spinning={spinning}>
        //     { children }
        // </Spin>
        <div>
            { spinning && <div className="spinner-wrapper">
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
