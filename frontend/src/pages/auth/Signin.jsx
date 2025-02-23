import React, { useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    return (
        <div className='w-screen h-screen bg-cover bg-center flex justify-center items-center' style={{
            backgroundImage: `url('/images/auth-bg.webp')`
        }}>
            <div className='w-[95%] sm:w-[70%] md:w-[40%] h-[50%] sm:h-[65%] lg:h-[80%] bg-white bg-opacity-30 rounded-lg backdrop-blur-md flex flex-col items-center'>
                <h1 className='mt-5 font-bold text-3xl tracking-tight text-center text-violet-600 p-2 bg-white rounded-lg'>Xpense<span className='text-zinc-700'>Track</span></h1>
                <div className='text-white text-lg font-semibold flex justify-center items-center gap-2 mt-3'>
                    <FaRegUser />
                    <h2>Sign In</h2>
                </div>
                <form className='w-[80%] mt-5 flex flex-col gap-4'>
                    <div className='flex flex-col'>
                        <label className='text-white font-semibold' htmlFor='email'>Email:</label>
                        <input id='email' type='email' placeholder='Email' className='w-full p-2 rounded-lg bg-white bg-opacity-50 outline-none' required onChange={handleChange} />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-white font-semibold' htmlFor='password'>Password:</label>
                        <div className='relative w-full'>
                            <input id='password' type={showPassword ? 'text' : 'password'} placeholder='Password' className='w-full p-2 rounded-lg bg-white bg-opacity-50 outline-none' required onChange={handleChange} />
                            <div className='absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2'>
                                {showPassword ? (
                                    <AiOutlineEyeInvisible className='cursor-pointer text-gray-600' onClick={() => setShowPassword(false)} />
                                ) : (
                                    <AiOutlineEye className='cursor-pointer text-gray-600' onClick={() => setShowPassword(true)} />
                                )}
                            </div>
                        </div>
                    </div>
                    <button type='submit' className='w-full p-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700'>Sign In</button>
                </form>

                <p className='mt-4  text-gray-800 text-sm'>Haven't an account? Create one.
                    <Link to='/signup' className='text-violet-800 text-sm font-semibold'>  SignUp</Link>
                </p>
            </div>
        </div>
    );
}

export default Signin;
