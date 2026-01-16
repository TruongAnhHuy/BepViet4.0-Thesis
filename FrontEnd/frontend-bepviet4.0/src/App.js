import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layout/header";
import Footer from "./layout/footer";
import Slide from "./layout/slide";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import "./App.css";
import Recipe from "./pages/Recipe";

function App() {
  return (
    <Router>
      <Header />
      <Slide />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/blog" element={<Blog />} />
       
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
