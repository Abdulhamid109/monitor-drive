import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URL!,);
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("Successfully connected to DB");
        });
        connection.on("error",(err)=>{
            console.log("Failed to connect to DB => "+err);
            process.exit(1);
        })
    } catch (error) {
        console.log("Failed to connect the db :"+JSON.stringify(error));
        return NextResponse.json(
            {
                error:"Failed to connect to db"+JSON.stringify(error),
            },
            {status:500}
        )
    }
}