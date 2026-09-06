import { Router } from "express";
import * as controller from './category.controller.js'
import { auth } from "../../middleware/auth.js";
const router = Router()

router.post('/',auth(['admin']),controller.create)
router.get('/',controller.get)
router.get('/active',controller.getActive)
router.get('/:id',controller.details)
router.put('/:id',controller.update)
router.delete('/:id',controller.remove)

export default router