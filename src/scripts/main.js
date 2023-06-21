document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-sorteador').addEventListener('submit', function(evento) { // Adicionando um listener ao botão submit
        evento.preventDefault() // Tirando o comportamento padrão do formulário de recarregar a página
        var numeroMaximo = document.getElementById('numero-maximo').value; // Criando a variável que vai receber número máximo 
        numeroMaximo = parseInt(numeroMaximo); // Convertendo para número inteiro
        // Math.random() é uma função que retorna qualquer número entre 0 e 1
        var numeroAleatorio = Math.random() * numeroMaximo; // Fórmula matemática
        numeroAleatorio = Math.floor(numeroAleatorio + 1); // Math.floor() arredonda o valor selecionado para baixo

        document.getElementById('resultado-valor').innerText = numeroAleatorio //Injetando o valor dentro do span que tem o id 'resultado-valor'
        document.querySelector('.resultado').style.display = 'block' // Mudando o display de .resultado de "none" para "block"
    })
})