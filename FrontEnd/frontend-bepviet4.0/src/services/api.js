import axiosClient from "../api/axiosClient";

const API_URL = "http://127.0.0.1:8000/api";

// ================= CẤU HÌNH INTERCEPTOR (Token) =================
// Tự động thêm token vào header cho mọi request dùng axiosClient
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
  const statusValue = newStatus === "Chờ duyệt" ? 0 : 1;

  const res = await fetch(`${API_URL}/recipes/${id}/status`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: statusValue }),
  });

  return res.json();
};

// ================= USER & PROFILE =================
export const getUsers = () => {
  return axiosClient.get("/users");
};

// Dùng axiosClient để tự động gắn token, không cần fetch thủ công
export const getProfile = () => axiosClient.get("/user/profile");

// Các hàm lấy dữ liệu cá nhân
export const getMyRecipes = () => axiosClient.get("/user/recipes");
export const getMyComments = () => axiosClient.get("/user/comments");
export const getMyPosts = () => axiosClient.get("/user/posts");

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

// ================= POSTS =================
// Lấy ds bài viết
export const getPosts = () => {
    return axiosClient.get('/posts');
};

export const updatePostStatus = (id, statusValue) => {
    // axiosClient.put sẽ tự trả về Promise
    return axiosClient.put(`/posts/${id}/status`, { 
        status: statusValue 
    });
};

export const getRecipeSuggest = async (keyword) => {
  const res = await fetch(
    `http://127.0.0.1:8000/api/recipes/suggest?keyword=${encodeURIComponent(keyword)}`
  );

  if (!res.ok) {
    console.error("Suggest API error");
    return [];
  }

  return res.json(); 
};