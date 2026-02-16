import { connect } from "@/config/dbconfig";
import Driver from "@/models/DriverModal";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(request:NextRequest){
    try {
        const {name,phone,enrollment_type,days} = await request.json();
        if(!name || !phone || !enrollment_type || !days){
            console.log("Empty values");
            return NextResponse.json(
                {error:"Empty values"},
                {status:404}
            )
        }

        const newDriverRecord = new Driver({
            name,
            phone,
            enrollment_type,
            days
        });

        const savedRecord = await newDriverRecord.save();
        return NextResponse.json(
            {success:true,message:"Successfully saved the details",driver:savedRecord},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error =>"+error},
            {status:500}
        )
    }
}