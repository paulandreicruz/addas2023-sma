import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Error } from "./pages/auth/Error";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Error />} replace />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
