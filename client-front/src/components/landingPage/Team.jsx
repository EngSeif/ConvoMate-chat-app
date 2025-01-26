/**
 * TeamSection - A component that renders a "Meet the Team" section with team member details.
 * 
 * This section displays the names, titles, images, and social media links (LinkedIn and GitHub)
 * of the team members. It also includes a brief introduction to the team and a responsive layout
 * to showcase team members' profiles with hover effects.
 * 
 * @returns {JSX.Element} A section displaying the team members with their details and social media links.
 */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';

const TeamSection = () => {
    // Array of team member data including name, title, image, and social links
    const teamMembers = [
        {
            name: "Seif Eldin Mohamed",
            title: "Software Engineer",
            image: "/images/seif.jpg",
            linkedin: "https://www.linkedin.com/in/seif-mohamed-bb7b33252/",
            github: "https://github.com/EngSeif"
        },
        {
            name: "Ahmed Ali Henawy",
            title: "Software Engineer",
            image: "/images/ahmed.jpeg",
            linkedin: "https://www.linkedin.com/in/ahmedhenawy/",
            github: "https://github.com/AhmedHenawy11"
        },
    ];

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col">
                <div className="flex flex-col mt-8">
                    {/* Meet the Team Section */}
                    <div className="container max-w-7xl px-4">
                        {/* Section Header */}
                        <div className="flex flex-wrap justify-center text-center mb-24">
                            <div className="w-full lg:w-6/12 px-4">
                                <h1 className="text-gray-900 text-4xl font-bold mb-8">Meet the Team</h1>
                                <p className="text-gray-700 text-lg font-light">
                                    With a successful chat app project under their belts, our team brings proven expertise and innovation to every endeavor.
                                </p>
                            </div>
                        </div>

                        {/* Team Member Cards */}
                        <div className="flex flex-wrap justify-center">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={index}
                                    className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4"
                                >
                                    <div className="flex flex-col">
                                        {/* Avatar */}
                                        <a href={member.linkedin} className="mx-auto">
                                            <img
                                                className="rounded-2xl drop-shadow-md hover:drop-shadow-xl transition-all duration-200 delay-100"
                                                src={member.image}
                                                alt={member.name}
                                            />
                                        </a>

                                        {/* Member Details */}
                                        <div className="text-center mt-6">
                                            <h1 className="text-gray-900 text-xl font-bold mb-1">{member.name}</h1>
                                            <div className="text-gray-700 font-light mb-2">{member.title}</div>

                                            {/* Social Media Icons */}
                                            <div
                                                className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity duration-300"
                                            >
                                                <a
                                                    href={member.linkedin}
                                                    className="flex rounded-full hover:bg-indigo-50 h-10 w-10 items-center justify-center"
                                                >
                                                    <FontAwesomeIcon icon={faLinkedin} className="text-indigo-500" />
                                                </a>
                                                <a
                                                    href={member.github}
                                                    className="flex rounded-full hover:bg-blue-50 h-10 w-10 items-center justify-center"
                                                >
                                                    <FontAwesomeIcon icon={faGithub} className="text-blue-300" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamSection;
