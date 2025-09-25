import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = request.cookies.get('token')?.value
    const { pathname } = request.nextUrl

    // Protected routes
    const protectedRoutes = ['/dashboard']
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

    // Auth routes
    const authRoutes = ['/login', '/signup']
    const isAuthRoute = authRoutes.includes(pathname)

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(new URL('/signup', request.url))
    }
    else if(isAuthRoute && token){
        return NextResponse.redirect(new URL('/', request.url))
    }

  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*','/login','/signup']
}