// 'use client' tells Next.js to treat this file as a client-side component
'use client'

import Image from 'next/image';  // Import Image component for optimized images
import styles from "@/styles/signUp/signup.module.css"; // Import CSS module for styling
import { useState, useEffect } from 'react'; // Import React hooks for state and side-effects
import { useRouter } from 'next/navigation'; // Import useRouter for page redirection
import { axiosInstance } from '@/lib/axios'; // Import custom axios instance for API calls
import { useAuthStore } from '@/store/useAuthStore'; // Import authentication store to access the auth user state

// SignUp component that handles user registration
function SignUp() {

    const router = useRouter();  // Use router for programmatic navigation
    const [isSigningUp, setIsSigningUp] = useState(false); // State for managing loading state
    const [firstname, setFirstname] = useState(""); // State for managing first name input
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const [lastname, setLastname] = useState(""); // State for managing last name input
    const [phone, setPhone] = useState(""); // State for managing phone number input
    const [city, setCity] = useState(""); // State for managing city input
    const [country, setCountry] = useState(""); // State for managing country input
    const [email, setEmail] = useState(""); // State for managing email input
    const [password, setpassword] = useState(""); // State for managing password input
    const [activeError, setActiveError] = useState(false); // State for toggling error display
    const { authUser } = useAuthStore(); // Retrieve authUser from the store

    // Effect to check if the user is authenticated on mount
    useEffect(() => {
        checkAuth(); // Calls checkAuth method (not implemented in this file)
    }, []);

    // If the user is already authenticated, redirect to their dashboard
    if (authUser) {
        router.push(`/dashboard/${authUser._id}`);
    }

    // Handlers for managing the input changes for each field
    const HandleChangeFirstName = (e) => {
        setFirstname(e.target.value);
    }

    const HandleChangeLastName = (e) => {
        setLastname(e.target.value);
    }

    const HandleChangePhone = (e) => {
        setPhone(e.target.value);
    }

    const HandleChangeCity = (e) => {
        setCity(e.target.value);
    }

    const HandleChangeCountry = (e) => {
        setCountry(e.target.value);
    }

    const HandleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const HandleChangePassword = (e) => {
        setpassword(e.target.value);
    }

    // Form submit handler to create a new user
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            // Validate form fields
            if (!firstname || !lastname || !phone || !city || !country || !email || !password) {
                let errMes = "";
                if (!firstname) errMes += "First Name, ";
                if (!lastname) errMes += "Last Name, ";
                if (!phone) errMes += "Phone, ";
                if (!city) errMes += "City, ";
                if (!country) errMes += "Country, ";
                if (!email) errMes += "Email, ";
                if (!password) errMes += "Password, ";
                errMes = errMes.slice(0, -2) + " are Missing"; // Generate error message
                setErrorMessage(errMes); // Set error message
                setIsSigningUp(false); // Disable loading state
                setActiveError(true); // Show error
                return;
            }
            
            // Validate password length
            if (password.length < 8) {
                setErrorMessage("Password Must Be Less Than 8"); // Set password length error
                setIsSigningUp(false); // Disable loading state
                setActiveError(true); // Show error
                return;
            }

            const fullName = firstname + " " + lastname; // Concatenate first and last names

            // Make API request to sign up the user
            const response = await axiosInstance.post(
                '/auth/signup',
                {
                    fullName,
                    email,
                    password,
                    phone,
                    location: {
                        city,
                        country
                    },
                }
            );
            console.log('Response Status:', response.status); // Log response status
            router.push(`/login/`); // Redirect to login page after successful sign-up
        } catch (error) {
            // Handle errors from Axios
            setIsSigningUp(false); // Disable loading state
            if (error.response) {
                setErrorMessage("Email is already found"); // Set error for existing email
                setActiveError(true); // Show error
            } else if (error.request) {
                console.log('No Response Received:', error.request); // Log request error
            } else {
                console.log('Error in Sign Up:', error.message); // Log other errors
            }
        }
    }

    // Render the sign-up form and handle UI logic
    return (
        <>
            <div className={styles.signUpDiv}>
                <div className={styles.FormDiv}>
                    <div className="w-[80%]">
                        <h4 className="text-xl">Sign Up</h4>
                        <h2 className="text-3xl py-4 font-semibold">New Account</h2>
                        <form onSubmit={handleSubmit} className={styles.FormStyle}>
                            <div className='flex gap-4'>
                                <div className={styles.labelDiv}>
                                    <label className='py-2'>First Name</label>
                                    <label className='py-2'>Last Name</label>
                                    <label className='py-2'>Phone Number</label>
                                    <label className='py-2'>Location</label>
                                    <label className='py-2'>Email</label>
                                    <label className='py-2'>Password</label>
                                </div>
                                <div className={styles.InputDiv}>
                                    <input
                                        type="text"
                                        value={firstname || ""}
                                        onChange={HandleChangeFirstName}
                                        className={styles.inputStyle}
                                        placeholder="Enter Your First Name"
                                    />
                                    <input
                                        type="text"
                                        value={lastname || ""}
                                        onChange={HandleChangeLastName}
                                        className={styles.inputStyle}
                                        placeholder="Enter Your Last Name"
                                    />
                                    <input
                                        type="text"
                                        value={phone || ""}
                                        onChange={HandleChangePhone}
                                        className={styles.inputStyle}
                                        placeholder="Enter Your Phone"
                                    />
                                    <div className='flex gap-2'>
                                        <input
                                            type="text"
                                            value={city || ""}
                                            onChange={HandleChangeCity}
                                            className={styles.inputStyle}
                                            placeholder="City"
                                        />
                                        <input
                                            type="text"
                                            value={country || ""}
                                            onChange={HandleChangeCountry}
                                            className={styles.inputStyle}
                                            placeholder="Country"
                                        />
                                    </div>

                                    <input
                                        type="email"
                                        value={email || ""}
                                        onChange={HandleChangeEmail}
                                        className={styles.inputStyle}
                                        placeholder="Enter Your Email"
                                        autoComplete="off"
                                    />
                                    <input
                                        type="password"
                                        value={password || ""}
                                        onChange={HandleChangePassword}
                                        className={styles.inputStyle}
                                        placeholder="Enter Your Password"
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>
                            <input
                                type="submit"
                                value="Sign Up"
                                className={styles.submitStyle}
                                onClick={() => setIsSigningUp(true)}
                                disabled={isSigningUp}
                            />
                            {activeError === true && <p className='text-[#E74C3C] mx-auto font-bold'>{errorMessage}</p>}
                            <p className="mx-auto">Do You Have An Account? <a href='/login'>Sign In</a></p>
                        </form>
                    </div>
                </div>
                <div className={styles.ImgDiv}>
                    <Image src='/images/signUp.png' alt='image' width={700} height={700} className='animate-bounceOnce infinite delay-1000' />
                </div>
            </div>
        </>
    );
}

export default SignUp;
