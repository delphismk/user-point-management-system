import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CreateUserPage from "./pages/CreateUserPage";
import AddPointsPage from "./pages/AddPointsPage";
import GetUserPage from "./pages/GetUserPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CreateUserPage />} />
          <Route path="add-points" element={<AddPointsPage />} />
          <Route path="get-user" element={<GetUserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}