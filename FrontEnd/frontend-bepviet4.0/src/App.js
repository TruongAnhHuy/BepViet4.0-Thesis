import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Slide from "./layout/slide";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile.js";
import ChangePassword from"./pages/ChangePassword.js";

import "./App.css";
import Recipe from "./pages/Recipe";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Slide />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/blog" element={<Blog />} />
        {/* //profile */}
        <Route path="/profile" element={<Profile />} />
        {/* //EditProfile */}
        <Route path="/profile/edit" element={<EditProfile />} />
        {/* //ChangePassword */}
        <Route path="/profile/changepassword" element={<ChangePassword />} />
        
       
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
