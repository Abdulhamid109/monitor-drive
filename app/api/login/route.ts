import { connect } from "@/config/dbconfig";
import Admin from "@/models/AdminModal";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


connect();

export async function POST(request:NextRequest){
    try {
        const {email,password} = await request.json();
        if(!email||!password){
            console.log("Empty values");
            return NextResponse.json(
                {error:"Empty values"},
                {status:404}
            )
        }
        const user = await Admin.findOne({email});
        if(!user){
            console.log("Account not found!!");
            return NextResponse.json(
                {error:"Account not found!!"},
                {status:404}
            )
        }

        const result = await bcrypt.compare(password,user.password);
        if(!result){
            console.log("Wrong credentials");
            return NextResponse.json(
                {error:"Wrong Credentials"},
                {status:405}
            )
        }

        const payloadData ={
            cuid:user._id,
            email:user.email
        }

        const token = jwt.sign(payloadData,process.env.SECRET_KEY!,{expiresIn:'1d'});
        const response = NextResponse.json(
            {success:true,message:"Successfully logged in!!"},
            {status:200}
        );

        response.cookies.set("token",token);
        return response;

    } catch (error) {
        return NextResponse.json(
            {error:"Internal Server error =>"+error},
            {status:500}
        )
    }
}