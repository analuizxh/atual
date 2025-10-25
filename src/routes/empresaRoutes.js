import { Router } from 'express'
import { registerEmpresa, loginEmpresa, updateEmpresa, logoutEmpresa } from '../controllers/empresaController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = Router()

router.post('/register', registerEmpresa)
router.post('/login' , loginEmpresa)
router.put('/', authMiddleware, updateEmpresa)
router.post('/logout', authMiddleware, logoutEmpresa)
export default router
