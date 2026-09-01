import mongoose, { model,Schema} from "mongoose";

const userSchema = new Schema({
userName:{type:String,required:true},
email:{type:String,required:true,unique:true, min:3 , max:50},
password:{type:String,required:true , min:4},
image:{type:Object},
phone:{type:String},
address:{type:String},
confirmEmail:{type:Boolean,default:false},
gender:{type:String,enum:["male","female"]},
status:{type:String,enum:["active","not_active"]},
role:{type:String,default:'user',enum:["admin","user"]},

},{
    timestamps:true
})

const userModel = mongoose.models.User || model('User', userSchema)
export default userModel