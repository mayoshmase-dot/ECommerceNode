import userModel from "../../../DB/models/user.model.js"
import bcrypt from "bcryptjs"

export const register = async (req,res)=>{
const {userName,email,password} = req.body
const user = await userModel.findOne({email})
if(user){
    return res.status(400).json({message:"email already register"})
}
const hashPassword = bcrypt.hashSync(password,parseInt(process.env.SALT_Round))
const creatUser = await userModel.create({userName,email,password:hashPassword})
    return res.status(200).json({message:"success",creatUser})

}