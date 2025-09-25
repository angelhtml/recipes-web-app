"use server"
// lib/auth.ts

import { cookies } from "next/headers";

export async function DeleteCookie(){

  const cookieStore = await cookies();

  // Alternative: Set with expired date and same configuration as creation
  cookieStore.set("token", "");

  cookieStore.delete('token');

}
