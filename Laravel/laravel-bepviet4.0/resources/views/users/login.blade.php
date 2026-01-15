@extends('layouts.guest')

@section('title', 'Đăng Nhập')

@section('content')
    <div class="icon-header"><i class="fas fa-utensils"></i></div>

    <h2>Chào mừng bạn trở lại</h2>
    <p class="subtitle">Khám phá hương vị Việt Nam</p>

    <form action="{{ route('login') }}" method="POST">
        @csrf
        
        <div class="form-group">
            <label class="form-label">Email hoặc Số điện thoại</label>
            <div class="input-wrapper">
                <input type="text" name="email" class="form-input" placeholder="Nhập email hoặc số điện thoại" required>
                <i class="far fa-user input-icon"></i>
            </div>
            @error('email') <div class="error-msg">{{ $message }}</div> @enderror
        </div>

        <div class="form-group">
            <label class="form-label">Mật Khẩu</label>
            <div class="input-wrapper">
                <input type="password" name="password" class="form-input" placeholder="Nhập mật khẩu" required>
                <i class="far fa-eye input-icon"></i>
            </div>
            @error('password') <div class="error-msg">{{ $message }}</div> @enderror
        </div>

        <button type="submit" class="btn-submit">Đăng Nhập</button>
    </form>

    <div class="footer-links">
        Bạn chưa có tài khoản ? <a href="{{ route('register') }}">Đăng ký tại đây</a> <br>
        <a href="#" style="display:block; margin-top:5px; color: #666;">Quên mật khẩu ?</a>
    </div>
@endsection