import { route } from "@/constants/routes";
import { jwtVerify } from "jose";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const {pathname} = request.nextUrl;
    const token = request.cookies.get("token")?.value;

    if (!token){
        return NextResponse.redirect(new URL(route['LOGIN'], request.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        return NextResponse.redirect(new URL(route['LOGIN'], request.url));
    }
}

export const config = {
  matcher: ['/((?!_next|login|register|favicon.ico).*)'],
}
