import { useState } from "react";

export default function Hoidap() {
  // FAQ có sẵn
  const faqs = [
    {
      question: "Bếp Việt 4.0 là gì?",
      answer:
        "Bếp Việt 4.0 là nền tảng chia sẻ công thức nấu ăn, ẩm thực Việt Nam, giúp người dùng tìm kiếm, lưu và chia sẻ món ăn dễ dàng."
    },
    {
      question: "Tôi có cần đăng nhập để xem công thức không?",
      answer:
        "Bạn có thể xem công thức miễn phí. Tuy nhiên, để lưu món ăn hoặc tạo cookbook, bạn cần đăng nhập."
    },
    {
      question: "Làm sao để tìm món ăn nhanh?",
      answer:
        "Bạn có thể sử dụng thanh tìm kiếm ở header hoặc lọc theo danh mục món ăn."
    },
    {
      question: "CookBook dùng để làm gì?",
      answer:
        "CookBook giúp bạn lưu lại các món ăn yêu thích để xem lại sau."
    },
    {
      question: "Tôi có thể đăng công thức của mình không?",
      answer:
        "Có. Sau khi đăng nhập, bạn có thể tạo và chia sẻ công thức nấu ăn của riêng mình."
    }
  ];

  // State cho form hỏi đáp
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim()) {
      alert("Vui lòng nhập câu hỏi");
      return;
    }

    //  Sau này gắn API POST ở đây
    console.log("Câu hỏi gửi:", question);

    alert("Câu hỏi của bạn đã được gửi!");
    setQuestion("");
  };

  return (
    <div className="container mt-4 mb-5">
      <h3 className="text-center fw-bold mb-4">Hỏi Đáp</h3>

      <div className="accordion mb-5" id="faqAccordion">
        {faqs.map((item, index) => (
          <div className="accordion-item mb-2" key={index}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed fw-bold"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#faq${index}`}
              >
                {item.question}
              </button>
            </h2>
            <div
              id={`faq${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#faqAccordion"
            >
              <div className="accordion-body">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== FORM GỬI CÂU HỎI ===== */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">
            Gửi câu hỏi của bạn
          </h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="4"
                placeholder="Nhập câu hỏi của bạn..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-warning">
              Gửi câu hỏi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
