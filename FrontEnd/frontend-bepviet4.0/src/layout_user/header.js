import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getMenu, getRecipeSuggest } from "../services/api";

export default function Header() {
  const [menu, setMenu] = useState([]);
  const [user, setUser] = useState(null);

  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);

  const navigate = useNavigate();

  // LOAD MENU + USER
  useEffect(() => {
    getMenu().then(data => setMenu(data));

    const token = localStorage.getItem("token");
    const localUser = localStorage.getItem("user");

    if (!token || !localUser) return;

    try {
      const parsedUser = JSON.parse(localUser);
      if (parsedUser?.id) setUser(parsedUser);
    } catch {}
  }, []);

  // AUTOCOMPLETE
  useEffect(() => {
    if (!keyword.trim()) {
      setSuggestions([]);
      setShowSuggest(false);
      return;
    }

    const timer = setTimeout(() => {
      getRecipeSuggest(keyword)
        .then(data => {
          const list = data?.data ?? data;
          setSuggestions(Array.isArray(list) ? list : []);
          setShowSuggest(true);
        })
        .catch(err => console.error(err));
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    navigate(`/recipes?search=${encodeURIComponent(keyword.trim())}`);
    setKeyword("");
    setShowSuggest(false);
  };

  const navClass = ({ isActive }) =>
    `btn fw-bold mx-1 ${
      isActive
        ? "btn-secondary text-white"
        : "btn-outline-secondary text-dark"
    }`;

  return (
    <nav
      className="navbar sticky-top bg-warning py-2"
      style={{ overflow: "visible" }}   // 🔥 FIX dropdown
    >
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

          <NavLink to="/recipes" className={navClass}>Ẩm thực</NavLink>
          <NavLink to="/blog" className={navClass}>Blog</NavLink>
          <NavLink to="/cookbook" className={navClass}>CookBook</NavLink>
          <NavLink to="/blog/add" className={navClass}>Tạo blog</NavLink>
          <NavLink to="/create_recipes" className={navClass}>Tạo công thức</NavLink>

          {menu.map(item => (
            <NavLink key={item.id} to={item.link} className={navClass}>
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* SEARCH */}
        <form
          className="d-flex position-relative"
          onSubmit={handleSearch}
          style={{ minWidth: 250 }}
        >
          <input
            className="form-control me-2"
            placeholder="Tìm món ăn..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onFocus={() => keyword && setShowSuggest(true)}
            autoComplete="off"
          />
          <button className="btn btn-outline-dark">Tìm</button>

          {showSuggest && suggestions.length > 0 && (
            <ul
              className="list-group position-absolute w-100 bg-white shadow"
              style={{
                top: "100%",
                zIndex: 1050,     // 🔥 CAO HƠN NAVBAR
                maxHeight: "250px",
                overflowY: "auto"
              }}
            >
              {suggestions.map(item => (
                <li
                  key={item.id}
                  className="list-group-item list-group-item-action"
                  onMouseDown={() => {
                    navigate(`/recipes/${item.id}`);
                    setKeyword("");
                    setShowSuggest(false);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
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
