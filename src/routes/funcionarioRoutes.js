import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'
import {
  registerFuncionario,
  loginFuncionario,
  listarFuncionarios,
  atualizarFuncionario,
  deletarFuncionario,
  resetSenhaFuncionario
} from '../controllers/funcionarioController.js'

const router = Router()

router.post('/', auth, registerFuncionario)
router.get('/', auth, listarFuncionarios)
router.put('/:id', auth, atualizarFuncionario)
router.delete('/:id', auth, deletarFuncionario)

router.post('/login', loginFuncionario)
router.post('/reset-senha', resetSenhaFuncionario)

export default router