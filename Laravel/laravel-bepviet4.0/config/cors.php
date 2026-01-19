<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'],

    // QUAN TRỌNG: Thay dấu * bằng địa chỉ chính xác của Frontend React
    // Nếu bạn chạy React ở cổng khác (ví dụ 5173 của Vite), hãy đổi số 3000 thành 5173
    'allowed_origins' => ['http://localhost:3000'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // QUAN TRỌNG: Phải là true để React gửi được Cookie/Token lên Server
    'supports_credentials' => true, 

];