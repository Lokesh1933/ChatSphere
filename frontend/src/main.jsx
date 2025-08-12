import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from 'react-router-dom'
import ChatProvider from './Context/ChatProvider'

import { ThemeProvider } from 'next-themes'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <ChatProvider>
    <BrowserRouter>
     <ChakraProvider>
        <App />
     </ChakraProvider>
    </BrowserRouter>
  </ChatProvider>,
)
