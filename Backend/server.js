import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import {clerkMiddleware} from '@clerk/express'
import {clerkwebhook} from 'controllers/clerkWebhook.js'

connectDB();
const app = express();
app.use(cors()) //enable cross - orgin resource 
//middle ware 
app.use(express.json())
app.use(clerkMiddleware())

//Clerk WH 
app.use("/api/clerk",clerkwebhook)


app.get('/',(req,res) => res.send("API is Working"))

const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=> console.log(`Server runing on port ${PORT} `))

