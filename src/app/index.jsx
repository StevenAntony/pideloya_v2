import React from 'react'
import ReactDOM from 'react-dom/client'
import RouteApp from './src/RouteApp'
import { BrowserRouter } from "react-router-dom"
import "primereact/resources/themes/lara-light-cyan/theme.css"
import 'primeicons/primeicons.css';



if (document.getElementById('root')) {
    const Index = ReactDOM.createRoot(document.getElementById("root"))

    Index.render(
        <BrowserRouter>
            <RouteApp />
        </BrowserRouter>
    )
}

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js').then(registration => {
//             console.log('SW registered: ', registration);
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
// }
