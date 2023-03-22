import express from "express"
import "express-async-errors"
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get("/data",async(req,res)=>{
    const data = await prisma.database.findMany();
    res.json(data)
})

app.post("/data", async(req,res)=>{
    const datas = req.body
    const data = await prisma.database.create({
        data: datas
    })
    res.status(201).json(data)
})

export default app