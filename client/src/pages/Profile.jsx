import React from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user); // Assuming currentUser is stored in Redux state

  return (
    <div className='p-5 max-w-lg mx-auto'>
      <div className='text-center'>
        <h1 className='text-3xl font-semibold mb-5'>Profile</h1>
        <div className='mb-5'>
          <img src={currentUser.avatar} alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer mx-auto' />
        </div>
      </div>
      <form>
        <div className='mb-5'>
          <input
            id='username'
            type='text'
            placeholder='Enter your username'
            defaultValue={currentUser.username}
            className='border p-3 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='mb-5'>
          <input
            id='email'
            type='email'
            placeholder='Enter your email'
            defaultValue={currentUser.email}
            className='border p-3 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300'
            readOnly // email is non editable
          />
        </div>
        <div className='mb-5'>
          <input
            id='username'
            type='text'
            placeholder='Enter new password'
            defaultValue={currentUser.password}
            className='border p-3 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300'
          />
        </div>
        <div className='text-center'>
          <button type='submit' className='bg-slate-700 text-white p-3 rounded-lg shadow w-full uppercase hover:opacity-85 disabled:opacity-60'>
            Update
          </button>
        </div>
      </form>
      
      <div className='flex justify-between mt-5 font-semibold'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  );
};

export default Profile;
