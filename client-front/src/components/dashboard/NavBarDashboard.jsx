import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faCommentDots,
    faArrowRightFromBracket
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';

/**
 * NavIcon component represents individual navigation icons in the sidebar.
 * @param {Object} props - The props for the NavIcon component.
 * @param {string} props.iconName - The icon to be displayed.
 * @param {function} props.onClick - The callback function when the icon is clicked.
 * @returns {JSX.Element} The rendered NavIcon component.
 */
function NavIcon(props) {
    return (
        <div className='w-[60%] cursor-pointer' onClick={props.onClick}>
            <FontAwesomeIcon
                icon={props.iconName}
                className="block mx-auto text-[#4EAC6D] py-4 w-full text-xl"
            />
        </div>
    );
}

/**
 * NavBarDashboard component represents the sidebar navigation in the dashboard.
 * It contains the profile picture, various navigation options, and the logout button.
 * @param {Object} props - The props for the NavBarDashboard component.
 * @param {function} props.OnSelectPanel - The function that selects which panel to display based on user interaction.
 * @returns {JSX.Element} The rendered NavBarDashboard component.
 */
function NavBarDashboard({ OnSelectPanel }) {
    const { disconnectSocket, clearAuthUser, authUser } = useAuthStore();  // Fetch store methods for authentication and socket management
    const router = useRouter();  // Router for navigating between pages

    /**
     * Handles the user logout process.
     * Sends a logout request to the server, disconnects the socket, clears user authentication data, and redirects to the home page.
     */
    const LogOut = async () => {
        try {
            const res = await axiosInstance.post("/auth/logout");  // Send logout request to the server
            console.log(res.data);  // Log the server response
            disconnectSocket();  // Disconnect socket connection
            clearAuthUser();  // Clear authentication data from store
            router.push('/');  // Redirect user to the home page
        } catch (error) {
            console.log("Log Out Failed : ", error.message);  // Log any errors during logout
        }
    };

    return (
        <div className="w-[60px] text-white bg-[#2E2E2E] h-screen flex flex-col flex-none">
            {/* Logo or Image at the top */}
            <div className='h-[10%] flex justify-center items-center'>
                <img
                    src='/images/chat.png'  // Image source for the logo
                    alt="preview"  // Alt text for accessibility
                    className="w-8 h-8 my-2 object-cover bg-white p-1 rounded-lg"
                />
            </div>

            {/* Main navigation icons */}
            <div className='flex h-[60%] gap-4 flex-col items-center justify-center'>
                <NavIcon iconName={faUser} onClick={() => OnSelectPanel('Profile')} />  {/* Profile icon */}
                <NavIcon iconName={faCommentDots} onClick={() => OnSelectPanel('chats')} />  {/* Chats icon */}
                {/* <NavIcon iconName={faGear} onClick={() => OnSelectPanel('Profile')} /> Uncomment if Settings option is needed */}
            </div>

            {/* User profile and logout section */}
            <div className='flex h-[30%] gap-4 flex-col items-center justify-end pb-4'>
                <NavIcon iconName={faArrowRightFromBracket} onClick={() => LogOut()} />  {/* Logout icon */}
                {/* User profile picture */}
                <div className='rounded-full'>
                    <Image
                        src={authUser?.profilePic || "/images/userDefault.png"}  // Display user profile picture or default if not available
                        alt='UserPhoto'  // Alt text for the image
                        className="w-10 h-10 object-cover rounded-full"
                        width={60}  // Set the width of the image
                        height={60}  // Set the height of the image
                    />
                </div>
            </div>
        </div>
    );
}

export default NavBarDashboard;
