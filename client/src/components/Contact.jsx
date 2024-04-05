import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.useRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.error('Error fetching landlord:', error);
        // You might want to set an error state here and handle it in the UI
      }
    };
    fetchLandlord();
  }, [listing.useRef]);

  const handleSendMessage = () => {
    const subject = encodeURIComponent(`Regarding ${listing.name}`);
    const body = encodeURIComponent(message);
    const mailtoLink = `mailto:${landlord.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
    setMessage(''); // Clear the message after sending
  };

  return (
    <>
      {landlord && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{landlord.username}</span>{' '}
            for{' '}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message here...'
            className='w-full border p-3 rounded-lg'
          ></textarea>

          <button
            onClick={handleSendMessage}
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95'
          >
            Send Message
          </button>
        </div>
      )}
    </>
  );
}
