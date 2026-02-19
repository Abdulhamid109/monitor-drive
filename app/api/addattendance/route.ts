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
        const status:boolean = await request.json();

        console.log("fr st"+status);
        if(!aid){
            console.log("Un-authorized admin..");
            return NextResponse.json(
                {error:"Unauthorized Admin"},
                {status:401}
            )
        }

        const now = new Date();
        console.log("Date => "+now.toLocaleDateString("en-IN",)); //--Need to update the text of the TimeZone
        const isPresent = await Attendance.findOne({CustomerId:cid,Date:now.toLocaleDateString("en-IN")})
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
            Date: now.toLocaleDateString("en-IN"), //--Add the TimeZone of india
            Status:status,
        });

        const savedAttendanceRecord = await newAttendanceRecord.save();

        console.log("Record"+savedAttendanceRecord);
        //decrease the day count by one
        const driverdb = await Driver.findById(cid);
        console.log("Days ->"+driverdb.days);
        const days = parseInt(driverdb.days)-1;
        console.log("Interm"+days);
        const updateCustomerDayCount = await Driver.findByIdAndUpdate(cid,{days:`${days}`});
        console.log(updateCustomerDayCount.days);

        return NextResponse.json(
            {success:true,message:"Successfully marked the attendance",record:savedAttendanceRecord},
            {status:200}
        )


        

        
    } catch (error) {
        console.log("Error => "+error)
        return NextResponse.json(
            {error:"Internal Server error =>"+error},
            {status:500}
        )
    }
}