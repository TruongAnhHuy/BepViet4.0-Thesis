<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    // USER + GUEST: xem FAQ đã duyệt
    public function index()
    {
        return response()->json(
            Faq::where('status', 1)->latest()->get()
        );
    }

    // USER: gửi câu hỏi
    public function store(Request $request)
    {
        $request->validate([
            'question' => 'required|string|max:255',
        ]);

        $faq = Faq::create([
            'question' => $request->question,
            'status' => 0
        ]);

        return response()->json([
            'message' => 'Gửi câu hỏi thành công, vui lòng chờ duyệt',
            'data' => $faq
        ], 201);
    }

    // ADMIN: trả lời
    public function update(Request $request, $id)
    {
        $faq = Faq::findOrFail($id);

        $faq->update([
            'answer' => $request->answer,
            'status' => 1
        ]);

        return response()->json(['message' => 'Đã trả lời']);
    }
}
