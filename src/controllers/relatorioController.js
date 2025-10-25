import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// CORREÇÃO: A palavra 'export' aqui é essencial
export async function gerarRelatorio(req, res) {
  try {
    const empresaId = req.user.id

    // Agrupa por status, contando quantas medições de cada
    const resultado = await prisma.medicao.groupBy({
      by: ['status'],
      where: {
        cliente: { empresaId }
      },
      _count: { _all: true }
    })

    // Monta um objeto com ambos os status sempre presentes
    const relatorio = {
      // Usa os nomes do Enum do Prisma
      PENDENTE: 0, 
      CONCLUIDO: 0
    }
    for (const item of resultado) {
      // Garante que o status (ex: 'PENDENTE') exista no objeto
      if (item.status in relatorio) {
        relatorio[item.status] = item._count._all
      }
    }

    res.json({ empresaId, relatorio })
  } catch (error) {
    console.error(error)
    res.status(500).json({ erro: "Erro ao gerar relatório" })
  }
}