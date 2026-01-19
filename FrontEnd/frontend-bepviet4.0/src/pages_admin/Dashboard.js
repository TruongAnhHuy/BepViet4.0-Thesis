import React, { useState, useEffect } from 'react';
import TopBar from '../layout_admin/TopBar';
import { FaUsers, FaFileAlt, FaUtensils, FaSpinner, FaFolder, FaComments } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF1919'];

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    recipes: 0,
    posts: 0,
    categories: 0,
    comments: 0
  });

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginAndFetchData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const res = await axiosClient.get('/dashboard-stats');
        
        // --- SỬA LỖI TẠI ĐÂY ---
        // axiosClient đã trả về data rồi, nên 'res' chính là object chứa counts và chart_data
        // Không dùng res.data.counts nữa mà dùng trực tiếp res.counts
        
        if (res) {
          // Cập nhật thống kê
          if (res.counts) {
             setStats(res.counts);
          }

          // Cập nhật biểu đồ
          if (res.chart_data && res.chart_data.length > 0) {
             setChartData(res.chart_data);
          } else {
             // Dữ liệu mẫu nếu DB chưa có category nào
             setChartData([
                { name: 'Món Chay', value: 0 },
                { name: 'Món Mặn', value: 0 },
             ]);
          }
        }

      } catch (error) {
        console.error("Lỗi lấy dữ liệu:", error);
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkLoginAndFetchData();
  }, [navigate]);

  return (
    <>
        <TopBar title="Tổng quan hệ thống" />

        <div className="page-content">
          
          {/* Phần Thống Kê */}
          <div className="dashboard-stats" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '20px' 
          }}>
            {[
                { id: 1, title: "Người dùng", count: stats.users, icon: <FaUsers />, color: "#3498db" },
                { id: 2, title: "Công thức", count: stats.recipes, icon: <FaUtensils />, color: "#e67e22" },
                { id: 3, title: "Bài viết", count: stats.posts, icon: <FaFileAlt />, color: "#2ecc71" },
                { id: 4, title: "Danh mục", count: stats.categories, icon: <FaFolder />, color: "#9b59b6" },
                { id: 5, title: "Bình luận", count: stats.comments, icon: <FaComments />, color: "#e74c3c" }
            ].map((item) => (
              <div key={item.id} className="stat-card" style={{
                  background: '#fff', 
                  padding: '20px', 
                  borderRadius: '10px', 
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
              }}>
                <div className="stat-info">
                  <span className="stat-title" style={{color: '#888', fontSize: '14px'}}>{item.title}</span>
                  <h3 className="stat-count" style={{fontSize: '24px', fontWeight: 'bold', margin: '5px 0 0'}}>
                    {loading ? <FaSpinner className="fa-spin" style={{fontSize: '1rem'}}/> : item.count}
                  </h3>
                </div>
                <div className="stat-icon" style={{ color: item.color, fontSize: '2rem', opacity: 0.8 }}>
                  {item.icon}
                </div>
              </div>
            ))}
          </div>

          {/* Phần Biểu Đồ */}
          <div className="chart-section" style={{marginTop: '30px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'}}>
            <h3 className="chart-title" style={{marginBottom: '20px', fontSize: '18px', fontWeight: '600'}}>Phân bố công thức theo danh mục</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={350}>
                {loading ? (
                   <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#999'}}>
                      <FaSpinner className="fa-spin" size={30}/>
                   </div>
                ) : chartData.length > 0 ? (
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, value }) => `${name} (${value})`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Số lượng']} />
                    <Legend />
                  </PieChart>
                ) : (
                  <div style={{textAlign: 'center', padding: '50px', color: '#999'}}>
                      Chưa có dữ liệu danh mục để vẽ biểu đồ
                  </div>
                )}
              </ResponsiveContainer>
            </div>
          </div>

        </div>
    </>
  );
};

export default Dashboard;