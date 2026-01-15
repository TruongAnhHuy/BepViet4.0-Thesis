@extends('layouts.admin')

@section('title', 'Quản lý User')
@section('header-title', 'Quản lý thông tin User')

@section('content')
<style>
    .table-container {
        background-color: #dadada; 
        border-radius: 8px;
        padding: 20px;
        height: 300px; 
        overflow-y: auto; 
        margin-bottom: 30px;
        box-shadow: inset 0 0 10px rgba(0,0,0,0.05);
    }

    .custom-table {
        width: 100%;
        border-collapse: collapse;
        background-color: #fff; 
        border-radius: 4px;
        overflow: hidden;
    }
    
    .custom-table th, .custom-table td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #eee;
        font-size: 14px;
    }

    .custom-table th {
        background-color: #555;
        color: #fff;
        font-weight: 600;
        position: sticky; top: 0; 
    }

    .custom-table tr:hover {
        background-color: #f1f1f1;
        cursor: pointer;
    }

    
    .form-title {
        text-align: center;
        font-weight: 600;
        margin-bottom: 20px;
        color: #333;
    }

    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr; 
        column-gap: 50px;
        row-gap: 20px;
        margin-bottom: 30px;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    .form-label {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 8px;
        color: #444;
    }

    .form-input {
        padding: 12px 15px;
        background-color: #e6e6e6;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        color: #333;
        outline: none;
        transition: 0.2s;
    }

    .form-input:focus {
        background-color: #fff;
        box-shadow: 0 0 0 2px #Cbbb68;
    }

    
    .input-readonly {
        background-color: #d0d0d0;
        cursor: not-allowed;
    }

    
    .button-group {
        display: flex;
        justify-content: center; 
        gap: 30px; 
        margin-top: 10px;
    }

    .btn-action {
        background-color: #222; 
        color: #fff;
        border: none;
        padding: 12px 40px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, opacity 0.2s;
    }

    .btn-action:hover {
        opacity: 0.9;
        transform: translateY(-2px);
    }

    
    .btn-delete { background-color: #222; } 
    .btn-reset { background-color: #444; }

</style>

<div class="user-management-container">
    
    <div class="table-container">
        <table class="custom-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Created at</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Nguyễn Văn A</td>
                    <td>a.nguyen@example.com</td>
                    <td><span style="color:green; font-weight:bold">Active</span></td>
                    <td>12/01/2026</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Trần Thị B</td>
                    <td>b.tran@example.com</td>
                    <td><span style="color:red; font-weight:bold">Banned</span></td>
                    <td>10/01/2026</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Lê Văn C</td>
                    <td>c.le@example.com</td>
                    <td>Active</td>
                    <td>05/01/2026</td>
                </tr>
                <tr><td>4</td><td>User Test</td><td>test@gmail.com</td><td>Active</td><td>01/01/2026</td></tr>
                <tr><td>5</td><td>User Demo</td><td>demo@gmail.com</td><td>Active</td><td>01/01/2026</td></tr>
                <tr><td>6</td><td>User Mock</td><td>mock@gmail.com</td><td>Banned</td><td>01/01/2026</td></tr>
            </tbody>
        </table>
    </div>

    <h3 class="form-title">Thông tin user</h3>

    <form action="" method="POST">
        @csrf
        <div class="form-grid">
            <div class="col-left">
                <div class="form-group">
                    <label class="form-label">Name</label>
                    <input type="text" class="form-input" placeholder="Nhập họ tên...">
                </div>
                
                <div class="form-group" style="margin-top: 20px;">
                    <label class="form-label">ID</label>
                    <input type="text" class="form-input input-readonly" value="Auto-generated" readonly>
                </div>

                <div class="form-group" style="margin-top: 20px;">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-input" placeholder="********">
                </div>
            </div>

            <div class="col-right">
                <div class="form-group">
                    <label class="form-label">Status</label>
                    <select class="form-input">
                        <option value="active">Active</option>
                        <option value="banned">Banned</option>
                    </select>
                </div>

                <div class="form-group" style="margin-top: 20px;">
                    <label class="form-label">Email</label>
                    <input type="email" class="form-input" placeholder="user@example.com">
                </div>

                <div class="form-group" style="margin-top: 20px;">
                    <label class="form-label">Created at</label>
                    <input type="text" class="form-input input-readonly" value="15/01/2026" readonly>
                </div>
            </div>
        </div>

        <div class="button-group">
            <button type="button" class="btn-action">Thêm</button>
            <button type="button" class="btn-action btn-delete">Xóa</button>
            <button type="reset" class="btn-action btn-reset">Reset</button>
            <button type="submit" class="btn-action">Sửa</button>
        </div>
    </form>

</div>
@endsection