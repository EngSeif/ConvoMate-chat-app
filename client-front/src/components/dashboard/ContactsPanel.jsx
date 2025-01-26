import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useChatStore } from '@/store/useChatStore';
import SidebarSkeleton from '../sidebarSkeleton';
import { useAuthStore } from '@/store/useAuthStore';

/**
 * ContactPlace component represents an individual user in the contact list.
 * It shows the user's profile picture, name, and their online status.
 * When clicked, it sets the selected user to the one clicked.
 * @param {Object} props - The props for the ContactPlace component.
 * @param {Object} props.user - The user data to display.
 * @param {Array} props.onlineUsers - The list of online users' IDs.
 * @param {Object} props.selectedUser - The currently selected user.
 * @param {Function} props.setSelectedUser - The function to update the selected user.
 * @returns {JSX.Element} The rendered ContactPlace component.
 */
function ContactPlace({ user, onlineUsers, selectedUser, setSelectedUser }) {
    const isSelected = selectedUser?._id === user._id;  // Check if this user is the selected one

    return (
        <div
            className={`flex cursor-pointer gap-2 py-4 items-start px-2 text-black ${isSelected ? 'bg-blue-100' : ''}`}  // Highlight selected user
            onClick={() => setSelectedUser(user)}  // Update selected user on click
        >
            <div className="relative">
                {/* Display user profile picture */}
                <Image
                    src={user.profilePic || '/images/userDefault.png'}  // Default image if profilePic is unavailable
                    alt={user.fullName}
                    className="w-12 h-10 my-2 object-cover rounded-full"
                    width={60}
                    height={60}
                />
                {/* Display online status indicator */}
                {onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-1 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
                )}
            </div>
            {/* Display user details */}
            <div className="md:w-full hidden md:block">
                <h4 className="font-medium">{user.fullName}</h4>
                <div className="flex justify-between text-sm">
                    <span className="max-w-[75%] overflow-hidden text-ellipsis whitespace-nowrap">
                        {/* Show online/offline status */}
                        {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
                    </span>
                </div>
            </div>
        </div>
    );
}

/**
 * OptionsPanel component represents the sidebar panel that displays the user list.
 * It allows toggling the display of online users only and includes a search functionality.
 * @returns {JSX.Element} The rendered OptionsPanel component.
 */
function OptionsPanel() {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();  // Fetch chat-related state and methods
    const { onlineUsers } = useAuthStore();  // Fetch online users from the auth store
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);  // State for filtering online users only

    // Filter users based on whether the "showOnlineOnly" state is true
    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users;

    useEffect(() => {
        getUsers();  // Fetch the list of users when the component mounts
    }, [getUsers]);

    // Show skeleton loading screen while users are being loaded
    if (isUsersLoading) {
        return <SidebarSkeleton />;
    }

    return (
        <div className="md:w-[350px] w-[100px] bg-white h-screen flex-none">
            <div className="w-[90%] mx-auto">
                {/* Title of the panel */}
                <h2 className="text-2xl md:block hidden font-semibold py-6">Chats</h2>
                {/* Toggle for showing online users only */}
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className="cursor-pointer flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={showOnlineOnly}
                            onChange={(e) => setShowOnlineOnly(e.target.checked)}  // Toggle online-only filter
                        />
                        <span className="text-sm">Show online only</span>
                    </label>
                    {/* Display the number of online users */}
                    <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
                </div>
                {/* Display the list of users */}
                <div className="flex flex-col overflow-y-scroll max-h-[800px] custom-chats-scrollbar md:items-stretch items-center ">
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                            <ContactPlace key={user._id} user={user} onlineUsers={onlineUsers} selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
                        ))
                    ) : (
                        <p className='my-4'>No recent chats available.</p>  // Message when no users are found
                    )}
                </div>
            </div>
        </div>
    );
}

export default OptionsPanel;
