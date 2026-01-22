import { useState } from "react";

export default function Lienhe() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    console.log("Liên hệ:", form);

    alert("Gửi liên hệ thành công!");
    setForm({ name: "", email: "", message: "" });
  };

   return (
    <div className="container my-5">
      {/* TIÊU ĐỀ */}
      <h1 className="text-center fw-bold mb-4">Liên hệ với chúng tôi</h1>
      <p className="text-center text-muted mb-5">
        Nếu bạn có thắc mắc, góp ý hoặc cần hỗ trợ, hãy liên hệ với Bếp Việt 4.0.
        Chúng tôi luôn sẵn sàng lắng nghe bạn ❤️
      </p>

      <div className="row">
        {/* THÔNG TIN LIÊN HỆ */}
        <div className="col-md-5 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h4 className="fw-bold mb-3">Thông tin liên hệ</h4>

              <p>
                <i className="fa-solid fa-location-dot me-2 text-warning"></i>
                Trường Cao đẳng / Đại học (ghi tên trường của bạn)
              </p>

              <p>
                <i className="fa-solid fa-envelope me-2 text-warning"></i>
                bepviet40@gmail.com
              </p>

              <p>
                <i className="fa-solid fa-phone me-2 text-warning"></i>
                0123 456 789
              </p>

              <p>
                <i className="fa-solid fa-clock me-2 text-warning"></i>
                Thứ 2 – Thứ 7: 08:00 – 22:00
              </p>

              <hr />

              <h5 className="fw-bold">Theo dõi chúng tôi</h5>
              <div className="d-flex gap-3 mt-2">
                <i className="fa-brands fa-facebook fa-2x text-primary"></i>
                <i className="fa-brands fa-youtube fa-2x text-danger"></i>
                <i className="fa-brands fa-instagram fa-2x text-warning"></i>
              </div>
            </div>
          </div>
        </div>

        {/* FORM LIÊN HỆ */}
        <div className="col-md-7">
          <div className="card shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold mb-3">Gửi tin nhắn cho chúng tôi</h4>

              <form>
                <div className="mb-3">
                  <label className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nhập họ tên của bạn"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="example@gmail.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Chủ đề</label>
                  <select className="form-select">
                    <option>Góp ý website</option>
                    <option>Báo lỗi hệ thống</option>
                    <option>Hỗ trợ tài khoản</option>
                    <option>Khác</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Nội dung</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Nhập nội dung liên hệ..."
                  ></textarea>
                </div>

                <button className="btn btn-warning fw-bold px-4">
                  <i className="fa-solid fa-paper-plane me-2"></i>
                  Gửi liên hệ
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
