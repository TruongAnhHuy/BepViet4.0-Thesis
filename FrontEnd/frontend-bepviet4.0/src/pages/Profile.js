//khai bao
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function ProfileUser() {
  //khai bao bien
  const [activeTab,setActiveTab]=useState("food");
  //du lieu gia tesst thu vânc looix 
  const user = { name: "Admin", email: "admin@gmail.com", phone: "0909000001", avatar: "admin.png" };
//du lieu gia
const comment = [
  {
    id: 1,
    foodName: "Phở bò Hà Nội",
    foodImage: "https://via.placeholder.com/80",
    content: "Món ăn rất ngon, nước dùng đậm đà 👍",
    date: "10/01/2026"
  },
  {
    id: 2,
    foodName: "Bún chả",
    foodImage: "https://via.placeholder.com/80",
    content: "Ăn ổn, nhưng hơi ít thịt",
    date: "08/01/2026"
  }
];
//du lieu gia cho bai viet
const posts = [
  {
    id: 1,
    title: "Cách nấu phở bò chuẩn vị Hà Nội",
    description: "Hướng dẫn chi tiết cách nấu phở bò thơm ngon tại nhà.",
    image: "https://via.placeholder.com/100",
    date: "05/01/2026"
  },
  {
    id: 2,
    title: "Bí quyết làm nước mắm bún chả",
    description: "Công thức pha nước mắm bún chả đậm đà, dễ làm.",
    image: "https://via.placeholder.com/100",
    date: "02/01/2026"
  }
];
const navigate =useNavigate();
//dang xuat
const handleLogout = () => {
  //xoa trang thai dang nhap
  localStorage.clear();
  //dieu huong ve trang dang nhap(moi lafm test thu thoi)
  navigate("/login", {replace :true});
};
  return (
    <div className="row">
    <div className="col-3 bg-light p-3 text-center">

      {/* ẢNH AVATAR */}
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
      onClick={() =>navigate("/profile/edit")} >
        Chinh sua ho so 
      </button>
{/* //doi mk */}
      <button
        className="btn btn-warning w-100 mb-2"
        onClick={() => navigate("/profile/changepassword")}
      >
        Đổi mật khẩu
      </button>
{/* //dang xuat */}
        <button className="btn btn-warning w-100 mb-2"
        onClick={handleLogout}
        >Đăng xuất</button>
    </div>

      {/* Cột phải */}
      <div className="col-9">
        
        {/* //Tab 3  */}
        <ul className="nav nav-tabs mb-3">
          <li className="nav-item">
            <button 
           className={`nav-link ${activeTab === "food" ? "active" : ""}`}
            onClick={() =>setActiveTab("food")}>
              Mon An Da Dang
            </button>
          </li>
          <li className="nav-item">
            <button
            className={`nav-link ${activeTab ==="comment" ? "active" :""}`}
            onClick={() =>setActiveTab("comment")}>
              Binh Luan Da Thuc Hien
            </button>
          </li>
          <li className="nav-item">
          <button
          className={`nav-link ${activeTab === "post" ? "active" : ""}`}
          onClick={() =>setActiveTab("post")}>
            Bai Viet Da Chia Se
        </button>
          </li>
        </ul>

        {activeTab === "food" && (
          //khung mon an da dang chung
  <div className="border rounded p-3">
       <div className="card mb-3">
  <div className="card-body d-flex align-items-center justify-content-between">
    <div className="d-flex align-items-center">
         {/* //anh */}
      <img
        src="https://via.placeholder.com/80"
        alt="mon an"
        className="rounded me-3"
        width="80"
        height="80"
      />
      {/* //ten+date */}
      <div>
        <h5 className="mb-1">Tên món</h5>
        <p className="mb-0 text-muted">Ngày đăng</p>
      </div>
    </div>

{/* //nut xem chi tiet */}
    <button className="btn btn-warning">
      Xem chi tiết
    </button>
  </div>
</div>
{/* //muc 2 */}
       <div className="card mb-3">
  <div className="card-body d-flex align-items-center justify-content-between">
    
    {/* Bên trái: ảnh + thông tin */}
    <div className="d-flex align-items-center">
      <img
        src="https://via.placeholder.com/80"
        alt="mon an"
        className="rounded me-3"
        width="80"
        height="80"
      />

      <div>
        <h5 className="mb-1">Tên món</h5>
        <p className="mb-0 text-muted">Ngày đăng</p>
      </div>
    </div>

    {/* Bên phải: nút */}
    <button className="btn btn-warning">
      Xem chi tiết
    </button>
  </div>
</div>

        <div className="card mb-3">
  <div className="card-body d-flex align-items-center justify-content-between">
    
    {/* Bên trái: ảnh + thông tin */}
    <div className="d-flex align-items-center">
      <img
        src="https://via.placeholder.com/80"
        alt="mon an"
        className="rounded me-3"
        width="80"
        height="80"
      />

      <div>
        <h5 className="mb-1">Tên món</h5>
        <p className="mb-0 text-muted">Ngày đăng</p>
      </div>
    </div>

    {/* Bên phải: nút */}
    <button className="btn btn-warning">
      Xem chi tiết
    </button>
  </div>
</div>
</div>
    )}
    {/* //khung binh luan da thuc hien */}
    {activeTab === "comment" && (
  <div className="border rounded p-3">
    {comment.map((cmt) => (
      <div className="card mb-3" key={cmt.id}>
        <div className="card-body d-flex align-items-start justify-content-between">

          {/* Bên trái */}
          <div className="d-flex">
            <img
              src={cmt.foodImage}
              alt="food"
              className="rounded me-3"
              width="80"
              height="80"
            />

            <div>
              <h6 className="mb-1">{cmt.foodName}</h6>
              <p className="mb-1 text-muted">
                “{cmt.content}”
              </p>
              <small className="text-secondary">
                {cmt.date}
              </small>
            </div>
          </div>

          {/* Bên phải */}
          <button className="btn btn-outline-warning btn-sm">
            Xem món
          </button>

        </div>
      </div>
    ))}
  </div>
)}
{/* //bai viet da chia se (thu) */}
{activeTab === "post" && (
  <div className="border rounded p-3">
    {posts.map((post) => (
      <div className="card mb-3" key={post.id}>
        <div className="card-body d-flex align-items-start justify-content-between">

          {/* Bên trái: ảnh + nội dung */}
          <div className="d-flex">
            <img
              src={post.image}
              alt="post"
              className="rounded me-3"
              width="100"
              height="100"
            />

            <div>
              <h5 className="mb-1">{post.title}</h5>
              <p className="mb-1 text-muted">
                {post.description}
              </p>
              <small className="text-secondary">
                Ngày đăng: {post.date}
              </small>
            </div>
          </div>

          {/* Bên phải: nút */}
          <div className="text-end">
            <button className="btn btn-outline-warning btn-sm mb-2">
              Xem bài
            </button>
            <br />
            <button className="btn btn-outline-secondary btn-sm">
              Chỉnh sửa
            </button>
          </div>

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
