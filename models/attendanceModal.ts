// this modal will be updated/created everyday
import mongoose from "mongoose";


const AttendanceModal = new mongoose.Schema({
    adminId:{
        type:String,
    },
    CustomerId:{
        type:String
    },
    Date:{
        type:String
    },
    Status:{
        type:Boolean
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const Attendance = mongoose.models.attendance || mongoose.model("attendance",AttendanceModal);
export default Attendance;