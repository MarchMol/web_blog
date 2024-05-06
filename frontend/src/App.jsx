import { useEffect, useState } from "react";
import Router from "./Router";
import { TokenProvider } from "./hooks/UseToken";
import { RouterProvider } from "./hooks/useRouter";


function App() {

    return (
        <TokenProvider>
            <RouterProvider>
                <div>
                    <Router />
                </div>
            </RouterProvider>
        </TokenProvider>
    )
}

export default App