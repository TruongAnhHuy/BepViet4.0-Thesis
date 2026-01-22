import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getMenu } from "../services/api";

export default function Header() {
  const [menu, setMenu] = useState([]);
  const [user, setUser] = useState(null);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // MENU
    getMenu().then(data => setMenu(data));

    // LOGIN CHECK
    const token = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");

    if (!token || !localUser) {
      setUser(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(localUser);
      parsedUser?.id ? setUser(parsedUser) : setUser(null);
    } catch {
      setUser(null);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    navigate(`/recipes?search=${keyword}`);
    setKeyword("");
  };

  // ✅ CLASS DÙNG CHO NAV (hover + active background)
  const navClass = ({ isActive }) =>
    `btn fw-bold mx-1 ${
      isActive
        ? "btn-secondary text-white"
        : "btn-outline-secondary text-dark"
    }`;

  return (
    <nav className="navbar sticky-top bg-warning py-2">
      <div className="container-fluid d-flex align-items-center justify-content-between">

        {/* LOGO */}
        <NavLink to="/dashboard_user" className="navbar-brand fw-bold">
          Bếp Việt 4.0
        </NavLink>

        {/* MENU */}
        <div>
          <NavLink to="/dashboard_user" className={navClass}>
            <i className="fa-solid fa-house"></i> Trang chủ
          </NavLink>

          <NavLink to="/recipes" className={navClass}>
            Ẩm thực
          </NavLink>

          <NavLink to="/blog" className={navClass}>
            Blog
          </NavLink>

          <NavLink to="/cookbook" className={navClass}>
            CookBook
          </NavLink>

          {menu.map(item => (
            <NavLink
              key={item.id}
              to={item.link}
              className={navClass}
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* SEARCH */}
        <form className="d-flex" onSubmit={handleSearch}>
          <input
            className="form-control me-2"
            placeholder="Tìm món ăn"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button className="btn btn-outline-dark">Tìm</button>
        </form>

        {/* LOGIN */}
        {!user ? (
          <NavLink to="/login" className="btn btn-outline-dark fw-bold">
            Đăng nhập
          </NavLink>
        ) : (
          <NavLink to="/profile" className="btn btn-outline-dark fw-bold">
            {user.name ?? "Profile"}
          </NavLink>
        )}

      </div>
    </nav>
  );
}
