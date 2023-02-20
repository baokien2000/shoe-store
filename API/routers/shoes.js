// import express
import express from "express";
import { createShoes, getShoes, UpdateShoes } from "../controllers/shoes.js";
const routers = express.Router()

routers.get("/", getShoes)
routers.post("/", createShoes)
routers.post("/Update", UpdateShoes)
export default routers;