import axiosClient from "../api/axiosClient";
const API_URL = "http://localhost:8000/api";

export const getMenu = () =>
  fetch(`${API_URL}/menu`).then(res => res.json());

export const getSlides = () =>
  fetch(`${API_URL}/slide`).then(res => res.json());

export const getProducts = () =>
  fetch(`${API_URL}/products`).then(res => res.json());




export async function getBlogs() {
  const res = await fetch(`${API_URL}/blogs`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

// 1. Lấy danh sách món ăn
export const getRecipes = () => {
    return axiosClient.get('/recipes'); 
};

// 2. Lấy chi tiết 1 món ăn
export const getRecipeById = (id) => {
    return axiosClient.get(`/recipes/${id}`);
};

// 3. (Ví dụ thêm) Lấy danh sách User
export const getUsers = () => {
    return axiosClient.get('/users');
};
export const updateRecipeStatus = async (id, newStatus) => {
    // Chuyển đổi text tiếng Việt sang giá trị Database hiểu (nếu cần)
    // Ví dụ: Backend cần số 1 hoặc 0
    const statusValue = newStatus === "Đã duyệt" ? 1 : 0; 

    // Gọi API (Đường dẫn này phải khớp với route Laravel của bạn)
    const response = await fetch(`http://127.0.0.1:8000/api/recipes/${id}/status`, {
        method: 'PUT', // Hoặc POST tùy backend
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ...' // Nếu có token
        },
        body: JSON.stringify({ status: statusValue })
    });

    return response.json();
};