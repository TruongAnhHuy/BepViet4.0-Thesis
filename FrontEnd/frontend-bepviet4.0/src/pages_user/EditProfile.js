
function EditProfile() {
  return (
    <div className="container mt-4">
      <h3>Chỉnh sửa hồ sơ</h3>

      <form>
        <div className="mb-3">
          <label>Tên</label>
          <input className="form-control" />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input className="form-control" disabled />
        </div>

        <div className="mb-3">
          <label>Số điện thoại</label>
          <input className="form-control" />
        </div>

        <button className="btn btn-success me-2">Lưu</button>
        <button className="btn btn-secondary">Hủy</button>
      </form>
    </div>
  );
}

export default EditProfile;
