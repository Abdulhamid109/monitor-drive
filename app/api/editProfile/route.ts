import { connect } from "@/config/dbconfig";
import Driver from "@/models/DriverModal";
import { NextRequest, NextResponse } from "next/server";



connect();

export async function PUT(request:NextRequest){
    try {
        const {searchParams} = new URL(request.url);
        const cid = searchParams.get("cid");
        const {name,phone,enrollment_type} = await request.json();
        if(!cid){
            console.log("customer id not found!!");
            return NextResponse.json(
                {error:"Something went wrong!!! cid"},
                {status:401}
            )
        }
        const customerDB = await Driver.findByIdAndUpdate(cid,{
            name,
            phone,
            enrollment_type
        });

        console.log("Updated Customer Details => "+customerDB);
        return NextResponse.json(
            {success:true,message:"updated the profile info"},
            {status:200}
        )


    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error =>"+error},
            {status:500}
        )
    }
}