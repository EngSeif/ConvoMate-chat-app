/**
 * MessageSkeleton - A skeleton loader for the message chat interface, simulating loading chat messages.
 * 
 * This component renders a skeleton loader UI for a chat, displaying placeholder elements for the 
 * chat messages, avatars, and headers. It is used to provide a loading state while the actual chat data
 * is being fetched or loaded.
 * 
 * @returns {JSX.Element} The skeleton loader for the message chat interface.
 */
const MessageSkeleton = () => {
    // Create an array of 6 skeleton items to simulate loading messages
    const skeletonMessages = Array(6).fill(null);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 mx-auto w-[90%]">
            {skeletonMessages.map((_, idx) => (
                <div key={idx} className={`chat ${idx % 2 === 0 ? "chat-start" : "chat-end"}`}>
                    {/* Avatar Skeleton - Circular placeholder for user avatar */}
                    <div className="chat-image avatar">
                        <div className="size-10 rounded-full">
                            <div className="skeleton w-full h-full rounded-full" />
                        </div>
                    </div>

                    {/* Header Skeleton - Placeholder for message header */}
                    <div className="chat-header mb-1">
                        <div className="skeleton h-4 w-full" />
                    </div>

                    {/* Message Bubble Skeleton - Placeholder for message content */}
                    <div className="chat-bubble bg-transparent p-0">
                        <div className="skeleton h-16" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageSkeleton;
