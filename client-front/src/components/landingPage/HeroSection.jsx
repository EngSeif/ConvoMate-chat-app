import Link from "next/link"
import Image from "next/image"

function HeroSection() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#27AE60] to-[#219652]">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-4">
                <div className="flex justify-end items-center">
                </div>
            </nav>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Left Side Content */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
                            Connecting People With Each Other
                        </h2>
                        <p className="text-white text-xl mb-12 opacity-90">
                            Chat With Your Loved Ones At Ease
                        </p>

                        {/* Buttons Container */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                            <Link href="/login">
                                <button className="bg-white w-full sm:w-auto bg-transparent text-[#27AE60] px-12 py-4 rounded-xl font-semibold text-lg border-2 border-white hover:bg-[#27AE60] hover:text-white transform hover:-translate-y-1 transition duration-300 flex items-center justify-center">
                                    <span>Login</span>
                                </button>
                            </Link>

                            <Link href="/signUp">
                                <button className="bg-white w-full sm:w-auto bg-transparent text-[#27AE60] px-12 py-4 rounded-xl font-semibold text-lg border-2 border-white hover:bg-[#27AE60] hover:text-white transform hover:-translate-y-1 transition duration-300 flex items-center justify-center">
                                    <span>SignUp</span>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side Image */}
                    <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
                        <div className="relative w-[600px] h-[600px]">
                            <Image
                                src="/images/Hero-Chat.png"
                                alt="Food Delivery"
                                width={900}
                                height={900}
                                objectFit="contain"
                                className="animate-float"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
