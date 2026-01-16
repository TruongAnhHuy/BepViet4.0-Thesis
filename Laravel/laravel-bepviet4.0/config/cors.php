<?php

return [

    // config/cors.php

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Đừng quên sanctum/csrf-cookie
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'], // Cổng React của bạn
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // BẮT BUỘC để login được
];

