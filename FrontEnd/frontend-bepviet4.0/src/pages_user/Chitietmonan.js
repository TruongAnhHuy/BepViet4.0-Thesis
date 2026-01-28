// src/pages_user/RecipeDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom'; 
import { getRecipeById } from '../services/api'; 
import axiosClient from '../api/axiosClient'; 
import { Container, Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';
import { FaClock, FaUser, FaFire, FaArrowLeft, FaStar } from 'react-icons/fa'; 

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Logic xác định đường về
    const backPath = location.state?.from || '/recipes';
    const backText = backPath === '/cookbook' ? 'Quay lại Bộ sưu tập' : 'Quay lại Danh sách';

    // State dữ liệu món ăn
    const [recipe, setRecipe] = useState(location.state || null);
    
    // State cho Rating
    const [rating, setRating] = useState(0); 
    const [hover, setHover] = useState(null); 
    const [averageRating, setAverageRating] = useState(0); 

    // --- STATE MỚI CHO COMMENT ---
    const [commentContent, setCommentContent] = useState(''); 

    const BASE_IMAGE_URL = "http://127.0.0.1:8000/storage/"; 

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const data = await getRecipeById(id);
                setRecipe(data); 
                
                if(data.average_rating) {
                    setAverageRating(data.average_rating);
                }

                if (data.user_rating) {
                    setRating(data.user_rating); 
                }

            } catch (error) {
                console.error("Lỗi khi tải món ăn:", error);
            }
        };

        if (id) {
            fetchRecipe();
        }
    }, [id]);

    const getImageUrl = (path) => {
        if (!path) return "https://via.placeholder.com/300";
        if (path.startsWith('http')) return path; 
        return `${BASE_IMAGE_URL}${path}`;
    };

    // Hàm xử lý Đánh giá (Rating)
    const handleRating = async (starValue) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Bạn cần đăng nhập để đánh giá món ăn này!");
            return;
        }

        try {
            setRating(starValue); 
            const res = await axiosClient.post(`/recipes/${id}/rate`, { stars: starValue });
            
            alert(`Cảm ơn bạn đã đánh giá ${starValue} sao!`);
            if(res.average_rating) setAverageRating(res.average_rating);

        } catch (error) {
            console.error("Lỗi đánh giá:", error);
            alert("Có lỗi xảy ra khi gửi đánh giá.");
        }
    };

    // --- HÀM MỚI: XỬ LÝ GỬI BÌNH LUẬN ---
    const handleCommentSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Bạn cần đăng nhập để bình luận!");
            return;
        }

        if (!commentContent.trim()) {
            alert("Vui lòng nhập nội dung bình luận!");
            return;
        }

        try {
            // Gọi API comment (Nhớ khai báo route ở Laravel rồi nhé)
            const res = await axiosClient.post(`/recipes/${id}/comment`, { content: commentContent });
            
            // Lấy comment mới từ phản hồi server
            const newComment = res.comment;
            
            // Cập nhật State recipe để hiện comment mới ngay lập tức (đưa lên đầu)
            setRecipe(prev => ({
                ...prev,
                comments: [newComment, ...prev.comments] 
            }));

            setCommentContent(''); // Xóa trắng ô nhập
            alert("Đã gửi bình luận thành công!");

        } catch (error) {
            console.error("Lỗi bình luận:", error);
            alert("Có lỗi xảy ra khi gửi bình luận.");
        }
    };

    if (!recipe) {
        return <div className="text-center py-5"><h3>Đang tải dữ liệu...</h3></div>;
    }

    return (
        <Container className="py-5">
            <div className="mb-3">
                 <Button 
                    variant="link" 
                    className="text-decoration-none text-dark d-flex align-items-center gap-2" 
                    onClick={() => navigate(backPath)}
                 >
                    <FaArrowLeft /> {backText}
                 </Button>
            </div>

            <Row className="mb-4">
                <Col md={4}>
                    <Card className="mb-3 shadow-sm border-0">
                        <div style={{ height: '300px', overflow: 'hidden', borderRadius: '8px' }}>
                            <Image 
                                src={getImageUrl(recipe.image_path)} 
                                alt={recipe.title || ""} 
                                fluid 
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                            />
                        </div>
                    </Card>

                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-dark">{recipe.title || "Đang tải tên..."}</h2>
                        <div className="text-muted fst-italic">
                            Đăng bởi: <strong>{recipe.user?.username || 'Admin'}</strong>
                        </div>

                        <div className="mt-3">
                            <h5 className="mb-2">Đánh giá món ăn:</h5>
                            <div className="d-flex justify-content-center">
                                {[...Array(5)].map((star, i) => {
                                    const ratingValue = i + 1;
                                    return (
                                        <label key={i}>
                                            <input 
                                                type="radio" 
                                                name="rating" 
                                                value={ratingValue} 
                                                style={{ display: 'none' }} 
                                                onClick={() => handleRating(ratingValue)}
                                            />
                                            <FaStar 
                                                className="star" 
                                                size={30} 
                                                color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"} 
                                                onMouseEnter={() => setHover(ratingValue)}
                                                onMouseLeave={() => setHover(null)}
                                                style={{ cursor: 'pointer', transition: 'color 200ms' }}
                                            />
                                        </label>
                                    );
                                })}
                            </div>
                            {averageRating > 0 && <div className="mt-2 text-warning fw-bold">Điểm trung bình: {averageRating}/5</div>}
                        </div>
                    </div>

                    <Card className="shadow-sm border-0 ">
                        <Card.Header className="bg-warning text-dark fw-bold text-center">
                            NGUYÊN LIỆU
                        </Card.Header>
                        <ListGroup variant="flush">
                            {recipe.ingredients && recipe.ingredients.length > 0 ? (
                                recipe.ingredients.map((item, index) => (
                                    <ListGroup.Item key={index} className="border-bottom-0">
                                        <span className="fw-bold text-warning">
                                            • {item.pivot?.quantity} {item.pivot?.unit}
                                        </span> 
                                        {' '} {item.ingredient_name}
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <ListGroup.Item className="text-center text-muted fst-italic py-4">
                                    Đang cập nhật nguyên liệu...
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>

                <Col md={8}>
                    <Card className="mb-4 shadow-sm border-0 bg-light">
                        <Card.Body className="d-flex justify-content-around align-items-center text-center">
                            <div>
                                <FaClock className="text-warning mb-2" size={24} />
                                <h6 className="fw-bold">Thời gian</h6>
                                <span>{recipe.cooking_time || 0} phút</span>
                            </div>
                            <div>
                                <FaFire className="text-danger mb-2" size={24} />
                                <h6 className="fw-bold">Calories</h6>
                                <span>500 kcal</span> 
                            </div>
                            <div>
                                <FaUser className="text-primary mb-2" size={24} />
                                <h6 className="fw-bold">Khẩu phần</h6>
                                <span>4 người</span>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className="shadow-sm border-0" style={{ minHeight: '400px' }}>
                        <Card.Header className="bg-white border-bottom-0">
                            <h4 className="fw-bold text-warning border-start border-4 border-warning ps-3">
                                CÁCH LÀM CHI TIẾT
                            </h4>
                        </Card.Header>
                        <Card.Body>
                            <div className="recipe-steps">
                                {recipe.cooking_steps && recipe.cooking_steps.length > 0 ? (
                                    recipe.cooking_steps.map((step, index) => (
                                        <div key={index} className="mb-4">
                                            <h6 className="fw-bold text-dark">Bước {step.step_number}:</h6>
                                            <p className="text-secondary mb-2" style={{ lineHeight: '1.6', fontSize: '1.05rem' }}>
                                                {step.content}
                                            </p>
                                            {step.image && (
                                                 <div className="text-center">
                                                    <img 
                                                        src={getImageUrl(step.image)} 
                                                        alt={`Step ${step.step_number}`} 
                                                        className="img-fluid rounded shadow-sm" 
                                                        style={{ maxHeight: '250px' }} 
                                                    />
                                                 </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted">{recipe.description || "Đang tải nội dung chi tiết..."}</p>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <Card className="shadow-sm border-0 bg-light">
                        <Card.Body className="p-4">
                            <h5 className="fw-bold mb-4 border-bottom pb-2">KHU VỰC BÌNH LUẬN</h5>
                            
                            {/* --- PHẦN MỚI: Ô NHẬP BÌNH LUẬN --- */}
                            <div className="mb-4">
                                <textarea 
                                    className="form-control mb-2" 
                                    rows="3" 
                                    placeholder="Viết bình luận của bạn về món ăn này..."
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    style={{resize: 'none'}}
                                ></textarea>
                                <div className="text-end">
                                    <Button variant="warning" onClick={handleCommentSubmit} className="fw-bold text-white">
                                        Gửi bình luận
                                    </Button>
                                </div>
                            </div>
                            {/* ---------------------------------- */}

                            <div className="comment-list">
                                {recipe.comments?.map((comment, index) => (
                                    <div key={index} className="d-flex mb-3">
                                        <div className="flex-shrink-0">
                                            <img 
                                                className="rounded-circle border border-2 border-white shadow-sm" 
                                                src={getImageUrl(comment.user?.avatar)} 
                                                alt="User" width="50" height="50" style={{objectFit: 'cover'}}
                                            />
                                        </div>
                                        <div className="flex-grow-1 ms-3 bg-white p-3 rounded shadow-sm">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <h6 className="fw-bold mb-0">{comment.user?.username || "Ẩn danh"}</h6>
                                                <small className="text-muted" style={{fontSize: '0.8rem'}}>
                                                    {comment.created_at ? new Date(comment.created_at).toLocaleString('vi-VN') : 'Vừa xong'}
                                                </small>
                                            </div>
                                            <p className="mb-0 text-secondary">{comment.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default RecipeDetail;