import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Criar medição
export async function criarMedicao(req, res) {
  try {
    const { clienteId, enderecoId, status, dataAgendada } = req.body;

    // Converter a data recebida para um objeto Date
    const dataFormatada = dataAgendada ? new Date(dataAgendada) : null;

    const medicao = await prisma.medicao.create({
      data: {
        clienteId: Number(clienteId),
        enderecoId: Number(enderecoId),
        // CORREÇÃO: O status deve ser 'PENDENTE' (maiúsculo) para corresponder ao Enum do schema.prisma
        // O schema já define 'PENDENTE' como default.
        status: status || 'PENDENTE',
        dataAgendada: dataFormatada
      }
    });

    // CORREÇÃO: Este bloco estava errado.
    // Ele tentava atualizar a medição com ID=1 para "Concluido"
    // toda vez que uma NOVA medição era criada. Foi removido.
    /*
    const concluida = await prisma.medicao.update({
      where:{id:1},
      data:{status: 'Concluido'}
    })
    */

    res.status(201).json(medicao);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar medição' });
  }
}

// Listar medições
export async function listarMedicoes(req, res) {
  try {
    const medicoes = await prisma.medicao.findMany({
      include: { cliente: true, endereco: true }
    });
    res.json(medicoes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao listar medições' });
  }
}

// Atualizar status
export async function atualizarStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body; // O status enviado (ex: 'CONCLUIDO' ou 'PENDENTE')

  try {
    const medicao = await prisma.medicao.update({
      where: { id: Number(id) },
      data: { status }
    });
    res.json(medicao);
  } catch (err) {
    console.error(err);
    // Erro comum aqui é enviar status que não existe no Enum (ex: 'concluido' minúsculo)
    res.status(400).json({ erro: 'Erro ao atualizar status da medição' });
  }
}

// Concluir medição (atualizar medidas e observação)
export async function concluirMedicao(req, res) {
  const { id } = req.params;
  const { altura, largura, observacao } = req.body;

  try {
    const medicao = await prisma.medicao.update({
      where: { id: Number(id) },
      data: {
        altura: altura ? Number(altura) : null,
        largura: largura ? Number(largura) : null,
        observacao,
        // CORREÇÃO: O status deve ser 'CONCLUIDO' (maiúsculo) para corresponder ao Enum
        status: 'CONCLUIDO'
      }
    });
    res.json(medicao);
  } catch (err) {
    console.error(err);
    res.status(400).json({ erro: 'Erro ao concluir medição' });
  }
}

// Excluir medição
export async function excluirMedicao(req, res) {
  const { id } = req.params;

  try {
    await prisma.medicao.delete({ where: { id: Number(id) } });
    res.json({ mensagem: 'Medição removida com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ erro: 'Erro ao excluir medição' });
  }
}

// Editar medição (atualiza campos como dataAgendada, enderecoId, clienteId, status)
export async function editarMedicao(req, res) {
  const { id } = req.params;
  const { clienteId, enderecoId, status, dataAgendada, altura, largura, observacao } = req.body;

  try {
    const dataFormatada = dataAgendada ? new Date(dataAgendada) : undefined;

    const medicao = await prisma.medicao.update({
      where: { id: Number(id) },
      data: {
        clienteId: clienteId ? Number(clienteId) : undefined,
        enderecoId: enderecoId ? Number(enderecoId) : undefined,
        status: status ?? undefined,
        dataAgendada: dataFormatada,
        altura: altura !== undefined ? (altura ? Number(altura) : null) : undefined,
        largura: largura !== undefined ? (largura ? Number(largura) : null) : undefined,
        observacao: observacao ?? undefined
      }
    });

    res.json(medicao);
  } catch (err) {
    console.error(err);
    res.status(400).json({ erro: 'Erro ao editar medição' });
  }
}