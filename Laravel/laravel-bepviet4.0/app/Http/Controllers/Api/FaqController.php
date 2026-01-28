<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Faq;

class FaqController extends Controller
{
    // USER xem FAQ đã trả lời
    public function index()
    {
        return Faq::where('status', 1)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    // USER gửi câu hỏi
    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:100',
            'email'    => 'required|email|max:100',
            'question' => 'required|string|max:500',
        ]);

        Faq::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'question' => $request->question,
            'answer'   => null,
            'status'   => 0
        ]);

        return response()->json([
            'message' => 'Câu hỏi đã được gửi'
        ], 201);
    }

    // ADMIN xem tất cả FAQ
    public function adminIndex()
    {
        return Faq::orderBy('created_at', 'desc')->get();
    }

    // ADMIN trả lời FAQ
    public function answer(Request $request, $id)
    {
        $request->validate([
            'answer' => 'required|string'
        ]);

        $faq = Faq::findOrFail($id);
        $faq->answer = $request->answer;
        $faq->status = 1;
        $faq->save();

        return response()->json([
            'message' => 'Đã trả lời FAQ'
        ]);
    }
}
