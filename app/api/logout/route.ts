import { connect } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request:NextRequest){
    try {
        const response = NextResponse.json(
            {error:"Successfully logged out!!"},
            {status:200}
        );

        response.cookies.set("token","",{expires:new Date(0)});
        return response;

    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error =>"+error},
            {status:500}
        )
    }
}