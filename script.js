// Lógica do Modo Escuro / Claro
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon'); // Seleciona o ícone
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        // Muda para o modo claro
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    } else {
        // Muda para o modo escuro
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    }
});

// Lógica das Animações de Rolagem (Scroll Reveal)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Se o elemento estiver visível na tela, adiciona a classe 'show'
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1 // A animação começa quando 10% do elemento aparece na tela
});

// Seleciona todos os elementos com a classe 'hidden' e os observa
const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

// --- Lógica do Botão Voltar ao Topo ---
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Se rolar mais de 300px para baixo, mostra o botão
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show-btn');
    } else {
        backToTopBtn.classList.remove('show-btn');
    }
});

backToTopBtn.addEventListener('click', () => {
    // Rola suavemente para o topo
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- Lógica do Formulário para o WhatsApp ---
const formZap = document.getElementById('form-zap');

if (formZap) {
    formZap.addEventListener('submit', function(event) {
        // Evita que a página recarregue ao clicar no botão
        event.preventDefault(); 

        // 1. Substitua pelo seu número! 
        // Coloque 55 (Brasil) + Seu DDD (ex: 81 para PE) + Seu número
        const numero = "5581983250631"; 

        // 2. Pega os valores que a pessoa digitou
        const nome = document.getElementById('nome-zap').value;
        const email = document.getElementById('email-zap').value;
        const mensagem = document.getElementById('mensagem-zap').value;

        // 3. Monta o texto bonitinho (o %0A significa "quebra de linha" no link)
        const texto = `Olá! Vi o seu portfólio.%0A%0A*Nome:* ${nome}%0A*E-mail:* ${email}%0A*Mensagem:* ${mensagem}`;

        // 4. Cria o link oficial do WhatsApp e abre em uma nova aba
        const url = `https://wa.me/${numero}?text=${texto}`;
        window.open(url, '_blank');
    });
}

// --- Efeito de Digitação (Typing Effect) ---
const palavras = ["Desenvolvedor Full Stack", "Apaixonado por Tecnologia!"];
const textoDigitado = document.getElementById("texto-digitado");
const cursor = document.querySelector(".cursor");

let indexPalavra = 0;
let indexLetra = 0;
let apagando = false;

function digitar() {
    const palavraAtual = palavras[indexPalavra];
    
    if (apagando) {
        // Apagando texto
        textoDigitado.textContent = palavraAtual.substring(0, indexLetra - 1);
        indexLetra--;
    } else {
        // Digitando texto
        textoDigitado.textContent = palavraAtual.substring(0, indexLetra + 1);
        indexLetra++;
    }

    // Controle de velocidade
    let velocidade = apagando ? 50 : 100;

    // Pausa no final da palavra antes de apagar
    if (!apagando && indexLetra === palavraAtual.length) {
        velocidade = 2000; // Espera 2 segundos com a palavra inteira
        apagando = true;
        cursor.classList.remove("digitando");
    } 
    // Muda de palavra após apagar tudo
    else if (apagando && indexLetra === 0) {
        apagando = false;
        indexPalavra = (indexPalavra + 1) % palavras.length;
        velocidade = 500; // Espera meio segundo antes de começar a nova palavra
        cursor.classList.add("digitando");
    } else {
        cursor.classList.add("digitando");
    }

    setTimeout(digitar, velocidade);
}

// Inicia o efeito
if(textoDigitado) {
    setTimeout(digitar, 1000);
}

// --- Botão de Copiar E-mail ---
const btnCopiar = document.getElementById("btn-copiar-email");

if (btnCopiar) {
    btnCopiar.addEventListener("click", () => {
        // 1. Coloque o seu e-mail real aqui dentro das aspas:
        const meuEmail = "jvk25419@gmail.com"; 

        // 2. Copia para a área de transferência
        navigator.clipboard.writeText(meuEmail).then(() => {
            // 3. Muda o botão para dar um feedback visual
            const textoOriginal = btnCopiar.innerHTML;
            btnCopiar.innerHTML = '<i class="bi bi-check2-circle"></i> Copiado!';
            btnCopiar.style.color = "#10b981"; // Muda pra verde rapidinho
            btnCopiar.style.borderColor = "#10b981";

            // 4. Volta ao normal depois de 2 segundos
            setTimeout(() => {
                btnCopiar.innerHTML = textoOriginal;
                btnCopiar.style.color = "";
                btnCopiar.style.borderColor = "";
            }, 2000);
        });
    });
}