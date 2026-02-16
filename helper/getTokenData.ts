import { connect } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";



connect();

interface Data {
    cuid: string;
    email: string;
}

export async function getTokenData(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value;
        const payload_Data = jwt.verify(token!, process.env.SECRET_KEY!) as Data;
        return payload_Data.cuid;
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server error =>" + JSON.stringify(error) },
            { status: 500 }
        )
    }
}