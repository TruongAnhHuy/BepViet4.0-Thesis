@extends('layouts.guest')

@section('title', 'Đăng Ký Tài Khoản')

@section('content')
    <div class="icon-header"><i class="fas fa-user-plus"></i></div>

    <h2>Đăng Ký Tài Khoản</h2>
    <p class="subtitle">Trở thành thành viên Bếp Việt ngay hôm nay</p>

    <form action="{{ route('register') }}" method="POST">
        @csrf
        <div class="form-group">
            <label class="form-label">Tài khoản (Tên đăng nhập)</label>
            <div class="input-wrapper">
                <input type="text" name="username" class="form-input" placeholder="Nhập tên tài khoản" required>
                <i class="far fa-user input-icon"></i>
            </div>
        </div>

        <div class="form-group">
            <label class="form-label">Email</label>
            <div class="input-wrapper">
                <input type="email" name="email" class="form-input" placeholder="example@gmail.com" required>
                <i class="far fa-envelope input-icon"></i>
            </div>
        </div>

        <div class="form-group">
            <label class="form-label">Mật khẩu</label>
            <div class="input-wrapper">
                <input type="password" name="password" class="form-input" placeholder="******" required>
                <i class="far fa-eye-slash input-icon"></i>
            </div>
        </div>

        <div class="form-group">
            <label class="form-label">Xác nhận mật khẩu</label>
            <div class="input-wrapper">
                <input type="password" name="password_confirmation" class="form-input" placeholder="******" required>
                <i class="far fa-check-circle input-icon"></i>
            </div>
        </div>

        <button type="submit" class="btn-submit">Đăng Ký Ngay</button>
    </form>

    <div class="footer-links">
        Bạn đã có tài khoản ? <a href="{{ route('login') }}">Đăng nhập tại đây</a>
    </div>
@endsection