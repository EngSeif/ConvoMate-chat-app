import Image from "next/image"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faPhone,
    faLocationDot,
    faDoorOpen
} from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from "@/store/useAuthStore";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

/**
 * Capitalizes the first letter of each word in the given string.
 * @param {string} str - The string to capitalize.
 * @returns {string} - The string with each word capitalized.
 */
function capitalizeWords(str) {
    return str?.split(' ') // Split the string into words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter, make the rest lowercase
        .join(' '); // Join the words back together
}

/**
 * UserProfile component displays and manages user profile information.
 * Allows updating the profile picture and displays the user's details.
 */
function UserProfile() {
    // Destructure necessary values from the custom authentication store
    const { isUpdatingProfile, authUser, UpdateProfile } = useAuthStore()

    // Create a reference for the file input to trigger file selection programmatically
    const fileInputRef = useRef(null);

    // State to hold the selected image for the profile picture
    const [selectedImg, setSelectedImg] = useState(null)

    /**
     * Handles the image file upload.
     * Reads the selected file and updates the profile picture in base64 format.
     * @param {Object} e - The event object.
     */
    const handleImageUpload = (e) => {
        const file = e.target.files[0]  // Get the first file selected
        if (!file) return;  // If no file is selected, return early

        // Create a FileReader instance to read the file
        const reader = new FileReader();
        reader.readAsDataURL(file)  // Read the file as a data URL (base64 encoded)

        // Once the file is loaded, update the state and send the new image to update the profile
        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image)  // Set the selected image as base64
            await UpdateProfile({ profilePic: base64Image })  // Update the user's profile picture in the store
        }
    };

    /**
     * Triggers the hidden file input when the camera icon is clicked.
     */
    const triggerFileInput = () => {
        fileInputRef.current.click();  // Simulate a click on the file input element
    };

    return (
        <div className="w-[400px] bg-white h-screen flex-none flex justify-center items-center">
            <div className="w-[95%] mx-auto h-[95%] flex flex-col items-center gap-2">
                {/* Profile Image Section */}
                <div className="relative">
                    <img
                        src={selectedImg || authUser?.profilePic || "/images/userDefault.png"}  // Show selected image or default image
                        alt={authUser?.fullName}  // Display the user's full name as alt text
                        className="w-24 h-24 object-cover rounded-full"
                        width={60}  // Set the width of the image
                        height={60}  // Set the height of the image
                    />
                    {/* Camera icon to trigger image upload */}
                    <Camera
                        className="absolute right-2 bottom-0 m-auto w-8 h-8 bg-gray-300 rounded-full p-2 text-white cursor-pointer"
                        onClick={triggerFileInput}  // Trigger the file input when clicked
                    />
                    {/* Hidden file input for image upload */}
                    <input
                        ref={fileInputRef}  // Reference to the file input
                        type="file"
                        className="hidden"  // Keep the input hidden from view
                        accept="image/*"  // Accept only image files
                        onChange={handleImageUpload}  // Handle the image selection
                    />
                </div>

                {/* User Information Section */}
                <h2 className="text-2xl font-semibold">{capitalizeWords(authUser?.fullName)}</h2>  {/* Display the full name */}
                <h3 className="text-sm">{authUser?.email}</h3>  {/* Display the user's email */}

                {/* Divider */}
                <div className="w-full h-[0.1rem] my-3 bg-gray-200"></div>

                {/* Profile Details */}
                <div className="w-[90%] flex gap-3 items-center">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />  {/* Icon for the user's name */}
                    <p className="text-sm">{capitalizeWords(authUser?.fullName)}</p>  {/* Display the full name */}
                </div>
                <div className="w-[90%] flex gap-3 items-center">
                    <FontAwesomeIcon icon={faPhone} className="text-gray-400" />  {/* Icon for phone */}
                    <p className="text-sm">{authUser?.phone}</p>  {/* Display the user's phone number */}
                </div>
                <div className="w-[90%] flex gap-3 items-center">
                    <FontAwesomeIcon icon={faLocationDot} className="text-gray-400" />  {/* Icon for location */}
                    <p className="text-sm">{authUser?.location.city}, {authUser?.location.country}</p>  {/* Display user's location */}
                </div>
                <div className="w-[90%] flex gap-3 items-center">
                    <FontAwesomeIcon icon={faDoorOpen} className="text-gray-400" />  {/* Icon for account creation date */}
                    <p className="text-sm">{new Date(authUser?.createdAt).toLocaleDateString('en-GB')}</p>  {/* Display account creation date */}
                </div>

                {/* Divider */}
                <div className="w-full h-[0.1rem] my-3 bg-gray-200"></div>
            </div>
        </div>
    );
}

export default UserProfile;
