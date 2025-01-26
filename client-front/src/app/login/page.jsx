'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAt,
    faKey,
    faEye,
    faEyeSlash
} from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import styles from "@/styles/login/login.module.css";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';


function Login() {

    const router = useRouter();
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [activeError, setActiveError] = useState(false);

    useEffect(() => {
        checkAuth();
    }, [])

    // if (authUser) {
    //     router.push(`/dashboard/${authUser._id}`)
    // }


    const HandleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const HandleChangePassword = (e) => {
        setpassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(
                '/auth/login',
                {
                    email,
                    password,
                },
            );
            console.log('Response Status:', response.status);
            checkAuth()
            router.push(`dashboard/${response.data._id}`)
        } catch (error) {
            // Handle Axios errors
            if (error.response) {
                setActiveError(true)
            } else if (error.request) {
                // The request was made, but no response was received
                console.log('No Response Received:', error.request);
            } else {
                // An error occurred in setting up the request
                console.log('Error in Login:', error.message);
            }
        }
    };


    return (
        <>
            <div className={styles.logDiv}>
                <div className={styles.ImgDiv}>
                    <Image
                        src='/images/login.png'
                        alt='Foodie'
                        width={1000}
                        height={1000}
                        className='animate-bounceOnce infinite delay-1000'
                    />
                </div>
                <div className={styles.FormDiv}>
                    <div className="w-[60%]">
                        <h4 className="text-xl">Login</h4>
                        <h2 className="text-3xl py-4 font-semibold">Your Account</h2>
                        {/* form style */}
                        <form onSubmit={handleSubmit} className={styles.formStyle}>
                            <div className={styles.inputDiv}>
                                <FontAwesomeIcon icon={faAt} />
                                <input
                                    type="email"
                                    value={email || ""}
                                    onChange={HandleChangeEmail}
                                    className={styles.inputStyle}
                                    placeholder="Enter Your Email"
                                    autoComplete="off"
                                />
                            </div>
                            <div className={styles.inputDiv}>
                                <FontAwesomeIcon icon={faKey} />
                                <input
                                    type={showPass ? "text" : "password"}
                                    onChange={HandleChangePassword}
                                    value={password || ""}
                                    className={styles.inputStyle}
                                    placeholder="Enter Your Password"
                                    autoComplete="off"
                                />
                                {showPass === false && <FontAwesomeIcon icon={faEye} onClick={() => setShowPass(true)} />}
                                {showPass === true && <FontAwesomeIcon icon={faEyeSlash} onClick={() => setShowPass(false)} />}
                            </div>
                            <input
                                type="submit"
                                value="Login"
                                className={styles.submitClass}
                            />
                            {activeError === true && <p className='text-red-400 mx-auto font-bold'>Invalid User Creditials</p>}
                            <p className="mx-auto">Don't You Have An Account ? <a href='/signUp'> Sign Up </a></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login