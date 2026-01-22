export default function Terms() {
  return (
    <div className="container my-5">
      <h1 className="text-center fw-bold mb-5">
        Điều khoản sử dụng
      </h1>

      {/* GIỚI THIỆU */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <p>
            Khi truy cập và sử dụng website <strong>Bếp Việt 4.0</strong>, bạn
            đồng ý tuân thủ các điều khoản và điều kiện dưới đây. Nếu bạn không
            đồng ý với bất kỳ điều khoản nào, vui lòng ngừng sử dụng hệ thống.
          </p>
        </div>
      </div>

      {/* TÀI KHOẢN */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="fw-bold mb-3">1. Tài khoản người dùng</h4>
          <ul>
            <li>Người dùng phải cung cấp thông tin chính xác khi đăng ký</li>
            <li>Mỗi người chỉ được tạo một tài khoản</li>
            <li>Người dùng tự chịu trách nhiệm bảo mật tài khoản</li>
            <li>Bếp Việt 4.0 không chịu trách nhiệm nếu tài khoản bị lộ do người dùng</li>
          </ul>
        </div>
      </div>

      {/* QUYỀN & NGHĨA VỤ */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="fw-bold mb-3">2. Quyền và nghĩa vụ của người dùng</h4>
          <ul>
            <li>Được xem, tìm kiếm và lưu công thức nấu ăn</li>
            <li>Được đăng bài, bình luận khi đã đăng nhập</li>
            <li>Không đăng nội dung sai sự thật, phản cảm hoặc vi phạm pháp luật</li>
            <li>Không sao chép nội dung khi chưa có sự cho phép</li>
          </ul>
        </div>
      </div>

      {/* NỘI DUNG CẤM */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="fw-bold mb-3">3. Nội dung bị cấm</h4>
          <ul>
            <li>Nội dung kích động bạo lực, thù địch</li>
            <li>Nội dung vi phạm thuần phong mỹ tục</li>
            <li>Spam, quảng cáo trái phép</li>
            <li>Vi phạm bản quyền, đạo văn</li>
          </ul>
        </div>
      </div>

      {/* QUYỀN HỆ THỐNG */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="fw-bold mb-3">4. Quyền của hệ thống</h4>
          <p>
            Bếp Việt 4.0 có quyền:
          </p>
          <ul>
            <li>Xóa hoặc ẩn nội dung vi phạm</li>
            <li>Khóa hoặc xóa tài khoản vi phạm nghiêm trọng</li>
            <li>Thay đổi giao diện, chức năng hệ thống</li>
          </ul>
        </div>
      </div>

      {/* BẢN QUYỀN */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="fw-bold mb-3">5. Bản quyền</h4>
          <p>
            Nội dung công thức thuộc quyền sở hữu của người đăng tải.
            Bếp Việt 4.0 có quyền hiển thị và phân phối nội dung trong phạm vi hệ thống.
          </p>
        </div>
      </div>

      {/* GIỚI HẠN TRÁCH NHIỆM */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h4 className="fw-bold mb-3">6. Giới hạn trách nhiệm</h4>
          <p>
            Bếp Việt 4.0 không chịu trách nhiệm đối với:
          </p>
          <ul>
            <li>Thiệt hại do sử dụng công thức không đúng cách</li>
            <li>Nội dung do người dùng tự đăng tải</li>
            <li>Sự cố kỹ thuật ngoài ý muốn</li>
          </ul>
        </div>
      </div>

      {/* THAY ĐỔI */}
      <div className="alert alert-warning">
        <strong>Thay đổi điều khoản:</strong> Điều khoản sử dụng có thể được cập
        nhật bất kỳ lúc nào. Việc tiếp tục sử dụng hệ thống đồng nghĩa với việc
        bạn chấp nhận các thay đổi đó.
      </div>
    </div>
  );
}
