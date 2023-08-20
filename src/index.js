/* eslint-disable no-unused-vars */

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/tailwind.output.css'
import './index.css'
import App from './App'
import { SidebarProvider } from './context/SidebarContext'
import ThemedSuspense from './components/ThemedSuspense'
import { Windmill } from '@windmill/react-ui'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from 'hooks/authContext'
import { createRoot } from 'react-dom/client';
import './style/main.css'
const container = document.getElementById('root');
const root = createRoot(container);

root.render( 
    <BrowserRouter >
    <SidebarProvider >
    <Suspense fallback = { < ThemedSuspense /> } >
    <Windmill usePreferences >

    <AuthContextProvider >
    <App />
    </AuthContextProvider>



    </Windmill> 
    </Suspense> 
    </SidebarProvider> 
    </BrowserRouter>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()