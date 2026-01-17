import { useEffect, useState } from "react";
import { getRecipes } from "../services/api";

export default function Recipe() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes()
      .then(data => setRecipes(data))
      .catch(err => console.error("API lỗi:", err));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Danh sách món ăn</h2>

      <div className="row">
        {recipes.map(recipe => (
          <div className="col-md-4 mb-3" key={recipe.recipe_id}>
            <div className="card h-100">
              <img
                src={`http://127.0.0.1:8000/storage/${recipe.image_path}`}
                className="card-img-top"
                alt={recipe.title}
              /> 
              <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.description}</p>
                <p>⏱ {recipe.cooking_time} phút</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
