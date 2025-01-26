import React from 'react';

// Features component to showcase the main features of the chat application
const Features = () => {
    return (
        // Main container that takes the full height of the screen with a green background
        <div className="min-h-screen bg-[#26AA5E] overflow-hidden flex justify-center items-center">
            {/* Inner container for spacing and layout */}
            <div className="container m-auto px-6 space-y-8 text-white md:px-12">

                {/* Section Header */}
                <div>
                    {/* Subtitle text */}
                    <span className="text-white text-lg font-semibold">Main features</span>
                    {/* Title text */}
                    <h2 className="mt-4 text-2xl text-white font-bold md:text-4xl">
                        A technology-first approach to chat <br className="lg:block" hidden /> and connect
                    </h2>
                </div>

                {/* Features Grid */}
                <div className="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-4">

                    {/* Feature 1: Real-time Chat */}
                    <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
                        <div className="relative p-8 space-y-8">
                            {/* Icon for Real-time Chat */}
                            <img
                                src="/images/efficiency.png"
                                className="w-10"
                                width="512"
                                height="512"
                                alt="chat icon"
                            />
                            <div className="space-y-2">
                                {/* Title for Real-time Chat */}
                                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                                    Real-time Chat
                                </h5>
                                {/* Description for Real-time Chat */}
                                <p className="text-sm text-gray-600">
                                    Engage in live conversations with instant updates.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 2: Sending Images in Chat */}
                    <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
                        <div className="relative p-8 space-y-8">
                            {/* Icon for Sending Images in Chat */}
                            <img
                                src="/images/image-gallery.png"
                                className="w-10"
                                width="512"
                                height="512"
                                alt="image sending icon"
                            />
                            <div className="space-y-2">
                                {/* Title for Sending Images in Chat */}
                                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                                    Sending Images in Chat
                                </h5>
                                {/* Description for Sending Images in Chat */}
                                <p className="text-sm text-gray-600">
                                    Share images instantly during your conversations.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 3: Online and Offline Users */}
                    <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
                        <div className="relative p-8 space-y-8">
                            {/* Icon for Online and Offline Users */}
                            <img
                                src="/images/online-education.png"
                                className="w-10"
                                width="512"
                                height="512"
                                alt="user status icon"
                            />
                            <div className="space-y-2">
                                {/* Title for Online and Offline Users */}
                                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                                    Online & Offline Users
                                </h5>
                                {/* Description for Online and Offline Users */}
                                <p className="text-sm text-gray-600">
                                    See who is online or offline in real-time.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Feature 4: Changing Profile Picture */}
                    <div className="relative group bg-gray-100 transition hover:z-[1] hover:shadow-2xl lg:hidden xl:block">
                        <div className="relative p-8 space-y-8 border-dashed rounded-lg transition duration-300 group-hover:bg-white group-hover:border group-hover:scale-90">
                            {/* Icon for Changing Profile Picture */}
                            <img
                                src="/images/user.png"
                                className="w-10"
                                width="512"
                                height="512"
                                alt="profile icon"
                            />
                            <div className="space-y-2">
                                {/* Title for Changing Profile Picture */}
                                <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                                    Change Profile Picture
                                </h5>
                                {/* Description for Changing Profile Picture */}
                                <p className="text-sm text-gray-600">
                                    Update your profile picture whenever you want.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Exporting Features component
export default Features;
