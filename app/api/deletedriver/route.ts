import { connect } from "@/config/dbconfig";
import Attendance from "@/models/attendanceModal";
import Driver from "@/models/DriverModal";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function DELETE(request:NextRequest){
    try {
        const {searchParams} = new URL(request.url);
        const cid = searchParams.get("cid");
        const deletedRecord = await Driver.findByIdAndDelete(cid);
        //all the saved records of attendances
        const deleteAttendance = await Attendance.deleteMany({CustomerId:cid});
        console.log("deletedAtt => "+deleteAttendance);
        return NextResponse.json(
            {success:true,message:"successfully deleted!",record:deletedRecord,},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error =>"+error},
            {status:500}
        )
    }
}