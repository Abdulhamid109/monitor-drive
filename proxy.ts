import { NextRequest, NextResponse } from "next/server";



export async function proxy(request:NextRequest) {
    try {
        const path = request.nextUrl.pathname;
        const isPublicPath = path === "/" || path === "/login" 
        const token = request.cookies.get("token")?.value;
        

        if(isPublicPath && token){
            return NextResponse.redirect(new URL("/homepage",request.url));
        }

        if(!isPublicPath && !token){
            return NextResponse.redirect(new URL("/login",request.url));
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error"+error},
            {status:500}
        )
    }
}

export const config = {
    matcher:[
        "/",
        "/login",
        "/signup",
        "/homepage",
        "/driver",
        "/alldrivers",
        "/alldrivers/:path*"
    ]
}