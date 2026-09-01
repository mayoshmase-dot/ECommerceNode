import userModel from "../../../DB/models/user.model.js"
import bcrypt from "bcryptjs"
import { sendEmail } from "../../utils/sendEmail.js"
import jwt from "jsonwebtoken"
export const register = async (req,res)=>{
const {userName,email,password} = req.body
const user = await userModel.findOne({email})
if(user){
    return res.status(400).json({message:"email already register"})
}
const hashPassword = bcrypt.hashSync(password,parseInt(process.env.SALT_Round))
const creatUser = await userModel.create({userName,email,password:hashPassword})
const token = jwt.sign({email},process.env.CONFIRMEMAILSIQNAL)
const html = `
<div>
<h1></h1>
<h2></h2>
<a href="${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}"></a>
</div>
`
await sendEmail(email , "Confirm Email" , html)
    return res.status(201).json({message:"success",token})
}
export const confirmEmail = async(req,res)=>{
    const {token} = req.params
    const decoded = jwt.verify(token,process.env.CONFIRMEMAILSIQNAL)
    await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true})
        return res.status(200).json({message:"success"})

}