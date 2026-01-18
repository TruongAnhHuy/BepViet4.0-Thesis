import { useParams } from "react-router-dom";

function PostDetail() {
  const { id } = useParams(); //URL

  return (
    <div className="container my-4">
      <div className="card p-4 shadow-sm"> 
        <h3>Bài viết số {id}</h3>
        <p className="text-muted">Ngày đăng: 05/01/2026</p>
        <p>
          Đây là nội dung bài viết (test giao diện).
        </p>
      </div>
    </div>
  );
}

export default PostDetail;
