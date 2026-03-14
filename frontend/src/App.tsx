import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CreateUserPage from "./pages/CreateUserPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CreateUserPage />} />
          <Route path="add-points" element={<h2>ここはポイント加算画面（仮）です</h2>} />
          <Route path="get-user" element={<h2>ここはユーザー確認画面（仮）です</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}