export default function Policy() {
  return (
    <div className="container my-5">
      <h1 className="text-center fw-bold mb-5">
        Chính sách & Điều khoản sử dụng
      </h1>

      {/* ================= PRIVACY POLICY ================= */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="fw-bold mb-3">🔐 Chính sách bảo mật</h4>

          <p>
            Bếp Việt 4.0 cam kết bảo vệ quyền riêng tư và thông tin cá nhân của
            người dùng khi truy cập và sử dụng nền tảng.
          </p>

          <h6 className="fw-bold mt-3">1. Thông tin thu thập</h6>
          <ul>
            <li>Họ tên, email, số điện thoại khi đăng ký tài khoản</li>
            <li>Nội dung công thức, bình luận do người dùng đăng tải</li>
            <li>Dữ liệu truy cập như IP, trình duyệt, thiết bị</li>
          </ul>

          <h6 className="fw-bold mt-3">2. Mục đích sử dụng</h6>
          <ul>
            <li>Cung cấp và cải thiện dịch vụ</li>
            <li>Quản lý tài khoản người dùng</li>
            <li>Ngăn chặn hành vi gian lận, spam</li>
          </ul>

          <h6 className="fw-bold mt-3">3. Bảo mật thông tin</h6>
          <p>
            Thông tin người dùng được lưu trữ an toàn và không chia sẻ cho bên
            thứ ba khi chưa có sự đồng ý, trừ trường hợp theo yêu cầu pháp luật.
          </p>
        </div>
      </div>

      {/* ================= TERMS ================= */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="fw-bold mb-3">📜 Điều khoản sử dụng</h4>

          <h6 className="fw-bold">1. Quyền và nghĩa vụ người dùng</h6>
          <ul>
            <li>Cung cấp thông tin chính xác khi đăng ký</li>
            <li>Chịu trách nhiệm với nội dung đăng tải</li>
            <li>Không sử dụng hệ thống cho mục đích trái pháp luật</li>
          </ul>

          <h6 className="fw-bold mt-3">2. Nội dung bị cấm</h6>
          <ul>
            <li>Nội dung phản cảm, kích động bạo lực</li>
            <li>Sao chép công thức vi phạm bản quyền</li>
            <li>Quảng cáo, spam trái phép</li>
          </ul>

          <h6 className="fw-bold mt-3">3. Quyền của hệ thống</h6>
          <p>
            Bếp Việt 4.0 có quyền chỉnh sửa, ẩn hoặc xóa nội dung vi phạm mà không
            cần thông báo trước.
          </p>
        </div>
      </div>

      {/* ================= COMMUNITY ================= */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="fw-bold mb-3">👥 Quy định cộng đồng</h4>

          <ul>
            <li>Tôn trọng thành viên khác</li>
            <li>Không công kích cá nhân</li>
            <li>Không chia sẻ thông tin sai lệch</li>
            <li>Khuyến khích chia sẻ công thức lành mạnh</li>
          </ul>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="fw-bold mb-3">© Bản quyền nội dung</h4>
          <p>
            Toàn bộ nội dung trên Bếp Việt 4.0 thuộc quyền sở hữu của người đăng
            hoặc hệ thống. Việc sao chép cần có sự cho phép rõ ràng.
          </p>
        </div>
      </div>

      {/* ================= UPDATE ================= */}
      <div className="alert alert-warning">
        <strong>Cập nhật chính sách:</strong> Nội dung chính sách có thể thay đổi
        theo thời gian. Người dùng nên kiểm tra định kỳ để nắm thông tin mới
        nhất.
      </div>
    </div>
  );
}
