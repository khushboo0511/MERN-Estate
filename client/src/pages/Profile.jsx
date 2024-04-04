import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // Assuming you're using Redux for state management
import { useRef } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const fileRef = useRef(null)
  const { currentUser, loading, error } = useSelector((state) => state.user); // Assuming currentUser is stored in Redux state
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false)
  const [userListings, setUserListings] = useState([])
  const dispatch =  useDispatch();

  console.log(filePerc)
  console.log(fileUploadError)
  console.log(formData)
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileExtension = file.name.split('.').pop(); // Get the file extension
    const fileName = new Date().getTime() + '_' + currentUser.username + '.' + fileExtension; // Use a unique name including the username and file extension
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.error('Error uploading file:', error);
        setFileUploadError(true); // This sets file upload error flag if there's an error
      },
      () => {
        // This is the completion callback for the uploadTask
        // It should be a separate function to handle successful upload
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // Update form data with the downloadURL
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    );
    }   
    
    const handleChange = (e) => {
      setFormData({...formData, [e.target.id]: e.target.value})
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(updateUserStart())
        const res = await fetch(`/api/user/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.success === false) {
          dispatch(updateUserFailure(data.message));
          return;
        }

        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true)

      } catch (error) {
        dispatch(updateUserFailure(error.message))
      }
    }

    const handleDeleteUser = async () => {
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });

        const data = await res.json();
        if(data.success === false) {
          dispatch(deleteUserFailure(data.message));
          return;
        }
        dispatch(deleteUserSuccess(data))

      } catch (error) {
        dispatch(deleteUserFailure(error.message))
      }
    }

    const handleSignOut = async () => {
      try {
        dispatch(signOutUserStart())
        const res = await fetch('api/auth/signout')
        const data = await res.json();
        if (data.success === false) {
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess(data));
      } catch (error) {
        dispatch(signOutUserFailure(data.message))
      }
    }

    const handleShowListings = async () => {
      try {
        setShowListingsError(false);
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true);
          return;
        }
  
        setUserListings(data);
      } catch (error) {
        setShowListingsError(true);
      }
    };


    const handleDeleteListing = async (listingId) => {
      try {
        const res = await fetch(`/api/listing/delete/${listingId}`, {
          method: 'DELETE',
        })
        const data = await res.json();
        if (data.success === false) {
          setShowListingsError(true)
          return
        }
        setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
      } catch (error) {
        console.log(error.messsage)
      }
    }

  return (
    <div className='p-5 max-w-lg mx-auto'>
      <div className='text-center'>
        <h1 className='text-3xl font-semibold mb-5'>Profile</h1>
        <div className='mb-5'>
          <input onChange={(e) => setFile(e.target.files[0])} 
          type="file" ref={fileRef} hidden accept='image/*' />
          <img onClick={() => fileRef.current.click()} src={formData.avatar || currentUser.avatar} 
          alt='profile' className='rounded-full h-24 w-24 object-cover cursor-pointer mx-auto' />
          
          <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error while uploading image (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image uploaded successfully!</span>
          ) : (
            ''
          )}
        </p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='mb-2'>
          <input
            id='username'
            type='text'
            placeholder='Enter your username'
            defaultValue={currentUser.username}
            className='border p-3 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300'
            onChange={handleChange}
          />
        </div>
        <div className='mb-2'>
          <input
            id='email'
            type='email'
            placeholder='Enter your email'
            defaultValue={currentUser.email}
            className='border p-3 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300'
            onChange={handleChange}
            readOnly // email is non editable
          />
        </div>
        <div className='mb-2'>
          <input
            id='password'
            type='password'
            placeholder='Enter new password'
            defaultValue={currentUser.password}
            className='border p-3 rounded-lg w-full focus:outline-none focus:ring focus:border-blue-300'
            onChange={handleChange}
          />
        </div>
        <div className='text-center'>
          <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg shadow w-full uppercase hover:opacity-85 disabled:opacity-60'>
             {loading? 'Loading...' : 'Update'}
          </button>
          
        </div>
      <Link
        className='bg-green-700 text-white p-3 mt-2 rounded-lg uppercase hover:opacity-85 inline-block w-full text-center'
        to={"/createlisting"}>
        Create Listing
      </Link>

      </form>
      
      <div className='flex justify-between mt-5 font-semibold'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>
        {error? error : ''}
      </p>
      <p className='text-green-700 mt-5'>
            {updateSuccess ? 'User is updated successfully' : ''}
      </p>
      <button onClick={handleShowListings} className='text-green-700 w-full'> Show Listings</button>
      <p className='text-red-700 mt-5'>
        {showListingsError ? 'Error showing listings' : ''}
      </p>

            {userListings? <h1 className='text-center my-7 text-2xl'>Your Listings</h1> : ''}

      {userListings.map((listing) => (
        
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>
              <div className='flex flex-col items-center'>
              <button onClick={() => handleDeleteListing(listing._id)} className='text-red-700 uppercase'>Delete</button>
              <button className='text-green-700 uppercase'>Edit</button>
              </div>
        </div>  
      ))} 
    </div>
  );
};

export default Profile;

