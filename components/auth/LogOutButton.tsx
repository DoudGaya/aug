"use client"

import React from 'react'
import { signOut } from '@/auth';



interface logOutButtonProps {
    children?: React.ReactNode;
}




export const LogOutButton = ( {children}: logOutButtonProps) => {
  return (
    <div className=' cursor-pointer p-1'>{children}</div>
  )
}
