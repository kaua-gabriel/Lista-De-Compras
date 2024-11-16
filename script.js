document.addEventListener("DOMContentLoaded", function() {
    const produtoInput = document.getElementById("produto");
    const precoInput = document.getElementById("preco");
    const adicionarBtn = document.getElementById("adicionar");
    const analisarListaBtn = document.getElementById("analisarLista");
    const listaCompras = document.getElementById("listaCompras");
    const valorTotal = document.getElementById("valorTotal");
    const limparListaBtn = document.getElementById("limparLista");

    let produtos = [];

    // Função para adicionar um produto à lista
    function adicionarProduto() {
        const produto = produtoInput.value.trim();
        const preco = parseFloat(precoInput.value.trim());

        if (!produto || isNaN(preco) || preco <= 0) {
            alert("Por favor, insira um nome válido e preço válido para o produto.");
            return;
        }

        const novoProduto = { nome: produto, preco: preco };
        produtos.push(novoProduto);

        // Limpar os campos após adicionar
        produtoInput.value = "";
        precoInput.value = "";
        produtoInput.focus();
    }

    // Função para analisar a lista e mostrar os produtos e o valor total
    function analisarLista() {
        if (produtos.length === 0) {
            alert("A lista está vazia.");
            return;
        }

        // Limpar a lista atual
        listaCompras.innerHTML = "";

        let total = 0;
        produtos.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;
            listaCompras.appendChild(li);
            total += item.preco;
        });

        valorTotal.textContent = total.toFixed(2);
    }

    // Função para limpar a lista
    function limparLista() {
        produtos = [];
        listaCompras.innerHTML = "";
        valorTotal.textContent = "0.00";
        produtoInput.value = "";
        precoInput.value = "";
    }

    // Eventos
    adicionarBtn.addEventListener("click", adicionarProduto);
    analisarListaBtn.addEventListener("click", analisarLista);
    limparListaBtn.addEventListener("click", limparLista);
});