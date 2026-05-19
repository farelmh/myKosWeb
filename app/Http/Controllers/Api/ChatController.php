<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Conversation;
use App\Models\Message;

class ChatController extends Controller
{
    // 1. Mengambil daftar obrolan
    public function getConversations(Request $request)
    {
        // Nantinya kita ubah $userId dengan ID user yang sedang login
        $userId = 21; // Contoh statis dulu
        
        $conversations = Conversation::where('user_one_id', $userId)
            ->orWhere('user_two_id', $userId)
            ->get();

        return response()->json(['data' => $conversations]);
    }

    // 2. Mengambil riwayat pesan di satu obrolan
    public function getMessages($id)
    {
        $messages = Message::where('conversation_id', $id)->get();
        return response()->json(['data' => $messages]);
    }

    // 3. Mengirim pesan baru
    public function sendMessage(Request $request)
    {
        // Menyimpan pesan ke database
        $message = Message::create([
            'conversation_id' => $request->conversation_id,
            'sender_id' => $request->sender_id,
            'message' => $request->message,
            'is_read' => false
        ]);

        // TODO: Nanti kode untuk men-trigger Event/Broadcasting (Pusher) ditaruh di sini

        return response()->json([
            'message' => 'Pesan berhasil dikirim!',
            'data' => $message
        ]);
    }
}