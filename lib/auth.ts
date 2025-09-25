"use server"
// lib/auth.ts

import { cookies } from "next/headers";

export async function DeleteCookie(){

  const cookieStore = await cookies();
  
  cookieStore.delete('token');

  // Alternative: Set with expired date and same configuration as creation
  cookieStore.set({
    name: 'token',
    value: '',
    expires: new Date(0), // Expire immediately
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });

}