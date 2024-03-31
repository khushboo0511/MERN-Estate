import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            }).then(console.log("hii there")) ;

            if (!res.ok) {
                throw new Error('Sign in failed');
            }

            const data = await res.json();
            console.log(data)

            if(data.success == false) {
                setError(data.message)
                setLoading(false)
                return
            } 
            setLoading(false)
            console.log(data)
            setError(null)
            navigate('/')
            } catch (error) {
                setLoading(false)
                setError(error.message)
            }  
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-2xl text-center font-semibold my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type='email' placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange} />
                <input type='password' placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange} />
                <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-70'>
                    {loading ? 'Loading...' : 'Sign In'}
                </button>
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Do not have an account?</p>
                <Link to={'/signup'}>
                    <span className='text-blue-700'> Sign Up</span>
                </Link>
            </div>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    );
};

export default SignIn;
