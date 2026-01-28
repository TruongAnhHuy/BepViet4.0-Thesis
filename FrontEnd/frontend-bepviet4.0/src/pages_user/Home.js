import { useEffect, useState } from "react";
import Slide from "../layout_user/slide";
import { getRecipes } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes()
      .then((res) => {
        const data = Array.isArray(res)
          ? res
          : Array.isArray(res?.data)
          ? res.data
          : [];

        const approvedRecipes = data.filter(
          (item) => item.status === 1
        );

        setPopularRecipes(approvedRecipes.slice(0,12));
        setLoading(false);
      })
      .catch(() => {
        setPopularRecipes([]);
        setLoading(false);
      });
  }, []);

  // KHÔNG GHÉP BASE URL NỮA
  const getImageUrl = (path) => {
    if (!path) return "https://via.placeholder.com/300";
    return path; // API đã trả URL đầy đủ
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h3>Đang tải dữ liệu...</h3>
      </div>
    );
  }

  return (
    <div>
      <Slide />

      <div className="container mt-5">
        <h3 className="fw-bold mb-4">Món ăn phổ biến</h3>

        <div className="row">
          {popularRecipes.map((recipe) => (
            <div className="col-md-3 mb-4" key={recipe.id}>
              <div className="card h-100 shadow-sm position-relative">
                <img
                  src={getImageUrl(recipe.image_path)}
                  className="card-img-top"
                  alt={recipe.title}
                  style={{ height: "180px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h6 className="fw-bold">{recipe.title}</h6>
                  <p className="text-muted small">
                    ⏱ {recipe.cooking_time} phút
                  </p>
                </div>

                <div className="position-absolute bottom-0 end-0 m-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => navigate(`/recipes/${recipe.id}`)}
                  >
                    Xem chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
