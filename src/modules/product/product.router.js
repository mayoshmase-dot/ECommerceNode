import { Router } from "express";
import * as controller from './product.controller.js'
import { auth } from "../../middleware/auth.js";
import fileUpload ,{fileValidation} from "../../utils/multer.js";
const router = Router()

router.post('/', auth(['admin']), fileUpload(fileValidation.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImage', maxCount: 4 }
]), controller.create)

export default router