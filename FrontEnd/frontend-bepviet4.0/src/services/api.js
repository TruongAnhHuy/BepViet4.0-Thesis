import axiosClient from "../api/axiosClient";

const API_URL = "http://127.0.0.1:8000/api";

// ================= MENU – SLIDE – PRODUCT =================
export const getMenu = () =>
  fetch(`${API_URL}/menu`).then(res => res.json());

export const getSlides = () =>
  fetch(`${API_URL}/slide`).then(res => res.json());

export const getProducts = () =>
  fetch(`${API_URL}/products`).then(res => res.json());

// ================= BLOG =================
export async function getBlogs() {
  const res = await fetch(`${API_URL}/blogs`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

// ================= RECIPE =================
export const getRecipes = () => {
  return axiosClient.get("/recipes");
};

export const getRecipeById = (id) => {
  return axiosClient.get(`/recipes/${id}`);
};

export const updateRecipeStatus = async (id, newStatus) => {
  const statusValue = newStatus === "Đã duyệt" ? 1 : 0;

  const res = await fetch(`${API_URL}/recipes/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: statusValue }),
  });

  return res.json();
};

// ================= USER =================
export const getUsers = () => {
  return axiosClient.get("/users");
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Chưa đăng nhập");

  const res = await fetch(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
};

// ================= FAQ – HỎI ĐÁP =================
export const getFaqs = async () => {
  const res = await fetch(`${API_URL}/faqs`);
  if (!res.ok) throw new Error("Failed to fetch faqs");
  return res.json();
};

export const createFaq = async (data) => {
  const res = await fetch(`${API_URL}/faqs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create faq");
  return res.json();
};
