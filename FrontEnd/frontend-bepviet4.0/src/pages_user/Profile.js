import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileUser() {
  const [activeTab, setActiveTab] = useState("food");
  const navigate = useNavigate();

  // ===== DỮ LIỆU GIẢ =====
  const user = {
    name: "Admin",
    email: "admin@gmail.com",
    phone: "0909000001",
    avatar: "admin.png"
  };

  const foods = [
    {
      id: 1,
      name: "Phở bò Hà Nội",
      image: "https://via.placeholder.com/80",
      date: "01/01/2026"
    },
    {
      id: 2,
      name: "Bún chả",
      image: "https://via.placeholder.com/80",
      date: "02/01/2026"
    },
    {
      id: 3,
      name: "Bánh xèo",
      image: "https://via.placeholder.com/80",
      date: "03/01/2026"
    }
  ];

  const comments = [
    {
      id: 1,
      foodId: 1,
      foodName: "Phở bò Hà Nội",
      foodImage: "https://via.placeholder.com/80",
      content: "Món ăn rất ngon 👍",
      date: "10/01/2026"
    }
  ];

  const posts = [
    {
      id: 1,
      title: "Cách nấu phở bò",
      description: "Hướng dẫn chi tiết cách nấu phở bò.",
      image: "https://via.placeholder.com/100",
      date: "05/01/2026"
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="row">
      {/* ===== CỘT TRÁI ===== */}
      <div className="col-3 bg-light p-3 text-center">
        <img
          src={`/avatar/${user.avatar}`}
          alt="avatar"
          className="rounded-circle mb-3"
          width="120"
          height="120"
        />
        <p>{user.name}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>

        <button
          className="btn btn-warning w-100 mb-2"
          onClick={() => navigate("/profile/edit")}
        >
          Chỉnh sửa hồ sơ
        </button>

        <button
          className="btn btn-warning w-100 mb-2"
          onClick={() => navigate("/profile/changepassword")}
        >
          Đổi mật khẩu
        </button>

        <button
          className="btn btn-warning w-100"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>
      </div>

      {/* ===== CỘT PHẢI ===== */}
      <div className="col-9">
        {/* TAB */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "food" ? "active" : ""}`}
              onClick={() => setActiveTab("food")}
            >
              Món ăn đã đăng
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "comment" ? "active" : ""}`}
              onClick={() => setActiveTab("comment")}
            >
              Bình luận đã thực hiện
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "blog_post" ? "active" : ""}`}
              onClick={() => setActiveTab("blog_post")}
            >
              Bài viết đã chia sẻ
            </button>
          </li>
        </ul>

        {/* ===== TAB MÓN ĂN ===== */}
      {activeTab === "food" && (
          <div className="border rounded p-3">
            {foods.map(item => (
              <div className="card mb-3" key={item.id}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div className="d-flex">
                    <img
                      src={item.image}
                      alt={item.name}
                      width="80"
                      height="80"
                      className="rounded me-3"
                    />
                    <div>
                      <h5>{item.name}</h5>
                      <p className="text-muted">{item.date}</p>
                    </div>
                  </div>

                  <button
                    className="btn btn-warning"
                    onClick={() => navigate(`/mon-an/${item.id}`)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== TAB BÌNH LUẬN ===== */}
        {activeTab === "comment" && (
          <div className="border rounded p-3">
            {comments.map((cmt) => (
              <div className="card mb-3" key={cmt.id}>
                <div className="card-body d-flex justify-content-between">
                  <div className="d-flex">
                    <img
                      src={cmt.foodImage}
                      alt="food"
                      className="rounded me-3"
                      width="80"
                      height="80"
                    />
                    <div>
                      <h6>{cmt.foodName}</h6>
                      <p className="mb-1 text-muted">"{cmt.content}"</p>
                      <small>{cmt.date}</small>
                    </div>
                  </div>

                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => navigate(`/mon-an/${cmt.foodId}`)}
                  >
                    Xem món
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ===== TAB BÀI VIẾT ===== */}
        {activeTab === "blog_post" && (
          <div className="border rounded p-3">
            {posts.map((blog_post) => (
              <div className="card mb-3" key={blog_post.id}>
                <div className="card-body d-flex justify-content-between">
                  <div className="d-flex">
                    <img
                      src={blog_post.image}
                      alt="blog_post"
                      className="rounded me-3"
                      width="100"
                      height="100"
                    />
                    <div>
                      <h5>{blog_post.title}</h5>
                      <p className="text-muted">{blog_post.content}</p>
                      <small>{blog_post.date}</small>
                    </div>
                  </div>

                  <button
                     className="btn btn-outline-warning btn-sm"
                      onClick={() => navigate(`/bai-viet/${blog_post.id}`)}
                  >
                    Xem bài
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileUser;
