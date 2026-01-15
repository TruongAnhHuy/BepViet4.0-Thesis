@extends('layouts.admin')

@section('title', 'Trang chủ Admin')
@section('header-title', 'Tổng quan hệ thống')

@section('content')
    <style>
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .stat-card { background: white; padding: 20px; border-radius: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 5px solid #Cbbb68; }
        .content-placeholder { background: #fff; border-radius: 15px; padding: 40px; margin-top: 20px; min-height: 400px; border: 2px dashed #ddd; display: flex; justify-content: center; align-items: center; color: #ccc;}
    </style>

    <div class="stats-grid">
        <div class="stat-card">
            <h3>Người dùng</h3>
            <p style="font-size: 24px; font-weight: bold;">1,250</p>
        </div>
        <div class="stat-card">
            <h3>Bài viết</h3>
            <p style="font-size: 24px; font-weight: bold;">450</p>
        </div>
        <div class="stat-card">
            <h3>Công thức</h3>
            <p style="font-size: 24px; font-weight: bold;">89</p>
        </div>
    </div>

    <div class="content-placeholder">
        Biểu đồ thống kê sẽ nằm ở đây
    </div>
@endsection