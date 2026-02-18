import { connect } from "@/config/dbconfig";
import { getTokenData } from "@/helper/getTokenData";
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
        const aid = await getTokenData(request);
        if(!aid){
            console.log("Unauthorized admin");
            return NextResponse.json(
                {error:"Unathorized user"},
                {status:401}
            )
        }

        const newDriverRecord = new Driver({
            aid,
            name,
            phone,
            enrollment_type,
            days:parseInt(days)
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