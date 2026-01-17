import { useEffect, useState } from "react";
import { getMenu } from "../services/api";

export default function Header() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    getMenu().then(data => setMenu(data));
  }, []);

  return (
    <nav className="navbar sticky-top m-0 p-0">
      <div className="container-fluid bg-warning bg-opacity d-flex justify-content-around align-items-center py-2">
        <a href="/dashboard_user" className="navbar-brand fw-bold">Bếp việt 4.0</a>
        <a href="/recipes" className="navbar-brand fw-bold">Ẩm thực</a>
        <a href="/dashboard_user" className="navbar-brand fw-bold"><i class="fa-solid fa-house"></i>Trang chủ</a>
        <a href="/blog" className="navbar-brand fw-bold">Blog</a>
        <a href="/" className="navbar-brand fw-bold">Món ăn</a>
        <a href="/cookbook" className="navbar-brand fw-bold">CookBook</a>
        {menu.map(item => (
          <a
            key={item.id}
            href={item.link}
            className="navbar-brand"
          >
            {item.name}
          </a>
        ))}

        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>

        <a href="/profile" className="navbar-brand">Profile</a>
      </div>
    </nav>
  );
}
