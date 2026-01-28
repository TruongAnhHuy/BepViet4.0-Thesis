import React, { useState } from 'react';
import { Container, Card, Form, Button, Row, Col, Image } from 'react-bootstrap';
import { FaSave, FaArrowLeft, FaImage, FaPenNib } from 'react-icons/fa';
import axiosClient from '../api/axiosClient'; 
import { useNavigate } from 'react-router-dom';

const AddBlog = () => {
    const navigate = useNavigate();

    // State lưu dữ liệu form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    
    // State xử lý lỗi/loading
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    // Xử lý khi chọn ảnh
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Xử lý Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axiosClient.post('/posts', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.status === 200) {
                alert('Đăng bài viết thành công! Bài viết của bạn đang chờ duyệt.');
                navigate('/blog'); 
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                alert("Có lỗi xảy ra, vui lòng thử lại.");
                console.error(error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="py-5">
            {/* Header giao diện User */}
            <div className="text-center mb-5">
                <h6 className="text-warning fw-bold text-uppercase ls-2">Góc Chia Sẻ</h6>
                <h2 className="fw-bold display-6">Viết Bài Mới</h2>
                <p className="text-muted">Chia sẻ công thức nấu ăn hoặc câu chuyện ẩm thực của bạn</p>
            </div>

            <Row className="justify-content-center">
                <Col lg={10}>
                    <Card className="border-0 shadow-sm">
                        <Card.Body className="p-4 p-md-5">
                            <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
                                <h5 className="fw-bold text-dark m-0"><FaPenNib className="me-2 text-warning"/>Nội dung bài viết</h5>
                                <Button variant="light" className="text-muted border-0" onClick={() => navigate('/blog')}>
                                    <FaArrowLeft className="me-2" /> Quay lại Blog
                                </Button>
                            </div>

                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    {/* Cột Trái: Nhập liệu */}
                                    <Col md={8}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-bold text-secondary">Tiêu đề bài viết <span className="text-danger">*</span></Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                placeholder="Ví dụ: Cách làm món Phở Bò gia truyền..." 
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                isInvalid={!!errors.title}
                                                className="py-2 bg-light border-0"
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                                        </Form.Group>

                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-bold text-secondary">Nội dung chi tiết <span className="text-danger">*</span></Form.Label>
                                            <Form.Control 
                                                as="textarea" 
                                                rows={12} 
                                                placeholder="Hãy chia sẻ câu chuyện của bạn..." 
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                isInvalid={!!errors.content}
                                                className="bg-light border-0"
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.content}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>

                                    {/* Cột Phải: Ảnh đại diện */}
                                    <Col md={4}>
                                        <Form.Group className="mb-4">
                                            <Form.Label className="fw-bold text-secondary">Ảnh bìa</Form.Label>
                                            <div className="border rounded-3 p-3 text-center bg-white shadow-sm">
                                                {preview ? (
                                                    <div className="position-relative">
                                                        <Image src={preview} fluid rounded className="mb-3" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                                        <Button variant="danger" size="sm" className="position-absolute top-0 end-0 m-1" onClick={() => {setImage(null); setPreview(null);}}>X</Button>
                                                    </div>
                                                ) : (
                                                    <div className="text-muted py-5 bg-light rounded-3 mb-3 border border-dashed">
                                                        <FaImage size={40} className="mb-2 text-secondary opacity-50" />
                                                        <p className="small mb-0">Chưa chọn ảnh</p>
                                                    </div>
                                                )}
                                                
                                                <Form.Label className="btn btn-outline-primary w-100 btn-sm cursor-pointer m-0">
                                                    Chọn ảnh từ máy
                                                    <Form.Control 
                                                        type="file" 
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        hidden
                                                    />
                                                </Form.Label>
                                                
                                                {/* --- ĐÃ SỬA LỖI TẠI ĐÂY --- */}
                                                <small className="text-muted d-block mt-3 text-start fst-italic" style={{fontSize: '0.8rem'}}>
                                                    * Định dạng: jpg, png<br/>
                                                    * Dung lượng tối đa 2MB
                                                </small>
                                            </div>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <div className="text-end mt-4 pt-3 border-top">
                                    <Button variant="secondary" className="me-2" onClick={() => navigate('/blog')}>Hủy bỏ</Button>
                                    <Button variant="warning" type="submit" size="lg" className="px-5 text-dark fw-bold" disabled={loading}>
                                        {loading ? 'Đang đăng...' : <><FaSave className="me-2" /> Đăng bài</>}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddBlog;