import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


function ProfileUser() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("food");
  const [user, setUser] = useState({});
  
  const [recipes, setRecipes] = useState([]);
  const [loadingRecipes, setLoadingRecipes] = useState(false);

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);

  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    fetch("http://localhost:8000/api/user/profile",{
      headers:{
        "Authorization":`Bearer ${token}`
      }
    }
    ).then((res)=>res.json())
    .then((result)=>{
      console.log(result.user);
      setUser(result.user);
    })
  }, []);


  useEffect(() => {
    if (!user) return;

    // Tab Món ăn
    if (activeTab === "food") {
      setLoadingRecipes(true);
      const token=localStorage.getItem("token");
      fetch("http://localhost:8000/api/user/recipes",{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }).then((res)=>res.json())
      .then((result)=>{
       console.log(result); 
      setRecipes(result.recipes);
      setLoadingRecipes(false);
      })
    }

    
  }, [activeTab, user]); 

  
   useEffect(() => {
    if (!user) return;

    // Tab binh luan
    if (activeTab === "comment") {
      setLoadingComments(true);
      const token=localStorage.getItem("token");
      fetch("http://localhost:8000/api/user/comment",{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }).then((res)=>res.json())
      .then((result)=>{
       console.log(result); 
      setComments(result.comments);
      setLoadingComments(false);
      })
    }

    
  }, [activeTab, user]); 


  //bai viet
  useEffect(() => {
    if (!user) return;

    if (activeTab === "blog") {
      setLoadingPosts(true);
      const token=localStorage.getItem("token");
      fetch("http://localhost:8000/api/user/post",{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      }).then((res)=>res.json())
      .then((result)=>{
       console.log(result); 
      setPosts(result.posts);
      setLoadingPosts(false);
      })
    }

    
  }, [activeTab, user]); 

  const handleLogout = () => {
    localStorage.clear(); 
    navigate("/login", { replace: true });
  };

  return (
    <div className="row m-0">
      {/* CỘT TRÁI */}
      <div className="col-3 bg-light p-3 text-center">
        <img
          src={user.avatar ? `http://127.0.0.1:8000/storage/${user.avatar}` : "/avatar/default.png"}
          alt="avatar"
          className="rounded-circle mb-3 border"
          width="120" height="120"
          style={{ objectFit: 'cover' }}
          onError={(e) => { e.target.onerror = null; e.target.src = "/avatar/default.png"; }}
        />
        <h5 className="fw-bold mb-1">{user.username}</h5>
        <p className="text-muted mb-1 small"><i className="bi bi-envelope me-1"></i>{user.email}</p>
        <p className="text-muted small"><i className="bi bi-telephone me-1"></i>{user.phone || "Chưa có SĐT"}</p>
        
        <button className="btn btn-warning w-100 mb-2" onClick={() => navigate("/profile/edit")}>Chỉnh sửa hồ sơ</button>
        <button className="btn btn-warning w-100 mb-2" onClick={() => navigate("/profile/changepassword")}>Đổi mật khẩu</button>
        <button className="btn btn-danger w-100" onClick={handleLogout}>Đăng xuất</button>
      </div>

      {/* CỘT PHẢI */}
      <div className="col-9 p-4">
        <ul className="nav nav-tabs mb-3">
          {["food", "comment", "blog"].map((tab) => (
            <li className="nav-item" key={tab}>
              <button
                className={`nav-link ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "food" && "Món ăn"}
                {tab === "comment" && "Bình luận"}
                {tab === "blog" && "Bài viết"}
              </button>
            </li>
          ))}
        </ul>

        <div className="border rounded p-3">
          {/* TAB FOOD */}
          {activeTab === "food" && (
            <div className="row">
              {loadingRecipes ? <p>Đang tải...</p> : recipes?.length > 0 ? (
                recipes.map(recipe => (
                  <div className="col-md-4 mb-3" key={recipe.id}>
                    <div className="card h-100">
                      <img src={`http://127.0.0.1:8000/storage/${recipe.thumbnail}`} className="card-img-top" height="150" style={{objectFit:'cover'}} alt={recipe.title} />
                      <div className="card-body">
                        <h6 className="card-title text-truncate">{recipe.title}</h6>
                        <button className="btn btn-sm btn-primary" onClick={() => navigate(`/recipes/${recipe.id}`)}>Xem</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : <p>Chưa có món ăn nào</p>}
            </div>
          )}

          {/* TAB COMMENT */}
          {activeTab === "comment" && (
            <div>
              {loadingComments ? <p>Đang tải...</p> : comments?.length > 0 ? (
                comments.map(c => (
                  <div className="card p-3 mb-2 bg-light border-0" key={c.id}>
                    <strong>{c.recipe_title}</strong>
                    <p className="mb-0">{c.content}</p>
                  </div>
                ))
              ) : <p>Chưa có bình luận nào</p>}
            </div>
          )}

          {/* TAB BLOG */}
         {activeTab === "blog" && (
              <div>
                {loadingPosts ? <p>Đang tải...</p> : (posts?.length > 0 ? posts.map(p => (
                  <div className="card p-3 mb-2 shadow-sm" key={p.id}>
                    <h6 className="fw-bold">{p.title}</h6>
                    <p className="small text-muted">{p.content?.substring(0, 100)}...</p>
                    <button className="btn btn-sm btn-link p-0" onClick={() => navigate(`/posts/${p.id}`)}>Xem chi tiết</button>
                  </div>
                )) : <p>Chưa có bài viết nào.</p>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;