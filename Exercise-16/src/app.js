import express from "express"
import "express-async-errors"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()
const app = express()

app.get("/data",async(req,res)=>{
    const data = await prisma.database.findMany();
    res.json(data)
})

export default app