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