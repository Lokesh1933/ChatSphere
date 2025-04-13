import express from "express"
import  {authUser, registerUser} from "../controllers/userControllers.js"
const router  = express.Router()
//for chaining multiple get ,post request etc. we can do router.route
//the / will be after /api/user
router.route('/').post(registerUser)
router.post('/login',authUser)
export default router
