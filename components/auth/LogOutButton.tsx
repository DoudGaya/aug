'use client'

import { logOut } from "@/actions/logout"

export default function LogoutButton() {
  const handleLogout = async () => {
    // Clear any client-side storage first
    localStorage.clear()
    sessionStorage.clear()
    
    try {
      await logOut()
      
      // Force a complete page reload to clear any remaining state
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-1 bg-gray-800 text-gray-300 rounded-full hover:bg-red-600/40"
    >
      Logout
    </button>
  )
}