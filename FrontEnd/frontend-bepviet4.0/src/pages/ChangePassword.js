import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ChangePassword() {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }

    // giả lập gọi API
    alert("Đổi mật khẩu thành công!");
    navigate("/profile");
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 500 }}>
      <h3 className="mb-4">Đổi mật khẩu</h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Mật khẩu hiện tại</label>
          <input
            type="password"
            className="form-control"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Xác nhận mật khẩu mới</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />
        </div>

        <button className="btn btn-success me-2">
          Lưu thay đổi
        </button>

        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/profile")}
        >
          Hủy
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
