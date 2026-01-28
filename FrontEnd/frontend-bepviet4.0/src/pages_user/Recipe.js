import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecipes } from "../services/api";

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BASE_IMAGE_URL = "http://127.0.0.1:8000/storage/";

  useEffect(() => {
    getRecipes()
      .then(data => {
        setRecipes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("API lỗi:", err);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/300";
    if (path.startsWith('http')) return path; 
    return `${BASE_IMAGE_URL}${path}`;
  };

 
  const handleToDetail = (recipe) => {
  
    navigate(`/recipes/${recipe.id}`, { state: recipe });
  };

  if (loading) {
      return <div className="text-center mt-5"><h3>Đang tải danh sách món ăn...</h3></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center fw-bold">Danh sách món ăn</h2>
      {recipes.length === 0 ? (
          <div className="text-center text-muted">Chưa có món ăn nào được đăng.</div>
      ) : (
          <div className="row">
            {recipes.map(recipe => (
              <div className="col-md-4 mb-4" key={recipe.id}> 
                <div 
                  className="card h-100 shadow-sm border-0" 
                  // --- [QUAN TRỌNG] Truyền nguyên recipe vào hàm ---
                  onClick={() => handleToDetail(recipe)} 
                  style={{ cursor: "pointer", transition: "transform 0.2s" }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <div style={{ height: "250px", overflow: "hidden" }}>
                      <img
                        src={getImageUrl(recipe.image_path)}
                        className="card-img-top"
                        alt={recipe.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      /> 
                  </div>
                  <div className="card-body">
                    <h5 className="card-title fw-bold text-dark">{recipe.title}</h5>
                    <p className="card-text text-muted" style={{display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden"}}>
                        {recipe.description}
                    </p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="text-warning fw-bold">
                            <i className="bi bi-clock-fill"></i> {recipe.cooking_time} phút
                        </span>
                        <button className="btn btn-sm btn-outline-warning">Xem ngay</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
      )}
    </div>
  );
}