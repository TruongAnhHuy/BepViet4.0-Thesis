import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopBar from '../layout_admin/TopBar';
import { 
    FaToggleOn, FaToggleOff, FaSave, FaUserCog, 
    FaSpinner, FaExchangeAlt, FaEnvelope, FaGlobe, FaListOl 
} from 'react-icons/fa';
import '../App.css';

const SystemSettings = () => {
    // --- 1. STATE QUẢN LÝ DỮ LIỆU ---
    // State cấu hình hệ thống
    const [settings, setSettings] = useState({
        site_name: '',
        contact_email: '',
        items_per_page: 10,
        auto_approve_comments: 1,
        maintenance_mode: 0,
    });

    // State cho chức năng ĐỔI ROLE
    const [usersList, setUsersList] = useState([]); 
    const [selectedUserId, setSelectedUserId] = useState(''); 
    const [selectedRoleId, setSelectedRoleId] = useState(2);  

    // State trạng thái tải trang
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Danh sách Role cứng (Admin/User)
    const roles = [
        { id: 1, name: 'Admin' },
        { id: 2, name: 'User' }
    ];

    // --- 2. LOAD DỮ LIỆU TỪ API KHI VÀO TRANG ---
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Gọi song song 2 API để lấy Settings và List Users
                const [settingsRes, usersRes] = await Promise.all([
                    axios.get('http://127.0.0.1:8000/api/settings'),
                    axios.get('http://127.0.0.1:8000/api/users-minimal')
                ]);

                // Cập nhật State Settings
                const data = settingsRes.data;
                setSettings({
                    site_name: data.site_name || '',
                    contact_email: data.contact_email || '',
                    items_per_page: parseInt(data.items_per_page) || 10,
                    auto_approve_comments: parseInt(data.auto_approve_comments) || 0,
                    maintenance_mode: parseInt(data.maintenance_mode) || 0,
                });

                // Cập nhật State Users List
                setUsersList(usersRes.data);
                
                setLoading(false);
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
                alert("Không thể kết nối đến Server. Vui lòng kiểm tra lại Backend Laravel.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // --- 3. CÁC HÀM XỬ LÝ LOGIC ---

    // Xử lý khi chọn Email từ dropdown -> Tự động cập nhật Role hiện tại của user đó
    const handleUserSelect = (e) => {
        const userId = parseInt(e.target.value);
        setSelectedUserId(userId);

        const user = usersList.find(u => u.id === userId);
        if (user) {
            setSelectedRoleId(user.role_id);
        }
    };

    // Xử lý lưu Cấu hình chung
    const handleSaveSettings = async () => {
        setSaving(true);
        try {
            await axios.post('http://127.0.0.1:8000/api/settings', settings);
            alert("Đã lưu cấu hình chung thành công!");
        } catch (error) {
            console.error(error);
            alert("Lỗi khi lưu cấu hình.");
        } finally {
            setSaving(false);
        }
    };

    // Xử lý đổi Role cho User
    const handleChangeRole = async () => {
        if (!selectedUserId) {
            alert("Vui lòng chọn một Email trước!");
            return;
        }

        try {
            await axios.post('http://127.0.0.1:8000/api/update-user-role', {
                user_id: selectedUserId,
                role_id: selectedRoleId
            });
            
            // Cập nhật lại danh sách local để giao diện đồng bộ ngay lập tức
            const updatedList = usersList.map(u => 
                u.id === selectedUserId ? { ...u, role_id: selectedRoleId } : u
            );
            setUsersList(updatedList);
            
            alert(`Đã đổi quyền thành công!`);
        } catch (error) {
            console.error(error);
            alert("Lỗi khi cập nhật quyền.");
        }
    };

    // Xử lý thay đổi input text/number
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings({ ...settings, [name]: value });
    };

    // Xử lý toggle On/Off
    const toggleSetting = (key) => {
        setSettings({ ...settings, [key]: settings[key] === 1 ? 0 : 1 });
    };

    if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Đang tải dữ liệu hệ thống...</div>;

    // --- 4. GIAO DIỆN (ĐÃ CHỈNH SỬA CSS) ---
    return (
        <div className="main-content-wrapper" style={{ width: '100%' }}>
            <TopBar title="Cấu hình Hệ thống" />

            <div className="page-content" style={{ backgroundColor: '#f5f7fa', minHeight: '100vh', padding: '20px' }}>
                <div className="settings-container" style={{ maxWidth: '900px', margin: '0 auto' }}>

                    {/* --- KHỐI 1: PHÂN QUYỀN USER THEO EMAIL --- */}
                    <div className="settings-section" style={{ background: '#fff', padding: '30px', borderRadius: '8px', marginBottom: '30px', borderLeft: '5px solid #4ecdc4', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                        <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: '#2c3e50', fontSize: '1.2rem', fontWeight: '600' }}>
                            <FaUserCog color="#4ecdc4" /> Phân quyền User theo Email
                        </h3>

                        {/* Flex container với align-items: flex-end để nút thẳng hàng với ô input */}
                        <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                            
                            {/* Ô chọn Email */}
                            <div style={{ flex: 2, minWidth: '300px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Chọn Email User</label>
                                <select 
                                    className="settings-input" 
                                    value={selectedUserId} 
                                    onChange={handleUserSelect} 
                                    style={{ 
                                        width: '100%', 
                                        height: '45px', // Chiều cao cố định
                                        padding: '0 12px', 
                                        borderRadius: '6px', 
                                        border: '1px solid #ddd', 
                                        backgroundColor: '#f9f9f9',
                                        fontSize: '14px'
                                    }}
                                >
                                    <option value="">-- Tìm chọn Email --</option>
                                    {usersList.map(u => (
                                        <option key={u.id} value={u.id}>
                                            {u.email} ({u.role_id === 1 ? 'Admin' : 'User'})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Ô chọn Quyền */}
                            <div style={{ flex: 1, minWidth: '150px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#444' }}>Cấp quyền mới</label>
                                <select 
                                    className="settings-input" 
                                    value={selectedRoleId} 
                                    onChange={(e) => setSelectedRoleId(parseInt(e.target.value))} 
                                    style={{ 
                                        width: '100%', 
                                        height: '45px', // Chiều cao cố định bằng ô Email
                                        padding: '0 12px', 
                                        borderRadius: '6px', 
                                        border: '1px solid #ddd', 
                                        backgroundColor: '#f9f9f9',
                                        fontSize: '14px'
                                    }}
                                >
                                    {roles.map(r => (
                                        <option key={r.id} value={r.id}>{r.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Nút Cập nhật */}
                            <div style={{ flex: '0 0 auto' }}>
                                <button 
                                    onClick={handleChangeRole} 
                                    style={{ 
                                        height: '45px', // Chiều cao bằng các ô input
                                        padding: '0 25px', // Padding rộng hơn
                                        background: '#4ecdc4', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '6px', 
                                        cursor: 'pointer', 
                                        fontWeight: 'bold', 
                                        fontSize: '14px',
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '8px',
                                        whiteSpace: 'nowrap',
                                        boxShadow: '0 2px 5px rgba(78, 205, 196, 0.3)'
                                    }}
                                >
                                    <FaExchangeAlt /> Cập nhật
                                </button>
                            </div>
                        </div>
                        <p style={{ marginTop: '12px', fontSize: '13px', color: '#666', fontStyle: 'italic' }}>* Lưu ý: Hãy cẩn thận khi cấp quyền Admin cho người khác.</p>
                    </div>

                    {/* --- KHỐI 2: CẤU HÌNH CHUNG --- */}
                    <div className="settings-section" style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderLeft: '5px solid #ff6b6b' }}>
                        <h3 className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', color: '#2c3e50', fontSize: '1.2rem', fontWeight: '600', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                            <FaSave color="#ff6b6b" /> Cấu hình chung
                        </h3>

                        {/* Tên Website */}
                        <div className="settings-row" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '600', color: '#444' }}>
                                <FaGlobe color="#666"/> Tên Website
                            </label>
                            <input 
                                type="text" 
                                name="site_name" 
                                value={settings.site_name} 
                                onChange={handleChange} 
                                style={{ width: '100%', height: '45px', padding: '0 12px', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }} 
                                placeholder="Nhập tên website..." 
                            />
                        </div>

                        {/* Email Liên hệ */}
                        <div className="settings-row" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '600', color: '#444' }}>
                                <FaEnvelope color="#666"/> Email Liên hệ
                            </label>
                            <input 
                                type="email" 
                                name="contact_email" 
                                value={settings.contact_email} 
                                onChange={handleChange} 
                                style={{ width: '100%', height: '45px', padding: '0 12px', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }} 
                                placeholder="admin@example.com" 
                            />
                        </div>

                        {/* Số bài viết / trang */}
                        <div className="settings-row" style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontWeight: '600', color: '#444' }}>
                                <FaListOl color="#666"/> Số bài viết hiển thị mỗi trang
                            </label>
                            <input 
                                type="number" 
                                name="items_per_page" 
                                value={settings.items_per_page} 
                                onChange={handleChange} 
                                style={{ width: '150px', height: '45px', padding: '0 12px', borderRadius: '6px', border: '1px solid #ddd', backgroundColor: '#f9f9f9' }} 
                            />
                        </div>

                        <div style={{ height: '1px', background: '#f0f0f0', margin: '20px 0' }}></div>

                        {/* Toggle Duyệt Comment */}
                        <div className="settings-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                            <div>
                                <div style={{ fontWeight: '600', color: '#444' }}>Duyệt bình luận tự động</div>
                                <small style={{ color: '#888' }}>{settings.auto_approve_comments === 1 ? 'Bình luận sẽ hiện ngay lập tức' : 'Cần Admin duyệt thủ công'}</small>
                            </div>
                            <div onClick={() => toggleSetting('auto_approve_comments')} style={{ cursor: 'pointer' }}>
                                {settings.auto_approve_comments === 1 ? <FaToggleOn size={40} color="#2ecc71" /> : <FaToggleOff size={40} color="#ccc" />}
                            </div>
                        </div>

                        {/* Toggle Bảo trì */}
                        <div className="settings-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', marginTop: '10px' }}>
                            <div>
                                <div style={{ fontWeight: '600', color: '#e74c3c' }}>Chế độ Bảo trì</div>
                                <small style={{ color: '#888' }}>Chỉ Admin mới có thể truy cập website</small>
                            </div>
                            <div onClick={() => toggleSetting('maintenance_mode')} style={{ cursor: 'pointer' }}>
                                {settings.maintenance_mode === 1 ? <FaToggleOn size={40} color="#e74c3c" /> : <FaToggleOff size={40} color="#ccc" />}
                            </div>
                        </div>

                        {/* Nút Lưu Cấu Hình - Làm to và nổi bật hơn */}
                        <div style={{ textAlign: 'right', marginTop: '30px' }}>
                            <button 
                                onClick={handleSaveSettings} 
                                disabled={saving} 
                                style={{ 
                                    padding: '12px 35px', 
                                    background: '#2c3e50', 
                                    color: 'white', 
                                    border: 'none', 
                                    borderRadius: '6px', 
                                    cursor: 'pointer', 
                                    fontWeight: 'bold', 
                                    fontSize: '15px',
                                    display: 'inline-flex', 
                                    alignItems: 'center', 
                                    gap: '10px',
                                    boxShadow: '0 4px 6px rgba(44, 62, 80, 0.2)',
                                    opacity: saving ? 0.7 : 1,
                                    transition: 'all 0.3s'
                                }}
                            >
                                {saving ? <FaSpinner className="icon-spin" /> : <FaSave size={18} />} 
                                {saving ? 'Đang lưu...' : 'Lưu Cấu Hình'}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SystemSettings;