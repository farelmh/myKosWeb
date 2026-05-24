import OwnerLayout from "@/Layouts/OwnerLayout";
import { useState } from "react";
import {
    Search,
    Send,
    MoreVertical,
    Paperclip,
    Smile,
    ArrowLeft,
    MessageCircle,
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

const Avatar = ({ name, size = "md" }) => {
    const avatarSize = size === "sm" ? "w-9 h-9" : "w-11 h-11";

    return (
        <div
            className={`
                ${avatarSize} rounded-full flex-shrink-0
                bg-mint-200 dark:bg-mint-200/20
                flex items-center justify-center
                text-kost-dark dark:text-mint-50
                font-semibold capitalize
            `}
        >
            {name?.charAt(0) || "?"}
        </div>
    );
};

export default function Messages() {
    const [selectedChat, setSelectedChat] = useState(conversations[0]);
    const [messages, setMessages] = useState(messagesData);
    const [message, setMessage] = useState("");
    const [showChatRoom, setShowChatRoom] = useState(false);

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setShowChatRoom(true);
    };

    const sendMessage = (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        setMessages((prev) => [
            ...prev,
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
            <div className="h-[calc(100vh-96px)] md:h-[calc(100vh-112px)]">
                <div className="grid lg:grid-cols-3 gap-4 h-full">

                    {/* LEFT CHAT LIST */}
                    <div
                        className={`
                            bg-white dark:bg-dark-card
                            border border-mint-200 dark:border-dark-border/20
                            rounded-2xl overflow-hidden flex flex-col
                            ${showChatRoom ? "hidden lg:flex" : "flex"}
                        `}
                    >
                        <div className="p-4 md:p-5 border-b border-mint-200 dark:border-dark-border/20">
                            <h1 className="text-lg md:text-xl font-bold text-kost-dark dark:text-mint-50">
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
                            {conversations.length > 0 ? (
                                conversations.map((chat) => {
                                    const active = selectedChat?.id === chat.id;

                                    return (
                                        <button
                                            key={chat.id}
                                            type="button"
                                            onClick={() => handleSelectChat(chat)}
                                            className={`
                                                w-full p-4 flex items-start gap-3
                                                border-b border-mint-200 dark:border-dark-border/20
                                                text-left transition
                                                ${
                                                    active
                                                        ? "bg-mint-50 dark:bg-dark-bg"
                                                        : "hover:bg-mint-50 dark:hover:bg-dark-bg"
                                                }
                                            `}
                                        >
                                            <Avatar name={chat.name} />

                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between gap-2">
                                                    <h3 className="text-sm font-semibold text-kost-dark dark:text-mint-50 truncate">
                                                        {chat.name}
                                                    </h3>

                                                    <span className="text-xs text-kost-muted dark:text-mint-100/30 flex-shrink-0">
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
                                                        <span className="w-5 h-5 rounded-full bg-mint-300 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0">
                                                            {chat.unread}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center gap-2 text-center px-6">
                                    <MessageCircle className="w-10 h-10 text-mint-200 dark:text-mint-200/30" />
                                    <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                        Belum ada pesan
                                    </p>
                                    <p className="text-xs text-kost-muted dark:text-mint-100/40">
                                        Pesan dari calon penyewa akan muncul di sini.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT CHAT ROOM */}
                    <div
                        className={`
                            lg:col-span-2
                            bg-white dark:bg-dark-card
                            border border-mint-200 dark:border-dark-border/20
                            rounded-2xl overflow-hidden flex flex-col
                            ${showChatRoom ? "flex" : "hidden lg:flex"}
                        `}
                    >
                        {selectedChat ? (
                            <>
                                {/* HEADER */}
                                <div className="p-4 md:p-5 border-b border-mint-200 dark:border-dark-border/20 flex items-center justify-between">
                                    <div className="flex items-center gap-3 min-w-0">
                                        <button
                                            type="button"
                                            onClick={() => setShowChatRoom(false)}
                                            className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-mint-50 dark:hover:bg-dark-bg transition"
                                        >
                                            <ArrowLeft className="w-5 h-5 text-kost-muted dark:text-mint-100/50" />
                                        </button>

                                        <Avatar name={selectedChat.name} />

                                        <div className="min-w-0">
                                            <h2 className="text-sm font-semibold text-kost-dark dark:text-mint-50 truncate">
                                                {selectedChat.name}
                                            </h2>

                                            <p className="text-xs text-kost-muted dark:text-mint-100/40 truncate">
                                                {selectedChat.room}
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        className="p-2 rounded-lg hover:bg-mint-50 dark:hover:bg-dark-bg transition"
                                    >
                                        <MoreVertical className="w-5 h-5 text-kost-muted dark:text-mint-100/50" />
                                    </button>
                                </div>

                                {/* MESSAGES */}
                                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-mint-50/50 dark:bg-dark-bg/40">
                                    {messages.map((msg) => {
                                        const isOwner = msg.sender === "owner";

                                        return (
                                            <div
                                                key={msg.id}
                                                className={`flex ${
                                                    isOwner
                                                        ? "justify-end"
                                                        : "justify-start"
                                                }`}
                                            >
                                                <div
                                                    className={`
                                                        max-w-[85%] sm:max-w-[75%]
                                                        rounded-2xl px-4 py-3
                                                        ${
                                                            isOwner
                                                                ? "bg-mint-300 text-white rounded-br-md"
                                                                : "bg-white dark:bg-dark-card border border-mint-200 dark:border-dark-border/20 text-kost-dark dark:text-mint-50 rounded-bl-md"
                                                        }
                                                    `}
                                                >
                                                    <p className="text-sm leading-relaxed">
                                                        {msg.text}
                                                    </p>

                                                    <p
                                                        className={`
                                                            text-[10px] mt-1
                                                            ${
                                                                isOwner
                                                                    ? "text-white/70"
                                                                    : "text-kost-muted dark:text-mint-100/30"
                                                            }
                                                        `}
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
                                    className="p-3 md:p-4 border-t border-mint-200 dark:border-dark-border/20 bg-white dark:bg-dark-card"
                                >
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <button
                                            type="button"
                                            className="hidden sm:block p-2 rounded-xl hover:bg-mint-50 dark:hover:bg-dark-bg transition"
                                        >
                                            <Paperclip className="w-5 h-5 text-kost-muted dark:text-mint-100/40" />
                                        </button>

                                        <div className="flex-1 flex items-center gap-2 px-3 md:px-4 py-2 rounded-2xl bg-mint-50 dark:bg-dark-bg border border-mint-200 dark:border-dark-border/20">
                                            <input
                                                value={message}
                                                onChange={(e) =>
                                                    setMessage(e.target.value)
                                                }
                                                placeholder="Tulis pesan..."
                                                className="flex-1 bg-transparent border-0 outline-none focus:ring-0 text-sm text-kost-dark dark:text-mint-50 placeholder:text-kost-muted/50"
                                            />

                                            <Smile className="hidden sm:block w-5 h-5 text-kost-muted dark:text-mint-100/40" />
                                        </div>

                                        <button
                                            type="submit"
                                            className="p-3 rounded-2xl bg-mint-300 hover:bg-secondary text-white transition flex-shrink-0"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center gap-2 text-center px-6">
                                <MessageCircle className="w-12 h-12 text-mint-200 dark:text-mint-200/30" />
                                <p className="text-sm font-medium text-kost-dark dark:text-mint-50">
                                    Pilih percakapan
                                </p>
                                <p className="text-xs text-kost-muted dark:text-mint-100/40">
                                    Pilih chat di sebelah kiri untuk mulai membalas.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </OwnerLayout>
    );
}