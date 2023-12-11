import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const middleware = async (request) => {
  const { pathname } = request.nextUrl || "/";
  console.log(pathname);
  try {
    const cookie = cookies().get("jwt-token")?.value;
    if (!cookie || !cookie.startsWith("Bearer")) {
      throw new Error("Invalid Token");
    }
    const secret = new TextEncoder().encode(process.env.jwt_secret);

    await jwtVerify(cookie.split("Bearer ")[1], secret);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(
      new URL(`/login?redirectUrl=${pathname}`, request.url)
    );
  }
};

export const config = {
  matcher: ["/profile/:path*", "/updateprofile/:path*"],
};
