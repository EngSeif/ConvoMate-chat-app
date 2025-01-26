'use client'

// Import necessary components and hooks
import NavBarDashboard from "@/components/dashboard/NavBarDashboard";
import OptionsPanel from "@/components/dashboard/ContactsPanel";
import Chat from "@/components/dashboard/ChatPanel";
import UserProfile from "@/components/dashboard/userProfile";
import '@/styles/global.css';
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { notFound } from "next/navigation";

function Home() {

    // State to manage the selected panel (Profile or Chats)
    const [panel, SetPanel] = useState('Profile');
    
    // Destructuring necessary values from the custom auth store
    const { checkAuth, connectSocket, onlineUsers, authUser } = useAuthStore()

    // Function to handle switching between panels
    const handleChangePanel = (panel) => {
        SetPanel(panel)
    }

    // useEffect hook to check authentication on component mount
    useEffect(() => {
        checkAuth()  // Check if the user is authenticated
    }, [])

    // If authUser is not found, trigger a 404 page
    if (!authUser) {
        notFound()
    }

    // JSX structure for the layout of the dashboard
    return (
        <div className="flex w-screen h-screen overflow-hidden">
            {/* NavBarDashboard always shown on the left */}
            <NavBarDashboard className="h-full flex-shrink-0" OnSelectPanel={handleChangePanel} />
            
            {/* Conditionally render OptionsPanel or UserProfile based on selected panel */}
            {panel === 'chats' &&
                <OptionsPanel className="h-full flex-shrink-0" />
            }
            {panel === 'Profile' &&
                <UserProfile className="h-full flex-shrink-0" />
            }
            
            {/* Chat panel always visible on the right */}
            <Chat className="h-full flex-shrink-0" />
        </div>
    );
}

export default Home;
