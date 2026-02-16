import mongoose from "mongoose";


const AdminSchema = new mongoose.Schema(
    {
        adminName:{
            type:String
        },
        email:{
            type:String
        },
        password:{
            type:String
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
);

const Admin = mongoose.models.admin || mongoose.model("admin",AdminSchema);
export default Admin;