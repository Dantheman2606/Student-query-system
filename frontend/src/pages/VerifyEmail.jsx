import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LandingNavbar from '../components/LandingNavbar';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying'); // 'verifying', 'success', 'error'
  const [isVerified, setIsVerified] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
  const verifyEmail = async () => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (!token) {
      setStatus('error');
      return;
    }

    setStatus('verifying');

    let retries = 0;
    let verified = false;

    while (retries < 3 && !verified) {
      try {
        const res = await fetch(`${apiUrl}/auth/verifyEmail?token=${token}`, {
          method: 'GET',
        });

        if (res.ok) {
          verified = true;
          setTimeout(() => {
            setStatus('success');
            setIsVerified(true);
            setTimeout(() => navigate('/login'), 1000);
          }, 1000);
          // break;
          return;
        } else {
          retries++;
          await new Promise((resolve) => setTimeout(resolve, 1000)); // wait 1s before retry
        }
      } catch (err) {
        retries++;
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    if (!verified) {
      setStatus('error');
    }
  };

  if(!isVerified) {
      verifyEmail();

  }
}, []);


  const renderMessage = () => {
    if (status === 'error') {
      return (
        <p className="text-red-400 text-lg font-semibold">
          ❌ Invalid or expired verification link.
        </p>
      )
    } else if (status === 'success') {
      return (
        <p className="text-green-400 text-lg font-semibold">
          ✅ Email verified successfully! Redirecting to login...
        </p>
      );
    } else {
      return <p className="text-gray-300 text-lg">🔄 Verifying your email...</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <LandingNavbar />
      <div className="flex items-center justify-center px-4 py-24 text-white">
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-gray-700">
          {renderMessage()}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
