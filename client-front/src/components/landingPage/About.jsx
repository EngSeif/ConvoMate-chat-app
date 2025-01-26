import React from "react";

// About component that provides information about the project
const About = () => {
    return (
        // Container with a white background and full viewport height, centered content
        <div className=" bg-white min-h-screen flex justify-center items-center">
            {/* Inner container with responsive padding and text color */}
            <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">

                {/* Flex container for image and text content, with spacing and alignment adjustments for different screen sizes */}
                <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">

                    {/* Image Section */}
                    <div className="md:5/12 lg:w-5/12">
                        {/* Image related to the project, loaded lazily */}
                        <img
                            src="/images/chat.png"
                            alt="Nuxt development"
                            loading="lazy"
                        />
                    </div>

                    {/* Text Content Section */}
                    <div className="md:7/12 lg:w-6/12">
                        {/* Title for the about section */}
                        <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                            A Graduation Project Built by Two Passionate Software Engineers for ALX SWE
                        </h2>

                        {/* First paragraph detailing the dedication and process behind the project */}
                        <p className="mt-6 text-gray-600">
                            With a passion for innovation and problem-solving, these two software engineers
                            worked tirelessly to bring this app to life. From ideation to deployment, their
                            dedication to the project ensured its success, serving as a testament to their growth
                            during the ALX SWE program.
                        </p>

                        {/* Second paragraph elaborating on their collaboration and technical expertise */}
                        <p className="mt-4 text-gray-600">
                            Their collaborative effort, combined with their technical expertise, brought this
                            project to life, showcasing the skills they acquired throughout their journey in
                            software engineering. This app is not just a product, but a symbol of their hard work
                            and determination.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Exporting About component for use in other parts of the application
export default About;
