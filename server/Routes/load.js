import express from "express"
import loadData from "../Controllers/load.js"


const router = express.Router()

router.route("/")
    .get(loadData)


export default router
