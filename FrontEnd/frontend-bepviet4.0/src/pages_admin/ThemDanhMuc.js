import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function ThemDanhMuc() {
  const navigate = useNavigate();

  // state form
  const [form, setForm] = useState({
    category_code: "",
    category_name: "",
    category_type: "meal",
    is_active: true
  });

  // preview ảnh
  const [preview, setPreview] = useState(null);

  const handlePreviewImage = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  // submit
  const handleAdd = (e) => {
    e.preventDefault(); 

    fetch("http://127.0.0.1:8000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        alert("Thêm danh mục thành công");
        navigate("/admin-category"); // quay về trang quản lý
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          Thêm danh mục
        </div>

        <div className="card-body">
          <form onSubmit={handleAdd}>

            {/* Mã danh mục */}
            <div className="mb-3">
              <label className="form-label">Mã danh mục</label>
              <input
                type="text"
                className="form-control"
                value={form.category_code}
                onChange={e =>
                  setForm({ ...form, category_code: e.target.value })
                }
              />
            </div>

            {/* Tên danh mục */}
            <div className="mb-3">
              <label className="form-label">Tên danh mục</label>
              <input
                type="text"
                className="form-control"
                value={form.category_name}
                onChange={e =>
                  setForm({ ...form, category_name: e.target.value })
                }
              />
            </div>

            {/* Loại danh mục */}
            <div className="mb-3">
              <label className="form-label">Loại</label>
              <select
                className="form-select"
                value={form.category_type}
                onChange={e =>
                  setForm({ ...form, category_type: e.target.value })
                }
              >
                <option value="dish_type">Loại món ăn</option>
                <option value="meal">Bữa ăn</option>
                <option value="diet">Chế độ</option>
                <option value="ingredient">Nguyên liệu</option>
              </select>
            </div>

            {/* Hình ảnh */}
            <div className="mb-3">
              <label className="form-label">Hình ảnh</label>
              <input
                type="file"
                className="form-control"
                onChange={handlePreviewImage}
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 rounded"
                  style={{ width: 150, height: 150, objectFit: "cover" }}
                />
              )}
            </div>

            {/* Hiển thị */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={form.is_active}
                onChange={e =>
                  setForm({ ...form, is_active: e.target.checked })
                }
              />
              <label className="form-check-label">Hiển thị</label>
            </div>

            <button className="btn btn-success">
              <FaSave /> Lưu danh mục
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ThemDanhMuc;