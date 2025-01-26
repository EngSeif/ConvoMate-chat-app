'use client'
import Image from 'next/image';
import styles from "@/styles/signUp/signup.module.css";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { axiosInstance } from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';


function SignUp() {

    const router = useRouter();
    const [isSigningUp, setIsSigningUp] = useState(false)
    const [firstname, setFirstname] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [lastname, setLastname] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [activeError, setActiveError] = useState(false);
    const { authUser, checkAuth } = useAuthStore();


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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSigningUp(true);
        setActiveError(false);
        setErrorMessage("");
        console.log("GEllo")

        try {
            if (!firstname || !lastname || !phone || !city || !country || !email || !password) {
                const missingFields = [];
                if (!firstname) missingFields.push("First Name");
                if (!lastname) missingFields.push("Last Name");
                if (!phone) missingFields.push("Phone");
                if (!city) missingFields.push("City");
                if (!country) missingFields.push("Country");
                if (!email) missingFields.push("Email");
                if (!password) missingFields.push("Password");

                setErrorMessage(`${missingFields.join(", ")} are Missing`);
                setIsSigningUp(false);
                setActiveError(true);
                return;
            }

            if (password.length < 8) {
                setErrorMessage("Password Must Be At Least 8 Characters");
                setIsSigningUp(false);
                setActiveError(true);
                return;
            }

            const fullName = `${firstname} ${lastname}`;
            const response = await axiosInstance.post('/auth/signup', {
                fullName,
                email,
                password,
                phone,
                location: { city, country },
            });

            if (response.status === 201) { // Assuming 201 Created is the success response
                router.push('/login/');
            }
        } catch (error) {
            setIsSigningUp(false);
            if (error.response) {
                setErrorMessage("Email is already found");
                setActiveError(true);
            } else {
                console.error("Error in Signup:", error);
            }
        }
    };


    return (
        <>
            <div className={styles.signUpDiv}>
                <div className={styles.FormDiv}>
                    <div className="w-[80%]">
                        <h4 className="text-xl">Sign Up</h4>
                        <h2 className="text-3xl py-4 font-semibold">New Account</h2>
                        <form onSubmit={(e) => handleSubmit(e)} className={styles.FormStyle}>
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
    )
}

export default SignUp;
