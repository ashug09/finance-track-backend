import express, { urlencoded } from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()
app.use(express.json({limit: "16kb"}))
app.use(urlencoded({extended: true, limit: "16kb"}))
app.use(cors({origin: "http://localhost:3000"}))
app.use(cookieParser())
app.use(express.static("public/temp"))

//router configuration
import router from "./routes/user.routes.js"





//router declaration
app.use("/api/v1/user", router)
export default app