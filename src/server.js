import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import clienteRoutes from './routes/clienteRoutes.js'
import medicaoRoutes from './routes/medicaoRoutes.js'
import relatorioRoutes from './routes/relatorioRoutes.js'
import empresaRoutes from './routes/empresaRoutes.js';
import enderecoRoutes from './routes/enderecoRoutes.js'
import funcionarioRoutes from './routes/funcionarioRoutes.js'
// CORREÇÃO: Importa as rotas de produto (estava faltando)
import produtoRoutes from './routes/produtoRoutes.js'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())


app.use('/clientes', clienteRoutes)
app.use('/medicoes', medicaoRoutes)
app.use('/relatorios', relatorioRoutes)
app.use('/empresas', empresaRoutes)
app.use('/enderecos', enderecoRoutes)
app.use('/funcionarios', funcionarioRoutes)
// CORREÇÃO: Registra o uso das rotas de produto (estava faltando)
app.use('/produtos', produtoRoutes)


const PORT = process.env.PORT || 3001

const server = app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`))

server.on('error', (err) => {
	if (err && err.code === 'EADDRINUSE') {
		console.error(`Port ${PORT} is already in use. Make sure no other process is listening on this port.`)
		process.exit(1)
	}
	console.error('Server error:', err)
	process.exit(1)
})