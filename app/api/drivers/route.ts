import { connect } from "@/config/dbconfig";
import { getTokenData } from "@/helper/getTokenData";
import Driver from "@/models/DriverModal";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(request:NextRequest){
    try {
        const aid = await getTokenData(request);
        console.log("AID => "+aid);
        if(!aid){
            return NextResponse.json(
                {error:"Unauthorized Admin"},
                {status:401}
            )
        }
        const drivers = await Driver.find({aid}).sort({createdAt:-1});
        console.log(drivers);
        if(!drivers){
            return NextResponse.json(
                {error:"No Response found!"},
                {status:404}
            )
        }
        return NextResponse.json(
            {success:true,message:"Successfully fetched all the drivers",driver:drivers},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error =>"+error},
            {status:500}
        )
    }
}