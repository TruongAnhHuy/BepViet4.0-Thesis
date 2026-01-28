import React, { useState, useEffect } from "react";
import TopBar from "../layout_admin/TopBar";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const QuanLyCauHoi = () => {
  const [faqs, setFaqs] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const API_URL = "http://127.0.0.1:8000/api/admin/faqs";

  // ===== LOAD FAQ =====
  useEffect(() => {
    axios
      .get(API_URL)
      .then(res => {
        setFaqs(res.data);
        setFilteredFaqs(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi tải FAQ:", err);
        setLoading(false);
      });
  }, []);

  // ===== ADMIN TRẢ LỜI =====
  const handleAnswer = async (id) => {
    if (!answers[id] || !answers[id].trim()) {
      alert("Vui lòng nhập câu trả lời");
      return;
    }

    try {
      await axios.put(`${API_URL}/${id}`, {
        answer: answers[id]
      });

      const updateList = list =>
        list.map(item =>
          item.id === id ? { ...item, answer: answers[id] } : item
        );

      setFaqs(prev => updateList(prev));
      setFilteredFaqs(prev => updateList(prev));
      setAnswers({ ...answers, [id]: "" });

      alert("Đã trả lời câu hỏi");
    } catch (err) {
      console.error("Lỗi trả lời:", err);
      alert("Trả lời thất bại");
    }
  };

  // ===== TÌM KIẾM =====
  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);

    if (!keyword) {
      setFilteredFaqs(faqs);
    } else {
      const results = faqs.filter(item =>
        item.question.toLowerCase().includes(keyword) ||
        item.id.toString().includes(keyword)
      );
      setFilteredFaqs(results);
    }
  };

  return (
    <div className="main-content-wrapper">
      <TopBar title="Quản lý Hỏi Đáp" />

      <div className="page-content">
        {/* SEARCH */}
        <div className="search-section">
          <div className="search-container">
            <input
              className="search-input"
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <FaSearch className="search-icon" />
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : filteredFaqs.length > 0 ? (
          <table className="table table-bordered">
            <thead className="table-secondary">
              <tr>
                <th>#</th>
                <th>Câu hỏi</th>
                <th>Trả lời</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaqs.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.question}</td>
                  <td>
                    {item.answer ? (
                      <span className="text-success">{item.answer}</span>
                    ) : (
                      <textarea
                        className="form-control"
                        rows="2"
                        placeholder="Nhập câu trả lời..."
                        value={answers[item.id] || ""}
                        onChange={(e) =>
                          setAnswers({
                            ...answers,
                            [item.id]: e.target.value
                          })
                        }
                      />
                    )}
                  </td>
                  <td>
                    {item.answer ? (
                      <span className="badge bg-success">Đã trả lời</span>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleAnswer(item.id)}
                      >
                        Gửi
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-results">Không tìm thấy câu hỏi nào.</p>
        )}
      </div>
    </div>
  );
};

export default QuanLyCauHoi;
