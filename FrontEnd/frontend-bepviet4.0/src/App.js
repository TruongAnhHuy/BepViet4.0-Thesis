import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// 1. Import Layout
import UserLayout from "./layout_user/UserLayout";
import AdminLayout from "./layout_admin/AdminLayout"; // <--- MỚI THÊM

// 2. Import các trang User
import Home from "./pages_user/Home";
import Blog from "./pages_user/Blog";
import Recipe from "./pages_user/Recipe";
import RecipeDetail from "./pages_user/Chitietmonan";
import Login from "./pages_user/Login";
import Register from "./pages_user/Register";
import CookBook from "./pages_user/CookBook";
import ProfileUser from "./pages_user/Profile";
import EditProfile from "./pages_user/EditProfile";
import Faq from "./pages_user/Hoidap";
import Lienhe from "./pages_user/Contact";
import Policy from "./pages_user/Policy";
import Terms from "./pages_user/Terms";


// 3. Import các trang Admin
import PostManagement from "./layout_admin/PostManagement"; 
import QuanLyToCao from './pages_admin/QuanLyUserReport';
import QuanLyUser from './pages_admin/QuanLyUser';
import QuanLyHeThong from './pages_admin/QuanLyHeThong'; 
import Dashboard from './pages_admin/Dashboard';
import RecipeManagement from "./pages_admin/QuanLyCongThuc";
import ChangePassword from "./pages_user/ChangePassword";

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

        <Route path="/contact" element={
            <UserLayout> <Lienhe /> </UserLayout>
        } />

        <Route path="/policy" element={
            <UserLayout> <Policy /> </UserLayout>
        } /> 
        
        <Route path="/terms" element={
            <UserLayout> <Terms /> </UserLayout>
        } />

        <Route path="/recipes/:id" element={
           <UserLayout> <RecipeDetail /> </UserLayout> 
        } />

        <Route path="/blog" element={
            <UserLayout> <Blog /> </UserLayout>
        } />

        

        <Route path="/login" element={<Login />} />
        
        <Route path="/register" element={<Register />} />

        <Route path="/cookbook" element={
            <UserLayout> <CookBook /> </UserLayout>
        } />
        <Route path="/faq" element={
            <UserLayout> <Faq /> </UserLayout>
        } />
        <Route path="/profile" element={
           <UserLayout> <ProfileUser /> </UserLayout>
        } />
        <Route path="/profile/edit" element={
           <UserLayout> <EditProfile /> </UserLayout> 
        } />
        <Route path="/profile/changepassword" element={
           <UserLayout> <ChangePassword /> </UserLayout> 
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