import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Slide from "./layout/slide";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Recipe from "./pages/Recipe";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile.js";
import ChangePassword from"./pages/ChangePassword.js";
import FoodDetail from "./pages/FoodDetail.js";
import PostDetail from "./pages/PostDetail.js";
import "./App.css";


function App() {
  return (
    <BrowserRouter>
<Header />

<Routes>
  <Route
    path="/"
    element={
      <>
        <Slide />
        <Home />
      </>
    }
  />

  <Route path="/recipes" element={<Recipe />} />
  <Route path="/blog" element={<Blog />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/profile/edit" element={<EditProfile />} />
  <Route path="/profile/changepassword" element={<ChangePassword />} />
  <Route path="/mon-an/:id" element={<FoodDetail />} />
  <Route path="/bai-viet/:id" element={<PostDetail />} />
</Routes>

<Footer />

    </BrowserRouter>
  );
}

export default App;
