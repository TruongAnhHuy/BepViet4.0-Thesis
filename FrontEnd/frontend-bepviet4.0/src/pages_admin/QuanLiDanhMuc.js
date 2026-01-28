import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

function QuanLyDanhMuc() {
  const [categories, setCategories] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);



  const filteredCategories = categories.filter(item =>
    item.category_name.toLowerCase().includes(keyword.toLowerCase())
  );

  // Xóa danh mục
  const handleDelete = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;

    fetch(`http://127.0.0.1:8000/api/categories/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        setCategories(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header fw-bold">
          Danh sách danh mục
        </div>

        <div className="card-body">
          {/* Tìm kiếm + Thêm mới */}
          <div className="d-flex justify-content-between mb-3">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Tìm theo tên danh mục..."
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />

            <Link
              to="/admin-category/add-category"
              className="btn btn-success"
            >
              + Thêm mới danh mục
            </Link>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center text-muted py-3">
              Đang tải dữ liệu...
            </div>
          )}

          {/* Bảng */}
          {!loading && (
            <table className="table table-bordered table-hover text-center align-middle">
              <thead className="table-light">
                <tr>
                  <th>STT</th>
                  <th>Mã</th>
                  <th>Tên danh mục</th>
                  <th>Loại</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.category_code}</td>
                    <td>{item.category_name}</td>
                    <td>{item.category_type}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Link
                          to={`/admin-category/edit/${item.id}`}
                          className="btn btn-warning btn-sm"
                        >
                          <FaEdit />
                        </Link>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredCategories.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-muted">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuanLyDanhMuc;
