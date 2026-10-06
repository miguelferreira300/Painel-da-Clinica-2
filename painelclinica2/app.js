// ==========================================
// 1. CLASSE DE DOMÍNIO: Cliente
// ==========================================
class Cliente {
    #nome;
    #altura;
    #peso;

    constructor(nome, altura, peso) {
        this.#nome = nome;
        this.#altura = Number(altura);
        this.#peso = Number(peso);
    }

    get nome() {
        return this.#nome;
    }

    get altura() {
        return this.#altura;
    }

    get peso() {
        return this.#peso;
    }

    // Regra de Negócio: Calcular IMC (peso / altura²)
    calcularIMC() {
        return this.#peso / (this.#altura * this.#altura);
    }

    // Regra de Negócio: Classificação via switch(true)
    definirClassificacao() {
        const imc = this.calcularIMC();

        switch (true) {
            case (imc < 18.5):
                return "Abaixo do peso";
            case (imc <= 24.99):
                return "Peso Normal";
            case (imc <= 29.99):
                return "Sobrepeso";
            default:
                return "Obesidade";
        }
    }
}

// ==========================================
// 2. CLASSE CONTROLADORA (MVP): PainelApp
// ==========================================
class PainelApp {
    constructor() {
        this.clientes = [];
        this.formulario = document.getElementById("form-paciente");
        this.tabelaBody = document.getElementById("corpo-tabela");

        this.iniciar();
    }

    iniciar() {
        // Intercepta a submissão do formulário
        this.formulario.addEventListener("submit", (evento) => {
            evento.preventDefault();
            this.cadastrarCliente();
        });
    }

    cadastrarCliente() {
        const nome = document.getElementById("nome").value.trim();
        const altura = parseFloat(document.getElementById("altura").value);
        const peso = parseFloat(document.getElementById("peso").value);

        // Validação de segurança básica (Nível 2)
        if (altura <= 0 || peso <= 0) {
            alert("Altura e peso devem ser maiores que zero.");
            return;
        }

        // Instancia o novo paciente e salva na lista
        const novoCliente = new Cliente(nome, altura, peso);
        this.adicionarCliente(novoCliente);

        // Limpa o formulário após a inserção
        this.formulario.reset();
        document.getElementById("nome").focus();
    }

    adicionarCliente(cliente) {
        this.clientes.push(cliente);
        this.renderizarPainel();
    }

    renderizarPainel() {
        // Limpa a tabela para renderizar a lista atualizada
        this.tabelaBody.innerHTML = "";

        // Itera sobre a lista gerando as linhas dinamicamente
        this.clientes.forEach((cliente) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${cliente.nome}</td>
                <td>${cliente.altura.toFixed(2)}</td>
                <td>${cliente.peso.toFixed(1)}</td>
                <td>${cliente.calcularIMC().toFixed(2)}</td>
                <td>${cliente.definirClassificacao()}</td>
            `;

            this.tabelaBody.appendChild(tr);
        });
    }
}

// Inicializa a aplicação quando o script carregar
new PainelApp();