"use server"
// lib/auth.ts

import { cookies } from "next/headers";

export async function DeleteCookie(){
    (await cookies()).delete('token')
}