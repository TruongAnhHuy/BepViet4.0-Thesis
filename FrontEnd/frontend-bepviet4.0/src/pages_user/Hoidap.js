import { useEffect, useState } from "react";
import axios from "axios";

export default function Hoidap() {
  const staticFaqs = [
    {
      question: "Bếp Việt 4.0 là gì?",
      answer:
        "Bếp Việt 4.0 là nền tảng chia sẻ công thức nấu ăn, ẩm thực Việt Nam."
    }
  ];

  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(true);


  const API_URL = "http://127.0.0.1:8000/api/faqs";

  // LOAD FAQ
  useEffect(() => {
    axios.get(API_URL)
      .then(res => {
        setFaqs(Array.isArray(res.data) ? res.data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // GỬI CÂU HỎI
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim()) {
      alert("Vui lòng nhập câu hỏi");
      return;
    }

    axios.post(API_URL, { question })
      .then(() => {
        alert("Câu hỏi đã được gửi!");
        setQuestion("");
      })
      .catch(() => alert("Gửi thất bại"));
  };

  const allFaqs = [...staticFaqs, ...faqs];

  return (
    <div className="container mt-4 mb-5">
      <h3 className="text-center fw-bold mb-4">Hỏi Đáp</h3>

      {loading ? (
        <p className="text-center">Đang tải...</p>
      ) : (
        <div className="accordion mb-5" id="faqAccordion">
          {allFaqs.map((item, index) => (
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
              >
                <div className="accordion-body">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FORM GỬI */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="fw-bold mb-3">Gửi câu hỏi</h5>
          <form onSubmit={handleSubmit}>
            <textarea
              className="form-control mb-3"
              rows="4"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Nhập câu hỏi..."
            />
            <button className="btn btn-warning">Gửi câu hỏi</button>
          </form>
        </div>
      </div>
    </div>
  );
}
