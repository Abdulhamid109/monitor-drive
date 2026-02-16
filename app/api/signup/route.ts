import { connect } from "@/config/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Admin from "@/models/AdminModal";


connect();

export async function POST(request:NextRequest){
    try {
        const {name,email,password} = await request.json();
        if(!name||!email||!password){
            console.log("Please enter the values");
            return NextResponse.json(
                {error:"Empty Values!!"},
                {status:404}
            )
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newAdmin = new Admin({
            adminName:name,
            email,
            password:hashPassword
        });

        const savedAdmin = await newAdmin.save();
        return NextResponse.json(
            {success:true,message:"Successfully saved the data",admin:savedAdmin},
            {status:200}
        )
    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error =>"+error},
            {status:500}
        )
    }
}