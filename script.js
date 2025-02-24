function gerarCorAleatoria() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function mudarCorFundo() {
    // Muda a cor de fundo do body
    const corFundo = gerarCorAleatoria();
    document.body.style.backgroundColor = corFundo;
    
    // Muda a cor de todos os textos
    const textos = document.querySelectorAll('.texto-artigo, .titulo-artigo, .texto-lateral, .titulo-lateral');
    textos.forEach(texto => {
        texto.style.color = gerarCorAleatoria();
    });
    
    // Muda as cores dos links do menu de forma individual
    const menuLinks = document.querySelectorAll('.menu-link');
    menuLinks.forEach(link => {
        link.style.color = gerarCorAleatoria();
    });
}

function adicionarTarefa() {
    const input = document.getElementById('tarefa-input');
    const lista = document.getElementById('lista-tarefas');
    
    if (input.value.trim() !== '') {
        const li = document.createElement('li');
        li.textContent = input.value;
        
        const btnExcluir = document.createElement('button');
        btnExcluir.textContent = 'X';
        btnExcluir.className = 'botao-cor';
        btnExcluir.style.marginLeft = '10px';
        btnExcluir.onclick = function() {
            lista.removeChild(li);
        };
        
        li.appendChild(btnExcluir);
        lista.appendChild(li);
        input.value = '';
    }
}

async function carregarArtigos() {
    try {
        const response = await fetch('http://demo0193019.mockable.io/artigos');
        const data = await response.json();
        
        const container = document.getElementById('artigos-container');
        
        data.artigos.forEach(artigo => {
            const articleElement = document.createElement('article');
            articleElement.className = 'artigo';
            
            articleElement.innerHTML = `
                <h2 class="titulo-artigo">${artigo.titulo}</h2>
                <p class="texto-artigo">${artigo.conteudo}</p>
            `;
            
            container.appendChild(articleElement);
        });
    } catch (erro) {
        console.error('Erro ao carregar artigos:', erro);
    }
}

async function enviarFormulario(evento) {
    evento.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const comentario = document.getElementById('comentario').value;
    
    const dados = {
        nome: nome,
        email: email,
        comentario: comentario
    };
    
    try {
        const response = await fetch('http://demo0193019.mockable.io/contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        if (response.ok) {
            alert('Mensagem enviada com sucesso!');
            document.getElementById('formulario-contato').reset();
        } else {
            throw new Error('Erro ao enviar mensagem');
        }
    } catch (erro) {
        alert('Erro ao enviar mensagem. Por favor, tente novamente.');
        console.error('Erro:', erro);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarArtigos();
    document.getElementById('formulario-contato').addEventListener('submit', enviarFormulario);
});