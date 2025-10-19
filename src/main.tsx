import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { Global } from "@emotion/react"
import App from "./App"
import { store } from "./store/store"
import { globalStyles } from "./styles/globalStyles"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Global styles={globalStyles} />
      <App />
    </Provider>
  </React.StrictMode>,
)
