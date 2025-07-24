import { BrowserRouter, Routes, Route } from "react-router";

// Layout
import Header from "./layout/Header";
import Home from "./layout/Home";
import About from "./layout/About";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre-mim" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
