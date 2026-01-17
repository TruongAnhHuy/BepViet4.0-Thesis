import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// 1. Import Layout
import UserLayout from "./layout_user/UserLayout";
import AdminLayout from "./layout_admin/AdminLayout"; // <--- MỚI THÊM

// 2. Import các trang User
import Home from "./pages_user/Home";
import Blog from "./pages_user/Blog";
import Recipe from "./pages_user/Recipe";

// 3. Import các trang Admin
import PostManagement from "./layout_admin/PostManagement"; 
import QuanLyToCao from './pages_admin/QuanLyUserReport';
import QuanLyUser from './pages_admin/QuanLyUser';
import QuanLyHeThong from './pages_admin/QuanLyHeThong'; 
import Dashboard from './pages_admin/Dashboard';
import RecipeManagement from "./pages_admin/QuanLyCongThuc";
import RecipeDetail from "./pages_user/Chitietmonan";

function App() {
  return (
    <Router>
      <Routes>
        
        {/* --- NHÓM 1: TRANG NGƯỜI DÙNG (Dùng UserLayout) --- */}
        <Route path="/dashboard_user" element={
            <UserLayout> <Home /> </UserLayout>
        } />
        
        <Route path="/recipes" element={
            <UserLayout> <Recipe /> </UserLayout>
        } />

        <Route path="/blog" element={
            <UserLayout> <Blog /> </UserLayout>
        } />

        <Route path="/detail" element={
            <UserLayout> <RecipeDetail /> </UserLayout>
        } />



        {/* --- NHÓM 2: TRANG ADMIN (Đã bọc AdminLayout) --- */}
        
        <Route path="/dashboard" element={
            <AdminLayout> <Dashboard /> </AdminLayout>
        } />

        <Route path="/recipes_admin" element={
            <AdminLayout> <RecipeManagement /> </AdminLayout>
        } />
        
        <Route path="/reports" element={
            <AdminLayout> <QuanLyToCao /> </AdminLayout>
        } />
        
        <Route path="/users" element={
            <AdminLayout> <QuanLyUser /> </AdminLayout>
        } />
        
        <Route path="/settings" element={
            <AdminLayout> <QuanLyHeThong /> </AdminLayout>
        } />
        <Route path="/posts" element={
            <AdminLayout> <PostManagement /> </AdminLayout>
        } />

      </Routes>
    </Router>
  );
}

export default App;