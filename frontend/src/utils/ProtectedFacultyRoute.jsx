// utils/ProtectedFacultyRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useDebugValue, useEffect, useState } from 'react';

const apiUrl = import.meta.env.VITE_API_URL;

const isUserFaculty = async (token) => {
  try {
    const decoded = jwtDecode(token);

    // make a backend call to check if user is actually a faculty / admin
    const response = await fetch(`${apiUrl}/users/checkUserRole`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ userId: decoded.id })
    });

    const data = await response.json();
    console.log(data);

    return data.isFaculty;
  } catch (error) {
    return false;
  }
};

const ProtectedFacultyRoute = () => {
  const token = localStorage.getItem('token');

  const [isFaculty, setIsFaculty] = useState(null);

  useEffect(() => { 
    if(!token) {
        setIsFaculty(false);
        return;
    }

    isUserFaculty(token).then(result => {
      setIsFaculty(result);
    });

  }, [token]);

  if (isFaculty === null) {
    return <div>Loading....</div>; // Optionally, you can add a loading spinner here
  }

  if (!isFaculty) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedFacultyRoute;
