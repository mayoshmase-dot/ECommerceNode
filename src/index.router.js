import cors from 'cors'
import authRouter from './modules/auth/auth.router.js'
import categoryRouter from './modules/category/category.router.js'
import connectDb from '../DB/connection.js'

const initApp = async (app, express) => {
    connectDb()
    app.use(express.json())
    app.use(cors())
    app.use('/auth', authRouter)
app.use('/category' ,categoryRouter)
    app.get('/', (req, res) => {
        return res.status(200).json({ message: "welcome" });
    })
    app.use((req, res) => {
        return res.status(400).json({ message: "page not found" });
    })
}
export default initApp