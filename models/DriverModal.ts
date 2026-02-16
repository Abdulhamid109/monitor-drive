import mongoose from "mongoose";


const DriverSchema = new mongoose.Schema(
    {
        aid:{
            type:String,
        },
        name:{
            type:String,
        },
        phone:{
            type:String,
        },
        enrollment_type:{
            type:String
        },
        days:{
            type:Number,
            default:0
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
);

const Driver = await mongoose.models.driver || mongoose.model("driver",DriverSchema);
export default Driver;