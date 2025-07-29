import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";

// Layout
import Header from "./layout/Header";

// Pages
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import NotFound from "./pages/public/NotFound";
import Menu from "./pages/public/Menu";
import PrivateRouter from "./components/PrivateRouter";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-mim" element={<About />} />
          <Route
            path="/sobre-mim1"
            element={
              <PrivateRouter isClosed={true} element={() => <About />} />
            }
          />
          <Route path="/menu" element={<Menu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
