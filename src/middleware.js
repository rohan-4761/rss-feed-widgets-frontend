import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Your JWT secret key - make sure to store this in environment variables
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Debug log - remove this after testing
  console.log('Middleware processing:', pathname);
  
  // Explicitly exclude these paths from middleware
  const excludedPaths = ['/login', '/signup'];
  if (excludedPaths.includes(pathname) || pathname.startsWith('/login/') || pathname.startsWith('/signup/')) {
    console.log('Path excluded, continuing...');
    return NextResponse.next();
  }
  
  // Only run middleware for /widgets and /widgets/ pages
  if (pathname !== '/widgets' && !pathname.startsWith('/widgets/')) {
    console.log('Not a widgets path, continuing...');
    return NextResponse.next();
  }
  
  console.log('Processing widgets path:', pathname);
  
  // Get token from cookies or Authorization header
  const token = request.cookies.get('token')?.value || 
                request.headers.get('Authorization')?.replace('Bearer ', '');
  
  // If no token is present, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  try {
    // Verify the JWT token
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    // Token is valid, proceed with the request
    // You can add the user data to headers if needed
    const response = NextResponse.next();
    response.headers.set('x-user-id', payload.sub || '');
    response.headers.set('x-user-email', payload.email || '');
    
    return response;
  } catch (error) {
    // Token is invalid or expired
    console.error('JWT verification failed:', error.message);
    
    // Clear the invalid token cookie
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public/).*)',
  ],
};