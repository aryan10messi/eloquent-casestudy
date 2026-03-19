import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import UserDetail from "./pages/UserDetail";

export default function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </Layout>
      </DataProvider>
    </BrowserRouter>
  );
}
