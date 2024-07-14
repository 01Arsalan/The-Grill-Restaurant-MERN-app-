import express from "express"
import { isUser,saveOrUpdateUser,logoutUser} from "../Controllers/user.js"
import { validateUserData} from "../Utils/middleware.js"

const router = express.Router()

router.route("/saveuser")
    .post(validateUserData,saveOrUpdateUser)

router.route("/isuser")
    .post(isUser)

router.route("/updateuser")
    .post(saveOrUpdateUser)

router.route('/logout')
    .post(logoutUser);

export default router

