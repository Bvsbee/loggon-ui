import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./screens/Login.tsx";
import Test from "./screens/Test.tsx";
import Signup from "./screens/Signup.tsx";
import Layout from "./components/layout/layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}><Route path="/" element={<App />}></Route></Route>
        
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
