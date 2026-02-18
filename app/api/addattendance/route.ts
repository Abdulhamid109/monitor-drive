import { connect } from "@/config/dbconfig";
import { getTokenData } from "@/helper/getTokenData";
import Attendance from "@/models/attendanceModal";
import Driver from "@/models/DriverModal";
import { NextRequest, NextResponse } from "next/server";



connect();

export async function POST(request:NextRequest){
    try {
        const aid = await getTokenData(request);
        const {searchParams} = new URL(request.url);
        const cid = searchParams.get("cid");
        const {status} = await request.json();

        if(!aid){
            console.log("Un-authorized admin..");
            return NextResponse.json(
                {error:"Unauthorized Admin"},
                {status:401}
            )
        }

        const now = new Date();
        console.log("Date => "+now.toLocaleDateString("en-IN",{timeZone:"Asia-Calcutta"})); //--Need to update the text of the TimeZone
        const isPresent = await Attendance.findOne({CustomerId:cid,date:now.toLocaleDateString("en-IN")})
        if(isPresent){
            console.log("Already attendance has been marked!!");
            return NextResponse.json(
                {error:"Attendance can be marked only once!!"},
                {status:403}
            )
        }


        const newAttendanceRecord = new Attendance({
            adminId:aid,
            CustomerId:cid,
            date: now.toLocaleDateString("en-IN"), //--Add the TimeZone of india
            Status:status,
        });

        const savedAttendanceRecord = await newAttendanceRecord.save();

        console.log("Record"+savedAttendanceRecord);

        return NextResponse.json(
            {success:true,message:"Successfully marked the attendance"},
            {status:200}
        )


        

        
    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error =>"+error},
            {status:500}
        )
    }
}