import {Router} from 'express'
import * as task from "../task/task .controller.js"
import expressAsyncHandler from "express-async-handler";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { auth } from "../../middlewares/auth.middleware.js";
import { AddTaskScheme, Get_Tasks_of_one_User_Scheme, deletedTaskScheme, updatedTaskScheme } from './task.validationSchemas.js';
const router =Router()


router.post("/AddTask",validationMiddleware(AddTaskScheme),auth(),expressAsyncHandler(task.AddTask))
router.put("/updateTask",validationMiddleware(updatedTaskScheme),auth(),expressAsyncHandler(task.updateTask))
router.delete("/deleteTask",validationMiddleware(deletedTaskScheme),auth(),expressAsyncHandler(task.deleteTask))

router.get("/Get_Tasks_with_User_Data",expressAsyncHandler(task.Get_Tasks_with_User_Data))
router.get("/Get_Tasks_of_one_User",validationMiddleware(Get_Tasks_of_one_User_Scheme),auth(),expressAsyncHandler(task.Get_Tasks_of_one_User))
router.get("/Get_all_after_deadline",expressAsyncHandler(task.Get_all_after_deadline))



export default router
