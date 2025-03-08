import { BrowserRouter, Route, Routes } from "react-router";
import AdminHome from "./AdminHome";
import AdminLayout from "./layout/AdminLayout";

const AdminRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminHome />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRouter;
