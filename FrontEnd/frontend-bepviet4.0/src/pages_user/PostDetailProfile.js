import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Badge } from "react-bootstrap";
// Import thêm icon Check và Plus
import { FaArrowLeft, FaCalendarAlt, FaUser, FaCheck, FaPlus } from "react-icons/fa";
import axiosClient from "../api/axiosClient"; 

function PostDetailProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State cho Follow
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  // Lấy thông tin user đang đăng nhập từ localStorage
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    let isMounted = true;

    const fetchPostAndStatus = async () => {
        try {
            // 1. Lấy bài viết
            const res = await axiosClient.get(`/posts/${id}`);
            const postData = res.data.data || res.data; 
            
            if (isMounted) {
                setPost(postData);
                setLoading(false);

                // 2. Nếu đã đăng nhập và bài viết có thông tin tác giả -> Check follow
                // Lưu ý: Backend cần trả về user_id trong API /posts/{id}
                if (currentUser && postData.user_id) {
                    if (currentUser.id !== postData.user_id) {
                        checkFollow(postData.user_id);
                    }
                }
            }
        } catch (err) {
            if (isMounted) {
                console.error("Lỗi:", err);
                setLoading(false);
                setError("Không thể tải bài viết này.");
            }
        }
    };

    fetchPostAndStatus();
    return () => { isMounted = false; }; 
  }, [id]);

  // Hàm gọi API kiểm tra trạng thái follow
  const checkFollow = async (authorId) => {
      try {
          const res = await axiosClient.get(`/follow/check/${authorId}`);
          setIsFollowing(res.data.is_following);
      } catch (err) {
          console.error("Lỗi check follow:", err);
      }
  };

  // Hàm xử lý khi bấm nút Follow
  const handleFollowClick = async () => {
      if (!currentUser) {
          alert("Bạn cần đăng nhập để theo dõi tác giả!");
          navigate("/login");
          return;
      }

      setFollowLoading(true);
      try {
          // Gọi API toggle
          const res = await axiosClient.post('/follow', {
              following_id: post.user_id
          });
          
          if (res.data.status === 'followed') {
              setIsFollowing(true);
          } else {
              setIsFollowing(false);
          }

      } catch (err) {
          console.error("Lỗi follow:", err);
          alert("Có lỗi xảy ra, vui lòng thử lại sau.");
      } finally {
          setFollowLoading(false);
      }
  };

  // Hàm xử lý ảnh
  const getImageUrl = (path) => path ? (path.startsWith('http') ? path : `http://127.0.0.1:8000/storage/${path}`) : "https://via.placeholder.com/800x400";
  // Hàm xử lý ngày
  const formatDate = (d) => d ? new Date(d).toLocaleDateString('vi-VN', {day: '2-digit', month: '2-digit', year: 'numeric'}) : "";

  if (loading) return <Container className="text-center py-5"><Spinner animation="border" variant="warning"/></Container>;
  if (error || !post) return <Container className="text-center py-5"><div className="alert alert-danger">{error}</div><Button variant="light" onClick={() => navigate(-1)}>Quay lại</Button></Container>;

  return (
    <Container className="py-5">
      <Button variant="light" className="mb-4 text-secondary border shadow-sm" onClick={() => navigate(-1)}>
        <FaArrowLeft className="me-2" /> Quay lại
      </Button>

      <Card className="border-0 shadow-lg overflow-hidden rounded-4">
        {post.image_path && (
            <div style={{ maxHeight: '450px', overflow: 'hidden', backgroundColor: '#eee' }}>
                <Card.Img variant="top" src={getImageUrl(post.image_path)} className="w-100 object-fit-cover" />
            </div>
        )}

        <Card.Body className="p-lg-5 p-4">
          <h1 className="fw-bold mb-3 display-6">{post.title}</h1>
          
          <div className="d-flex flex-wrap align-items-center gap-4 text-muted mb-4 pb-3 border-bottom">
              
              {/* === KHU VỰC TÁC GIẢ & NÚT FOLLOW === */}
              <div className="d-flex align-items-center bg-light px-3 py-2 rounded-pill border">
                  <FaUser className="text-warning me-2" />
                  <span className="fw-bold text-dark me-3">
                      {post.user ? (post.user.username || post.user.name || "Admin") : "Ẩn danh"}
                  </span>

                  {/* Logic hiển thị nút Follow */}
                  {post.user_id && (
    <Button 
        size="sm" 
        variant={isFollowing ? "outline-secondary" : "warning"}
        // ... (giữ nguyên phần bên trong)
    >
        {followLoading ? <Spinner size="sm" /> : (
            isFollowing ? 
            <><FaCheck className="me-1"/> Đang theo dõi</> : 
            <><FaPlus className="me-1"/> Theo dõi</>
        )}
    </Button>
)}
              </div>
              {/* ========================================= */}

              <div className="d-flex align-items-center">
                  <FaCalendarAlt className="text-warning me-2" />
                  <span>{formatDate(post.created_at)}</span>
              </div>

              <div className="d-flex align-items-center">
                  <Badge bg={post.status === 1 ? "success" : "secondary"} pill>
                      {post.status === 1 ? "Đã duyệt" : "Chờ duyệt"}
                  </Badge>
              </div>
          </div>

          <div className="blog-content mt-4" style={{ fontSize: '1.1rem', lineHeight: '1.8', textAlign: 'justify', color: '#333' }}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PostDetailProfile;