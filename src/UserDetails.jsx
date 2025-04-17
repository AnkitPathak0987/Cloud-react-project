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
        <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6 border border-gray-200">
            <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Get Employee Details</h2>

            <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
                <input 
                    type="text"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
                <button 
                    onClick={fetchUserDetails}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
                >
                    Get Employee
                </button>
            </div>

            {error && (
                <p className="text-red-500 text-center mt-2">{error}</p>
            )}

            {userDetails && (
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">User Details:</h3>
                    <div className="space-y-2">
                        <p><span className="font-medium text-gray-600">User ID:</span> {userDetails.username}</p>
                        <p><span className="font-medium text-gray-600">Email:</span> {userDetails.email}</p>
                        <p><span className="font-medium text-gray-600">Date Joined:</span> {userDetails.dateJoined}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetails;
