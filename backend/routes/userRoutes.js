import express from "express"
import  {authUser, registerUser,allUsers} from "../controllers/userControllers.js"
import { protect } from "../middlewares/authMiddleware.js"
const router  = express.Router()
router.use(express.json())
//for chaining multiple get ,post request etc. we can do router.route
//the / will be after /api/user
router.route('/').post(registerUser).get(protect,allUsers)
router.post('/login',authUser)

export default router
