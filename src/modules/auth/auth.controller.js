import userModel from "../../../DB/models/user.model.js"
import bcrypt from "bcryptjs"
import { sendEmail } from "../../utils/sendEmail.js"
import jwt from "jsonwebtoken"
import { customAlphabet, nanoid } from "nanoid"

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
    return res.status(201).json({message:"success", token})
}
export const confirmEmail = async(req,res)=>{
    const {token} = req.params
    const decoded = jwt.verify(token,process.env.CONFIRMEMAILSIQNAL)
    await userModel.findOneAndUpdate({email:decoded.email},{confirmEmail:true})
        return res.status(200).json({message:"success"})

}
export const login = async (req,res)=>{
const {email,password} = req.body
const user = await userModel.findOne({email})
if(!user){
    return res.status(400).json({message:"invalid data"})
}
if(!user.confirmEmail){
    return res.status(400).json({message:"plz confirm your email"})
}
if(user.status=="not_active"){
    return res.status(400).json({message:"yoir account is blocked "})
}
const match = await bcrypt.compare(password,user.password)
if(!match){
        return res.status(400).json({message:"invalid data"})
}
const token = jwt.sign({id:user._id,userName:user.userName,role:user.role},process.env.LOGIN_SIQNAL)

    return res.status(200).json({message:"success",token})
}
export const sendCode = async (req,res)=>{
const {email} = req.body
const code = customAlphabet('1234567890abcdefABCDEF', 4)()
const user = await userModel.findOneAndUpdate({email}, {sendCode:code})
const html = `
<h2>Code is ${code}</h2>
`
await sendEmail(email , 'reset password' , html)
return res.status(200).json({message:"success"})
}
export const resetPassword = async (req,res)=>{
const {email,code,password} = req.body
const user = await userModel.findOne({email})
if(!user){
        return res.status(400).json({message:"not register account"})
}
if(user.sendCode != code){
         return res.status(400).json({message:"invalid code"})
}
const hashpassword = bcrypt.hashSync(password,parseInt(process.env.SALT_Round))
user.password = hashpassword
user.sendCode = null;
await user.save()
return res.status(200).json({message:"success"})
}