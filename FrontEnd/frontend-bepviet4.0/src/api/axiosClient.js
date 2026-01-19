// src/services/axiosClient.js (hoặc src/api/axiosClient.js tùy cấu trúc bạn đặt)
import axios from 'axios';

const axiosClient = axios.create({
  // Ưu tiên lấy từ biến môi trường, nếu không có thì dùng link cứng (An toàn cho dev)
  baseURL: process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Tự động gửi cookie (quan trọng cho Sanctum)
});

// --- PHẦN 1: REQUEST INTERCEPTOR (Code bạn vừa thêm) ---
// Tác dụng: Tự động móc Token từ localStorage gửi đi mỗi khi gọi API
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- PHẦN 2: RESPONSE INTERCEPTOR (Code cũ - CỰC KỲ QUAN TRỌNG) ---
// Tác dụng: Bóc tách lớp vỏ "data" của axios để trả về dữ liệu thật.
// Nếu thiếu đoạn này, code ở Recipe.js sẽ báo lỗi recipe.map is not a function
axiosClient.interceptors.response.use(
  (response) => {
    // Nếu API trả về cục { data: [...] } thì chỉ lấy phần [...]
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Xử lý lỗi chung (VD: Log ra console)
    // console.error("Lỗi API:", error); 
    throw error;
  }
);

export default axiosClient;