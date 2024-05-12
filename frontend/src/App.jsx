import Router from './Router'
import { TokenProvider } from '@hooks/useToken'
import { RouterProvider } from '@hooks/useRouter'
import { MsgProvider } from '@hooks/useMsg'
import React from 'react'

function App () {
  return (
        <TokenProvider>
            <RouterProvider>
                <MsgProvider>
                    <Router />
                </MsgProvider>
            </RouterProvider>
        </TokenProvider>
  )
}

export default App
