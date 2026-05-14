import OwnerLayout from "@/Layouts/OwnerLayout";
import { useState } from "react";
import {
    Search,
    Send,
    MoreVertical,
    Paperclip,
    Smile,
    User,
} from "lucide-react";

const conversations = [
    {
        id: 1,
        name: "Rizky Ramadhan",
        room: "Kamar A1",
        lastMessage: "Apakah kamar masih tersedia?",
        time: "10:30",
        unread: 2,
    },
    {
        id: 2,
        name: "Nadia Putri",
        room: "Kamar B2",
        lastMessage: "Saya ingin booking bulan depan.",
        time: "09:15",
        unread: 0,
    },
    {
        id: 3,
        name: "Andi Saputra",
        room: "Kamar C1",
        lastMessage: "Bisa lihat fasilitas kosnya?",
        time: "Kemarin",
        unread: 1,
    },
];

const messagesData = [
    {
        id: 1,
        sender: "tenant",
        text: "Halo kak, apakah kamar masih tersedia?",
        time: "10:25",
    },
    {
        id: 2,
        sender: "owner",
        text: "Halo, masih tersedia untuk Kamar A1.",
        time: "10:27",
    },
    {
        id: 3,
        sender: "tenant",
        text: "Kalau saya mau survey dulu boleh?",
        time: "10:30",
    },
];

export default function Messages() {
    const [selectedChat, setSelectedChat] = useState(conversations[0]);
    const [messages, setMessages] = useState(messagesData);
    const [message, setMessage] = useState("");

    const sendMessage = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        setMessages([
            ...messages,
            {
                id: Date.now(),
                sender: "owner",
                text: message,
                time: "Baru saja",
            },
        ]);

        setMessage("");
    };

    return (
        <OwnerLayout>
            <div className="min-h-screen bg-background dark:bg-dark-bg p-6">
                <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-48px)]">

                    {/* LEFT CHAT LIST */}
                    <div className="bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 rounded-2xl overflow-hidden flex flex-col">
                        <div className="p-5 border-b border-mint-200 dark:border-dark-border/20">
                            <h1 className="text-xl font-bold text-kost-dark dark:text-mint-50">
                                Chat Penyewa
                            </h1>
                            <p className="text-sm text-kost-muted dark:text-mint-100/40 mt-1">
                                Kelola pesan dari calon penyewa
                            </p>

                            <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20">
                                <Search className="w-4 h-4 text-kost-muted dark:text-mint-100/40" />
                                <input
                                    placeholder="Cari penyewa..."
                                    className="w-full bg-transparent border-0 outline-none focus:ring-0 text-sm text-kost-dark dark:text-mint-50 placeholder:text-kost-muted/50"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto">
                            {conversations.map((chat) => {
                                const active = selectedChat.id === chat.id;

                                return (
                                    <button
                                        key={chat.id}
                                        onClick={() => setSelectedChat(chat)}
                                        className={`w-full p-4 flex items-start gap-3 border-b border-mint-200 dark:border-dark-border/20 text-left transition ${
                                            active
                                                ? "bg-mint-50 dark:bg-dark-bg"
                                                : "hover:bg-mint-50 dark:hover:bg-dark-bg"
                                        }`}
                                    >
                                        <div className="w-11 h-11 rounded-full bg-mint-200 dark:bg-mint-200/20 flex items-center justify-center text-kost-dark dark:text-mint-50 font-semibold">
                                            {chat.name.charAt(0)}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between gap-2">
                                                <h3 className="text-sm font-semibold text-kost-dark dark:text-mint-50 truncate">
                                                    {chat.name}
                                                </h3>
                                                <span className="text-xs text-kost-muted dark:text-mint-100/30">
                                                    {chat.time}
                                                </span>
                                            </div>

                                            <p className="text-xs text-kost-muted dark:text-mint-100/40 mt-0.5">
                                                {chat.room}
                                            </p>

                                            <div className="flex justify-between items-center mt-1 gap-2">
                                                <p className="text-sm text-kost-muted dark:text-mint-100/50 truncate">
                                                    {chat.lastMessage}
                                                </p>

                                                {chat.unread > 0 && (
                                                    <span className="w-5 h-5 rounded-full bg-mint-300 text-white text-[10px] flex items-center justify-center font-bold">
                                                        {chat.unread}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT CHAT ROOM */}
                    <div className="lg:col-span-2 bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 rounded-2xl overflow-hidden flex flex-col">

                        {/* HEADER */}
                        <div className="p-5 border-b border-mint-200 dark:border-dark-border/20 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-mint-200 dark:bg-mint-200/20 flex items-center justify-center text-kost-dark dark:text-mint-50 font-semibold">
                                    {selectedChat.name.charAt(0)}
                                </div>

                                <div>
                                    <h2 className="text-sm font-semibold text-kost-dark dark:text-mint-50">
                                        {selectedChat.name}
                                    </h2>
                                    <p className="text-xs text-kost-muted dark:text-mint-100/40">
                                        {selectedChat.room}
                                    </p>
                                </div>
                            </div>

                            <button className="p-2 rounded-lg hover:bg-mint-50 dark:hover:bg-dark-bg transition">
                                <MoreVertical className="w-5 h-5 text-kost-muted dark:text-mint-100/50" />
                            </button>
                        </div>

                        {/* MESSAGES */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-mint-50/50 dark:bg-dark-bg/40">
                            {messages.map((msg) => {
                                const isOwner = msg.sender === "owner";

                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex ${
                                            isOwner ? "justify-end" : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                                                isOwner
                                                    ? "bg-mint-300 text-white rounded-br-md"
                                                    : "bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 text-kost-dark dark:text-mint-50 rounded-bl-md"
                                            }`}
                                        >
                                            <p className="text-sm leading-relaxed">
                                                {msg.text}
                                            </p>
                                            <p
                                                className={`text-[10px] mt-1 ${
                                                    isOwner
                                                        ? "text-white/70"
                                                        : "text-kost-muted dark:text-mint-100/30"
                                                }`}
                                            >
                                                {msg.time}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* INPUT */}
                        <form
                            onSubmit={sendMessage}
                            className="p-4 border-t border-mint-200 dark:border-dark-border/20 bg-white dark:bg-dark-card"
                        >
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    className="p-2 rounded-xl hover:bg-mint-50 dark:hover:bg-dark-bg transition"
                                >
                                    <Paperclip className="w-5 h-5 text-kost-muted dark:text-mint-100/40" />
                                </button>

                                <div className="flex-1 flex items-center gap-2 px-4 py-2 rounded-2xl bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20">
                                    <input
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Tulis pesan..."
                                        className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-sm text-kost-dark dark:text-mint-50 placeholder:text-kost-muted/50"
                                    />

                                    <Smile className="w-5 h-5 text-kost-muted dark:text-mint-100/40" />
                                </div>

                                <button
                                    type="submit"
                                    className="p-3 rounded-2xl bg-mint-300 hover:bg-secondary text-white transition"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </OwnerLayout>
    );
}