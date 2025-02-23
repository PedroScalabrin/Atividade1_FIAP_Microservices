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
