
import AllRoutes from "./router/AllRoutes";
import { BrowserRouter } from "react-router-dom";
import store from './store/store'
import { Provider } from 'react-redux';
import { AuthProvider } from "./context/Auth";

function App() {
  return (
    <Provider store={store}>
    <AuthProvider>
    <BrowserRouter>
      <AllRoutes />
    </BrowserRouter>
    </AuthProvider>
    </Provider>
  );
}

export default App;
