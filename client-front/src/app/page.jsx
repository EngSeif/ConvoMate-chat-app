"use client"
import { useAuthStore } from '@/store/useAuthStore';
import '../styles/global.css';
import { useEffect } from 'react';
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation';
import TeamSection from '../components/landingPage/Team';
import HeroSection from '@/components/landingPage/HeroSection';
import About from '@/components/landingPage/About';
import Features from '@/components/landingPage/Features';

function LandingPage() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore()
    const route = useRouter();

    useEffect(() => {
        // Check authentication status when the component mounts
        checkAuth()
    }, [])

    // Log the current authenticated user (for debugging)
    console.log({ authUser })

    // Show a loading spinner if authentication is being checked
    if (isCheckingAuth && !authUser) {
        return (
            <div className='flex items-center justify-center h-screen w-full'>
                <Loader className='size-10 animate-spin' />
            </div>
        )
    }

    // Redirect to the user's dashboard if authenticated
    if (authUser) {
        route.push(`/dashboard/${authUser._id}`)
    }

    // Render the landing page sections
    return (
        <>
            <HeroSection />
            <About />
            <Features />
            <TeamSection />
        </>
    );
}

export default LandingPage;
