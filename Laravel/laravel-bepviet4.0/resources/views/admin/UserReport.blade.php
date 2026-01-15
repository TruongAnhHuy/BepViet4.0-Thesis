@extends('layouts.admin') 

@section('title', 'Quản lý tố cáo')
@section('header-title', 'Trang quản lý tố cáo người dùng')

@section('content')
<style>
    
    .search-wrapper {
        margin-bottom: 40px;
    }
    .search-input {
        width: 100%;
        padding: 15px 30px;
        border-radius: 50px;
        border: none;
        background-color: #dadada; 
        font-style: italic;
        font-size: 16px;
        color: #555;
        outline: none;
        transition: background 0.3s;
    }
    .search-input:focus {
        background-color: #e0e0e0;
        box-shadow: 0 0 5px rgba(0,0,0,0.1);
    }

   
    .report-card {
        background-color: #dadada; 
        padding: 25px;
        border-radius: 8px;
        margin-bottom: 25px;
        position: relative; 
    }

    
    .report-header {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .user-icon-large {
        font-size: 40px;
        margin-right: 20px;
        color: #333;
    }

    .user-name-box {
        background-color: #fff;
        padding: 10px 20px;
        min-width: 200px;
        font-weight: 600;
        color: #333;
        border-radius: 4px; 
        display: inline-block;
    }

    .status-badge {
        position: absolute;
        top: 25px;
        right: 25px;
        background-color: #fff;
        padding: 8px 15px;
        font-size: 12px;
        font-weight: bold;
        color: #555;
        border-radius: 4px;
    }

    
    .reason-box {
        background-color: #fff;
        width: 100%;
        min-height: 80px;
        padding: 20px;
        display: flex;
        align-items: center; 
        margin-bottom: 20px;
        color: #333;
        border-radius: 4px;
    }

   
    .action-buttons {
        display: flex;
        justify-content: flex-end; 
        gap: 15px; 
    }

    .btn {
        padding: 10px 30px;
        border: none;
        border-radius: 5px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
        transition: opacity 0.2s;
    }
    .btn:hover { opacity: 0.9; }

    .btn-ban {
        background-color: #ff3b30; 
    }
    
    .btn-reject {
        background-color: #222; 
    }

</style>

<div class="report-container">
    
    <div class="search-wrapper">
        <input type="text" class="search-input" placeholder="Tìm kiếm người dùng...">
    </div>

    <div class="report-card">
        <div class="report-header">
            <i class="far fa-user user-icon-large"></i>
            <div class="user-name-box">Nguyễn Văn A</div>
            <div class="status-badge">Trạng thái tố cáo</div>
        </div>

        <div class="reason-box">
            Spam bình luận quảng cáo quá nhiều lần trong bài viết Phở Bò.
        </div>

        <div class="action-buttons">
            <button class="btn btn-ban">Cấm</button>
            <button class="btn btn-reject">Từ chối</button>
        </div>
    </div>

    <div class="report-card">
        <div class="report-header">
            <i class="far fa-user user-icon-large"></i>
            <div class="user-name-box">Trần Thị B</div>
            <div class="status-badge">Trạng thái tố cáo</div>
        </div>

        <div class="reason-box">
            Sử dụng ngôn từ không phù hợp, đả kích người khác.
        </div>

        <div class="action-buttons">
            <button class="btn btn-ban">Cấm</button>
            <button class="btn btn-reject">Từ chối</button>
        </div>
    </div>

</div>
@endsection