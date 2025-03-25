import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./screens/Login.tsx";
import Signup from "./screens/Signup.tsx";
import AuthLayout from "./components/layout/AuthLayout.tsx";
import "./App.css";

import AppLayout from "./components/layout/Layout.tsx";
import Home from "./screens/Home.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />}></Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
