import { connect } from "@/config/dbconfig";
import Attendance from "@/models/attendanceModal";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request:NextRequest){
    try {
        const {searchParams} = new URL(request.url);
        const cid = searchParams.get("cid");
        const attendances = await Attendance.find({CustomerId:cid});
        if(!attendances){
            console.log("No Record found!");
            return NextResponse.json(
                {error:"No Record found!"},
                {status:404}
            )
        }

        console.log("Records => "+attendances);
        return NextResponse.json(
            {success:true,message:"Fetched attendance records!",records:attendances},
            {status:200}
        )
    } catch (error) {
        console.log("Internal Server error"+error);
        return NextResponse.json(
            {error:"Internal Server errror"+error},
            {status:500}
        )
    }
}