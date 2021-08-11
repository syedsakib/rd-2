import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import ReduxToastr from "react-redux-toastr"
import "react-redux-toastr/lib/css/react-redux-toastr.min.css"
//import "toastr/build/toastr.min.css"

import "primeicons/primeicons.css"
import "primereact/resources/themes/saga-blue/theme.css"
import "primereact/resources/primereact.css"

import store from "./store"

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    <ReduxToastr
      attention={true}
      timeOut={5000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      removeOnHover={false}
      progressBar={true}
      closeOnToastrClick={true}
      enableHtml={true}
      allowHtml={true}
    />
  </Provider>
)

ReactDOM.render(app, document.getElementById("root"))
serviceWorker.unregister()
