import { connect } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function DELETE(request:NextRequest){
    try {
        const {searchParams} = new URL(request.url);
        const cid = searchParams.get("cid");
    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error =>"+error},
            {status:500}
        )
    }
}