  import React from 'react'
  import { useAuthStore } from '../../store/authStore'
  const UserDashboard = () => {
    const {userLogout} = useAuthStore();
    return (
      <div>
        UserDashboard
        <button onClick={userLogout}>Logout</button>
      </div>
    )
  }
  
  export default UserDashboard
  