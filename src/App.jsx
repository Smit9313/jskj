import "./App.css";
import AllRoutes from "./router/AllRoutes";
import { BrowserRouter } from "react-router-dom";
import store from './store/store'
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
