
import { Router } from "express";
import * as userController from './user.controller.js'
import expressAsyncHandler from "express-async-handler";
import { auth } from "../../middlewares/auth.middleware.js";
import { validationMiddleware } from "../../middlewares/validation.middleware.js";
import { ChangePasswordSchema, SignInSchema, UpdateAccountSchema, deleteAccountSchema, deleteSoftSchema, signUpSchema } from "./user.validationSchemas.js";
import { allowedExtensions } from "../../utils/allowedExtensions.js";
import { multerMiddle } from "../../middlewares/multer.js";

const router = Router()


router.post('/',validationMiddleware(signUpSchema), expressAsyncHandler(userController.SignUpHandeler))
router.post('/login',validationMiddleware(SignInSchema), expressAsyncHandler(userController.SignInHandeler))
router.put('/ChangePassword',validationMiddleware(ChangePasswordSchema),auth(),  expressAsyncHandler(userController.ChangePassword))


router.get('/', auth(), expressAsyncHandler(userController.getUserProfile))
router.put('/', validationMiddleware(UpdateAccountSchema),auth(), expressAsyncHandler(userController.updateAccount))
router.delete('/', validationMiddleware(deleteAccountSchema),auth(), expressAsyncHandler(userController.deleteAccount))

router.get('/deleteSoft',validationMiddleware(deleteSoftSchema), auth(), expressAsyncHandler(userController.deleteSoft))

router.post('/upload',multerMiddle({extensions: allowedExtensions.image,filePath:'customers/profiles'}).fields([
        {
            name: 'profile',
            maxCount: 1
        },
        {
            name: 'cover',
            maxCount: 2
        }
    ]),
    expressAsyncHandler(userController.fileUpload))




    
export default router
