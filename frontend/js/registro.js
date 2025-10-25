// Espera o conteúdo da página carregar antes de executar o script
document.addEventListener("DOMContentLoaded", () => {
  // Seleciona os elementos do formulário
  const registroForm = document.getElementById("registro-form")
  const nomeInput = document.getElementById("nome")
  const cpfInput = document.getElementById("cpf")
  const emailInput = document.getElementById("email")
  const senhaInput = document.getElementById("senha")
  const cargoInput = document.getElementById("cargo")
  const cnpjInput = document.getElementById("cnpj")
  const errorMessage = document.getElementById("error-message")
  const successMessage = document.getElementById("success-message")

  // Adiciona máscara de CPF enquanto o usuário digita
  cpfInput.addEventListener("input", (e) => {
    // Remove tudo que não é número
    e.target.value = e.target.value.replace(/\D/g, "")
  })

  cnpjInput.addEventListener("input", (e) => {
    // Remove tudo que não é número
    e.target.value = e.target.value.replace(/\D/g, "")
  })

  // Adiciona um "ouvinte" para o evento de "submit" (envio) do formulário
  registroForm.addEventListener("submit", async (event) => {
    // Previne o comportamento padrão do formulário
    event.preventDefault()

    // Limpa mensagens anteriores
    errorMessage.textContent = ""
    successMessage.textContent = ""

    // Pega os valores digitados pelo usuário
    const nome = nomeInput.value.trim()
    const cpf = cpfInput.value.trim()
    const email = emailInput.value.trim()
    const senha = senhaInput.value
    const cargo = cargoInput.value.trim()
    const cnpj = cnpjInput.value.trim()

    // Validação básica do CPF (11 dígitos)
    if (cpf.length !== 11) {
      errorMessage.textContent = "CPF deve conter 11 dígitos."
      return
    }

    if (cnpj.length !== 14) {
      errorMessage.textContent = "CNPJ deve conter 14 dígitos."
      return
    }

    // Define a URL do backend
    const backendUrl = "http://localhost:3001/funcionarios"

    try {
      // Usa a API 'fetch' para enviar os dados para o backend
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          cpf: cpf,
          email: email,
          senha: senha,
          cargo: cargo,
          cnpj: cnpj,
        }),
      })

      // Converte a resposta do backend para um objeto JavaScript
      const data = await response.json()

      // Verifica se a requisição foi bem-sucedida
      if (response.ok) {
        // Sucesso! Funcionário registrado
        console.log("Registro bem-sucedido:", data)

        successMessage.textContent = "Funcionário registrado com sucesso! Redirecionando..."

        // Limpa o formulário
        registroForm.reset()

        // Redireciona para a página de login após 2 segundos
        setTimeout(() => {
          window.location.href = "index.html"
        }, 2000)
      } else {
        // Se o status não for 'ok', exibe a mensagem de erro
        errorMessage.textContent = data.erro || "Erro ao registrar funcionário."
      }
    } catch (error) {
      // Captura erros de rede
      console.error("Erro na requisição:", error)
      errorMessage.textContent = "Não foi possível conectar ao servidor. Tente novamente mais tarde."
    }
  })
})
