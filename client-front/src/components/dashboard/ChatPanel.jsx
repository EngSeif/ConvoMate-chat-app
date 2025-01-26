import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPaperPlane,
    faImage,
    faCheckDouble
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import styles from '@/styles/chatPanel/chat.module.css'
import { useEffect, useRef, useState } from 'react';
import { useChatStore } from '@/store/useChatStore';
import { useAuthStore } from '@/store/useAuthStore';
import toast from 'react-hot-toast';
import MessageSkeleton from '../messageSkeleton';

function formatDateToAMPM(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true
    });
}

function SendMessage({ message }) {
    const { authUser } = useAuthStore()
    return (
        <>
            <div className='my-4'>
                <div className='flex w-full justify-end'>
                    <div className='w-fit max-w-1/2 mx-2'>
                        <div className='bg-[#CCE2D3] px-2 py-2'>
                            {message.image &&
                                <div className='flex justify-start'>
                                    <img
                                        src={message.image}
                                        alt="preview"
                                        className="w-36 h-36 mr-40 my-2 object-cover rounded-lg border border-zinc-700"
                                    />
                                </div>
                            }
                            {message.text}
                        </div>
                        <div className='flex justify-end items-center gap-2 text-sm my-2'>
                            <span>
                                {formatDateToAMPM(message.createdAt)}
                            </span>
                            <span>
                                You
                            </span>
                        </div>
                    </div>
                    <div className='flex flex-col justify-end mr-2 pb-2'>
                        <Image
                            src={authUser.profilePic || '/images/userDefault.png'}
                            alt='JohnDoe'
                            className="w-6 h-6 object-cover rounded-full"
                            width={60}
                            height={60}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

function ReceiveMessage({ message }) {
    const { selectedUser } = useChatStore()
    return (
        <>
            <div>
                <div className='flex w-full'>
                    <div className='flex flex-col justify-end ml-2 pb-2'>
                        <Image
                            src={selectedUser.profilePic || '/images/userDefault.png'}
                            alt='JohnDoe'
                            className="w-6 h-6 object-cover rounded-full"
                            width={60}
                            height={60}
                        />
                    </div>
                    <div className='w-fit max-w-1/2 mx-2'>
                        <div className='bg-white px-2 py-2'>
                            {message.image &&
                                <div className='flex justify-start'>
                                    <img
                                        src={message.image}
                                        alt="preview"
                                        className="w-36 h-36 mr-40 my-2 object-cover rounded-lg border border-zinc-700"
                                    />
                                </div>
                            }
                            {message.text}
                        </div>
                        <div className='flex items-center gap-2 text-sm my-2'>
                            <span>
                            </span>
                            <span>
                                {formatDateToAMPM(message.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function MessageInput() {
    const [text, setText] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const fileInputRef = useRef(null)
    const { sendMessage } = useChatStore()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file.type.startsWith("image/")) {
            toast.error("please select an image file");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result)
        };
        reader.readAsDataURL(file);
    }

    const removeImage = () => {
        setImagePreview(null)
        if (fileInputRef.current) fileInputRef.current.value = "";
    }

    const handleSendMessage = async (e) => {
        if (!text.trim() && !imagePreview)
            return;
        try {
            await sendMessage({
                text: text.trim(),
                image: imagePreview
            });
            setText("")
            setImagePreview(null)
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.log("failed to send message: ", error.message)
        }
    }

    return (
        <div className="h-[18%] w-full flex flex-col justify-end">
            <div className='w-[95%] ml-4 mb-2'>
                {imagePreview && (
                    <div className="relative inline-block">
                        <img
                            src={imagePreview}
                            alt="preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={() => removeImage(null)}  // Assuming you have a function to clear the image preview
                            className="absolute top-0 right-0 bg-gray-700 text-white rounded-full p-1 text-xs"
                        >
                            X
                        </button>
                    </div>
                )}

            </div>
            <div className='flex items-center justify-center gap-3'>
                <input type="text"
                    value={text || ""}
                    onChange={(e) => setText(e.target.value)}
                    className='focus:border-none focus:outline-none w-[90%] px-4 py-2 bg-[#F6F6F9] rounded-md'
                    placeholder="Send Message..." />
                <label className="inline-block cursor-pointer">
                    <FontAwesomeIcon
                        className="text-white bg-[#4eac6d] px-2 py-2 border-solid border-2 border-[#4eac6d] hover:bg-transparent hover:text-[#4eac6d] rounded-md duration-200"
                        icon={faImage}
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept='image/*'
                        ref={fileInputRef}
                        className="hidden"
                    />
                </label>
                <FontAwesomeIcon onClick={handleSendMessage} className='text-white bg-[#4eac6d] px-2 py-2 border-solid border-2 border-[#4eac6d] hover:bg-transparent hover:text-[#4eac6d] rounded-md duration-200 cursor-pointer' icon={faPaperPlane} />
            </div>
        </div>
    )
}

function Chat() {
    const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore()
    const { onlineUsers, authUser } = useAuthStore();
    const messageEndRef = useRef(null)

    useEffect(() => {
        getMessages(selectedUser?._id);
        subscribeToMessages()
        return () => unsubscribeFromMessages();
    }, [getMessages, selectedUser?._id, subscribeToMessages, unsubscribeFromMessages])

    useEffect(() => {
        console.log("do")
        console.log(messages); // Log the messages to verify they're being updated
        if (messageEndRef.current && messages) {
            console.log("insideDo")
            messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className='flex-1 flex flex-col overflow-auto'>
                <MessageSkeleton />
            </div>
        )
    }

    if (!selectedUser) {
        return (
            <div className={styles.ChatMessagesBg}>
                <div className='h-full bg-[#F2F2F2]/40 w-full flex justify-center items-center'>
                    <div className='flex flex-col items-center'>
                        <img
                            src='/images/chat.png'
                            alt="preview"
                            className="w-32 h-32 my-2 object-cover"
                        />
                        <h2 className='text-3xl font-semibold'>
                            Welcome to ConvoMate
                        </h2>
                        <h3>Select a Chat to Get Started</h3>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={styles.ChatMessagesBg}>
                <div className='h-full bg-[#F2F2F2]/40 w-full'>
                    <div className="h-[8%] bg-white bg-opacity-50 backdrop-blur-2xl">
                        {
                            <div className='w-[95%] mx-auto py-4 flex justify-between items-center'>
                                <div className='flex gap-2 items-center'>
                                    <div>
                                        <Image
                                            src={selectedUser?.profilePic || '/images/userDefault.png'}
                                            alt='JohnDoe'
                                            className="w-10 h-10 object-cover rounded-full"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <h3 className='text-lg font-semibold'>{selectedUser?.fullName}</h3>
                                        <h4 className='text-sm'>{onlineUsers.includes(selectedUser?._id) ? 'Online' : 'Offline'}</h4>
                                    </div>
                                </div>
                            </div>}
                    </div>
                    <div className="h-[72%] py-4 overflow-y-scroll custom-chats-scrollbar" ref={messageEndRef}>
                        {(
                            <>
                                {messages.map((message) => {
                                    if (message.senderId === authUser?._id) {
                                        return <SendMessage key={message._id} message={message} ref={messageEndRef} />;
                                    } else {
                                        return <ReceiveMessage key={message._id} message={message} ref={messageEndRef} />;
                                    }
                                })}
                            </>
                        )}
                    </div>
                    <MessageInput />
                </div>
            </div>
        </>
    )
}

export default Chat;