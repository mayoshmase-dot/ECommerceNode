import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log("DB Connected successfully!")
    } catch (error) {
        console.log(`Error connecting to DB: ${error}`)
    }
}

export default connectDb