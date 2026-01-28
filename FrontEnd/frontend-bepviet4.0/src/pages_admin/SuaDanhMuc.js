import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function SuaDanhMuc() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category_code: "",
    category_name: "",
    category_type: ""
  });

  // 🔹 Load dữ liệu cũ
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/categories/${id}`)
      .then(res => res.json())
      .then(data => setForm(data))
      .catch(err => console.error(err));
  }, [id]);

  // 🔹 Submit cập nhật
  const handleUpdate = () => {
    fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        alert("Cập nhật thành công");
        navigate("/admin-category");
      })
      .catch(err => console.error(err));
  };

  // 🔹 JSX PHẢI NẰM TRONG return
  return (
    <div className="container">
      <h3>Sửa danh mục</h3>

      <input
        className="form-control mb-2"
        placeholder="Mã danh mục"
        value={form.category_code}
        onChange={e =>
          setForm({ ...form, category_code: e.target.value })
        }
      />

      <input
        className="form-control mb-2"
        placeholder="Tên danh mục"
        value={form.category_name}
        onChange={e =>
          setForm({ ...form, category_name: e.target.value })
        }
      />

      <select
        className="form-control mb-3"
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

      <button className="btn btn-primary" onClick={handleUpdate}>
        Lưu thay đổi
      </button>
    </div>
  );
}

export default SuaDanhMuc;
