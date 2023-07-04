import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Error } from "./pages/auth/Error";
import { Modes } from "./style/Modes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Modes />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} replace />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
