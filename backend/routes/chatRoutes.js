import express from 'express'
import {protect} from '../middlewares/authMiddleware.js'
import {accessChat,fetchChats} from '../controllers/chatControllers.js'
const router = express.Router()
//access or create chat
router.route('/').post(protect,accessChat)
router.route('/').get(protect,fetchChats)
// //creation of group chat
// router.route('/group').post(protect,createGroupChat)
// //rename the group
// router.route('/rename').put(protect,renameGroup)
// //remove someone from group
// router.route('/groupremove').put(protect,removeFromGroup)
// //add someone to group
// router.route('/groupadd').put(protect,addToGroup)
export default router
