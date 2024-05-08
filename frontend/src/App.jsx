import { useEffect, useState } from "react";
import Router from "./Router";
import { TokenProvider } from "@hooks/UseToken";
import { RouterProvider } from "@hooks/useRouter";
import { MsgProvider } from "@hooks/useMsg";

function App() {

    return (
        <TokenProvider>
            <RouterProvider>
                <MsgProvider>
                    <div>
                        <Router />
                    </div>
                </MsgProvider>
            </RouterProvider>
        </TokenProvider>
    )
}

export default App