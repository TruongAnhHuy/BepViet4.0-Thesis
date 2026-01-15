<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Bếp Việt')</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        /* --- COPY TOÀN BỘ CSS VÀO ĐÂY --- */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            display: flex; justify-content: center; align-items: center;
            min-height: 100vh;
        }
        
        /* Class chung cho Card (Khung chứa) */
        .auth-card {
            background-color: #cbbb68; /* Màu vàng Olive */
            width: 420px;
            padding: 40px 30px;
            border-radius: 40px;
            text-align: center;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            position: relative;
        }

        /* Các thành phần con */
        .icon-header {
            background-color: #e2a6ac; width: 50px; height: 50px;
            margin: 0 auto 15px; border-radius: 12px;
            display: flex; justify-content: center; align-items: center;
            color: white; font-size: 24px;
        }
        h2 { margin-bottom: 5px; text-transform: uppercase; color: #000; font-size: 22px; letter-spacing: 1px; }
        .subtitle { font-size: 13px; color: #333; margin-bottom: 25px; }
        
        .form-group { text-align: left; margin-bottom: 15px; }
        .form-label { font-weight: bold; font-size: 14px; margin-bottom: 5px; display: block; color: #000; }
        
        .input-wrapper { position: relative; }
        .form-input {
            width: 100%; padding: 12px 45px 12px 20px;
            border-radius: 25px; border: none; outline: none;
            background-color: #fcebeb; /* Màu hồng phấn */
            font-size: 14px; font-style: italic;
        }
        .input-icon { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); color: #000; font-size: 18px; }
        
        .btn-submit {
            background-color: #a2e8ea; /* Màu xanh ngọc */
            width: 100%; padding: 12px; border-radius: 25px; border: none;
            font-weight: bold; font-size: 16px; text-transform: uppercase;
            cursor: pointer; margin-top: 15px; margin-bottom: 15px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .btn-submit:hover { opacity: 0.9; }
        
        .footer-links { font-size: 13px; color: #444; font-style: italic; }
        .footer-links a { color: #d65db1; text-decoration: none; }
        .error-msg { color: #d93025; font-size: 12px; margin-top: 5px; margin-left: 10px; }
    </style>
</head>
<body>

    <div class="auth-card">
        @yield('content')
    </div>

</body>
</html>