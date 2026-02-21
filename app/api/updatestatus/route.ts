import { connect } from "@/config/dbconfig";
import Attendance from "@/models/attendanceModal";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function PUT(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        const body = await request.json();
        const status: boolean = body.status;

        if (status === undefined) {
            return NextResponse.json(
                { error: "Status not provided" },
                { status: 400 }
            );
        }
        if (!id) {
            return NextResponse.json(
                { error: "Something went wrong!! id not found" },
                { status: 401 }
            )
        }
        const attendanceDB = await Attendance.findByIdAndUpdate(id, { Status: status });
        console.log("Updated A-DB=>" + attendanceDB);
        return NextResponse.json(
            { success: true, record: attendanceDB },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server error =>" + error },
            { status: 500 }
        )
    }
}