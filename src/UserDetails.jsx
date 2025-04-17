import React, { useState } from 'react';
import axios from 'axios';

const UserDetails = () => {
    const [userId, setUserId] = useState('');
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(`https://9yoywh6519.execute-api.us-east-1.amazonaws.com/dev/getuser/?username=${userId}`); 
            
            if (response.data.user) {
                setUserDetails(response.data.user);
                setError('');
            } else {
                setUserDetails(null);
                setError('User not found');
            }
        } catch (err) {
            console.error('Error fetching user:', err);
            setError('Failed to get user details. Please check the User ID.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6">
                <h2 className="text-3xl font-bold text-indigo-700 text-center">Employee Lookup</h2>
                
                <div className="flex flex-col space-y-3">
                    <input 
                        type="text"
                        placeholder="Enter Username"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button 
                        onClick={fetchUserDetails}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-200"
                    >
                        Get Employee
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 text-center">{error}</p>
                )}

                {userDetails && (
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="text-xl font-semibold mb-2 text-gray-800">User Details</h3>
                        <p><span className="font-semibold">Username:</span> {userDetails.username}</p>
                        <p><span className="font-semibold">Email:</span> {userDetails.email}</p>
                        <p><span className="font-semibold">Date Joined:</span> {userDetails.dateJoined}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserDetails;
