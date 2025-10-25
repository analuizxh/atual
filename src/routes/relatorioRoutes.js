import { Router } from 'express'
import auth from '../middlewares/authMiddleware.js'

// CORREÇÃO: Importa o controller real que busca no banco de dados
import { gerarRelatorio } from '../controllers/relatorioController.js'

const router = Router()

// CORREÇÃO: A função mock local (com dados falsos) foi removida.

// Rota protegida com JWT agora usa o controller real importado
router.get('/', auth, gerarRelatorio)

export default router