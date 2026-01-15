<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin Dashboard') - Bếp Việt</title> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* --- CẤU HÌNH CƠ BẢN --- */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            display: flex; height: 100vh; background-color: #f9f9f9;
            overflow: hidden;
        }

        /* --- SIDEBAR --- */
        .sidebar {
            width: 280px; 
            background-color: #Cbbb68; /* Màu vàng chủ đạo */
            color: #333;
            display: flex; flex-direction: column; padding: 20px;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            flex-shrink: 0;
            position: relative; /* [QUAN TRỌNG] Để căn chỉnh nút absolute theo sidebar */
        }

        /* Trạng thái thu nhỏ */
        .sidebar.collapsed {
            width: 80px;
            padding: 20px 10px;
        }

        /* Header Sidebar */
        .sidebar-header { 
            display: flex; justify-content: center; /* Căn giữa logo */
            align-items: center; margin-bottom: 30px; 
            height: 50px; /* Cố định chiều cao để không bị nhảy */
        }
        
        /* Logo Web */
        .logo-box {
            background-color: #fff; width: 80px; height: 80px;
            display: flex; justify-content: center; align-items: center;
            font-weight: bold; color: #Cbbb68; border-radius: 10px;
            transition: all 0.3s;
            overflow: hidden; white-space: nowrap;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .sidebar.collapsed .logo-box { width: 50px; height: 50px; font-size: 10px; }
        
        /* --- NÚT TOGGLE (ĐÃ CẬP NHẬT THEO PHƯƠNG ÁN 2) --- */
        .toggle-btn { 
            background: #fff; border: none; 
            width: 30px; height: 30px; border-radius: 5px; 
            color: #Cbbb68; cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            
            position: absolute; 
            right: 20px; top: 25px; /* Vị trí mặc định: Góc phải trên */
            
            transition: all 0.3s ease; /* Hiệu ứng di chuyển mượt */
            z-index: 100;
        }

        /* Khi thu nhỏ: Đưa nút xuống dưới đáy, nằm trên nút đăng xuất */
        .sidebar.collapsed .toggle-btn { 
            top: auto; /* Bỏ vị trí trên cùng */
            bottom: 80px; /* Cách đáy 80px */
            right: 50%; 
            transform: translateX(50%); /* Căn giữa theo chiều ngang */
        }

        /* --- USER PROFILE --- */
        .user-profile { 
            text-align: center; margin-bottom: 20px; padding-bottom: 20px; 
            border-bottom: 1px solid rgba(255,255,255,0.3); 
            transition: 0.3s; overflow: hidden;
        }
        .avatar-circle { 
            width: 70px; height: 70px; margin: 0 auto 10px; 
            background-color: #fff; border-radius: 50%; 
            display: flex; justify-content: center; align-items: center; 
            font-size: 28px; color: #555; transition: 0.3s;
        }
        .greeting-box { 
            background-color: #fff; padding: 5px 15px; border-radius: 20px; 
            display: inline-block; font-size: 13px; font-weight: 600; 
            white-space: nowrap;
        }

        /* Ẩn profile khi thu nhỏ */
        .sidebar.collapsed .user-profile { opacity: 0; height: 0; margin: 0; padding: 0; border: none; }

        /* --- MENU --- */
        .nav-menu { 
            flex-grow: 1; list-style: none; overflow-y: auto; overflow-x: hidden;
            padding-top: 10px;
        }
        .nav-menu::-webkit-scrollbar { width: 4px; }
        .nav-menu::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.5); border-radius: 5px; }

        .nav-item { margin-bottom: 10px; }
        .nav-link {
            display: flex; align-items: center; gap: 15px;
            background-color: #fcebeb; color: #333; text-decoration: none;
            padding: 12px 15px; border-radius: 8px; 
            font-size: 14px; font-weight: 500; transition: all 0.2s;
            white-space: nowrap;
        }
        .nav-link i { min-width: 20px; text-align: center; font-size: 16px; }
        .nav-link:hover, .nav-link.active { 
            background-color: #fff; color: #Cbbb68; 
            transform: translateX(3px); box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        /* Thu nhỏ menu */
        .sidebar.collapsed .nav-link span { display: none; }
        .sidebar.collapsed .nav-link { justify-content: center; padding: 12px; }
        .sidebar.collapsed .nav-link:hover { transform: none; }

        /* --- FOOTER --- */
        .sidebar-footer { margin-top: 10px; border-top: 1px solid rgba(255,255,255,0.3); padding-top: 15px; }
        .logout-btn { 
            display: flex; align-items: center; gap: 10px; 
            color: #fff; text-decoration: none; font-weight: bold; font-size: 16px;
            white-space: nowrap; transition: 0.3s;
        }
        .sidebar.collapsed .logout-btn span { display: none; }
        .sidebar.collapsed .logout-btn { justify-content: center; }

        /* --- MAIN CONTENT --- */
        .main-content { flex-grow: 1; padding: 30px; overflow-y: auto; transition: all 0.3s ease; }
        .top-bar { margin-bottom: 20px; color: #555; display: flex; justify-content: space-between; align-items: center;}
    </style>
</head>
<body>

    <aside class="sidebar" id="sidebar">
        <div class="sidebar-header">
            <div class="logo-box">LogoWeb</div>
        </div>

        <button class="toggle-btn" id="toggleBtn" onclick="toggleSidebar()">
            <i class="fas fa-angles-left"></i>
        </button>

        <div class="user-profile">
            <div class="avatar-circle"><i class="far fa-user"></i></div>
            <div class="greeting-box">Xin chào, Admin</div>
        </div>

        <ul class="nav-menu">
            <li class="nav-item">
                <a href="{{ route('admin.dashboard') }}" class="nav-link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">
                    <i class="fas fa-home"></i> <span>Trang chủ</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-users"></i> <span>Quản lý thông tin User</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-newspaper"></i> <span>Quản lý bài viết</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-utensils"></i> <span>Quản lý công thức</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-cogs"></i> <span>Quản lý hệ thống</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-flag"></i> <span>Quản lý tố cáo người dùng</span>
                </a>
            </li>
            <li class="nav-item">
                <a href="#" class="nav-link">
                    <i class="fas fa-list"></i> <span>Quản lý danh mục</span>
                </a>
            </li>
        </ul>

        <div class="sidebar-footer">
            <a href="{{ route('login') }}" class="logout-btn">
                <i class="fas fa-sign-out-alt"></i> <span>Đăng xuất</span>
            </a>
        </div>
    </aside>

    <main class="main-content">
        <div class="top-bar">
            <h2>@yield('header-title', 'Trang quản trị')</h2>
        </div>
        @yield('content')
    </main>

    <script>
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            const toggleIcon = document.querySelector('#toggleBtn i');
            
            sidebar.classList.toggle('collapsed');

            if (sidebar.classList.contains('collapsed')) {
                toggleIcon.classList.remove('fa-angles-left');
                toggleIcon.classList.add('fa-angles-right');
            } else {
                toggleIcon.classList.remove('fa-angles-right');
                toggleIcon.classList.add('fa-angles-left');
            }
        }
    </script>

</body>
</html>