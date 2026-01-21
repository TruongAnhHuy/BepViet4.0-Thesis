const API_URL = "http://localhost:8000/api";

export const getMenu = () =>
  fetch(`${API_URL}/menu`).then(res => res.json());

export const getSlides = () =>
  fetch(`${API_URL}/slide`).then(res => res.json());

export const getProducts = () =>
  fetch(`${API_URL}/products`).then(res => res.json());


export const getRecipes = () =>
  fetch(`${API_URL}/recipes`).then(res => res.json());

export const getCookBook = () =>
  fetch(`${API_URL}/cookbook`).then(res => res.json());

export const getBlog = () =>
  fetch(`${API_URL}/blog`).then(res => res.json());

export async function getBlogs() {
  const res = await fetch(`${API_URL}/blogs`);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

//lấy ds bài viết
export const getPosts = () => {
    return axiosClient.get('/posts');
};

// export const updatePostStatus = (id, status) => {
//     // Gửi body là { status: 1 } hoặc { status: 0 }
//     return axiosClient.put(`/posts/${id}/status`, { status: status });
// };

export const updatePostStatus = async (id, newStatus) => {  //cập nhật trạng thái bài viết
    // Ví dụ: Backend cần số 1 hoặc 0
    const statusValue = newStatus === "Chờ duyệt" ? 1 : 0; 

    // Gọi API (Đường dẫn này phải khớp với route Laravel của bạn)
    const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}/status`, {
        method: 'PUT', // Hoặc POST tùy backend
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': 'Bearer ...' // Nếu có token
        },
        body: JSON.stringify({ status: statusValue })
    });

    return response.json();
};
