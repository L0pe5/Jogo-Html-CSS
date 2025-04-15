let nivelAtual = 0;
let pontos = 0; 
let nivelConcluido = false;

const categoryIcons = {
  "h1": "📝", "div": "📦", "p": "🔤", "button": "🖱️", 
  "img": "🖼️", "style": "🎨", "a": "🔗", "ul": "📋",
  "form": "📝", "table": "📊"
};

const niveis = [
  // Níveis 1-5 (originais)
  {
    titulo: "Nível 1",
    pergunta: "Use uma tag de título apropriada para mostrar a frase 'Olá Mundo' com destaque.",
    resposta: /<h1>Olá\s*Mundo<\/h1>/i,
    dica: "Títulos são representados por tags específicas para destacar diferentes níveis de importância."
  },
  {
    titulo: "Nível 2",
    pergunta: "Crie uma divisão de conteúdo (div) com uma classe identificadora chamada 'container'.",
    resposta: /<div\s+class=["']container["']\s*><\/div>/i,
    dica: "Atributos são usados para adicionar características a elementos HTML."
  },
  {
    titulo: "Nível 3",
    pergunta: "Insira um parágrafo contendo a frase 'Bem-vindo!'.",
    resposta: /<p>Bem-vindo!<\/p>/i,
    dica: "Parágrafos são usados para blocos de texto."
  },
  {
    titulo: "Nível 4",
    pergunta: "Adicione um botão que exiba a frase 'Clique aqui'.",
    resposta: /<button>Clique aqui<\/button>/i,
    dica: "Use a estrutura correta para elementos interativos de clique."
  },
  {
    titulo: "Nível 5",
    pergunta: "Insira uma imagem com o caminho 'logo.png' e uma descrição acessível dizendo 'Logo'.",
    resposta: /<img src=["']logo\.png["'] alt=["']Logo["']\s*\/>/i,
    dica: "As imagens precisam de um texto alternativo por acessibilidade."
  },
  // Debug 1 (após 5 níveis)
  {
    tipo: "debug",
    titulo: "Debug 1 - Tags Básicas",
    pergunta: "Corrija os 3 erros neste código HTML:",
    codigoComErros: `<div class=container><h1>Bem-vindo</h2><p>Este é um parágrafo com problemas<img src="foto.png" alt="foto">`,
    resposta: `<div class="container"><h1>Bem-vindo</h1><p>Este é um parágrafo com problemas</p><img src="foto.png" alt="foto">`,
    dica: "Verifique: 1) Aspas na classe, 2) Tag h1 fechando com h2, 3) Tag p não fechada",
    erros: 3
  },
  // Níveis 6-10 (originais)
  {
    titulo: "Nível 6",
    pergunta: "Adicione um texto na página e aplique um estilo para que ele apareça em vermelho.",
    resposta: /<style>.*?color:\s*red;.*?<\/style>/is,
    dica: "Use regras de estilo para alterar a cor do texto exibido na página."
  },
  {
    titulo: "Nível 7",
    pergunta: "Escreva um parágrafo com qualquer frase e centralize o texto horizontalmente na página usando CSS.",
    resposta: /<style>.*?text-align:\s*center;.*?<\/style>.*?<p>.*?<\/p>/is,
    dica: "Pense em como alinhar o conteúdo textual horizontalmente usando uma propriedade de estilo."
  },
  {
    titulo: "Nível 8",
    pergunta: "Crie uma div e use CSS para deixar o fundo dela azul.",
    resposta: /<style>.*?div\s*{[^}]*background-color:\s*blue;[^}]*}.*?<\/style>.*?<div><\/div>/is,
    dica: "A cor de fundo é definida dentro de um bloco de estilo CSS."
  },
  {
    titulo: "Nível 9",
    pergunta: "Adicione um parágrafo com texto e aumente o tamanho da fonte para 24px usando CSS.",
    resposta: /<style>.*?p\s*{[^}]*font-size:\s*24px;[^}]*}.*?<\/style>.*?<p>.*?<\/p>/is,
    dica: "A propriedade que ajusta o tamanho do texto deve ser aplicada ao elemento correto."
  },
  {
    titulo: "Nível 10",
    pergunta: "Crie um link que leve para 'https://www.google.com' com o texto 'Ir para o Google'.",
    resposta: /<a href=["']https:\/\/www\.google\.com["']>Ir para o Google<\/a>/i,
    dica: "Use a tag de hyperlink com um endereço válido."
  },
  // Debug 2 (após 10 níveis)
  {
    tipo: "debug",
    titulo: "Debug 2 - CSS Básico",
    pergunta: "Corrija os 4 erros nesta folha de estilo:",
    codigoComErros: `<style>
      div {
        background-color: blue
        margin: 10px
        padding 15px;
        border-radios: 5px;
      }
    </style>`,
    resposta: `<style>div{background-color:blue;margin:10px;padding:15px;border-radius:5px;}</style>`,
    dica: "Erros a corrigir:\n1. Falta ; após blue\n2. Falta ; após 10px\n3. Falta : após padding\n4. border-radios deveria ser border-radius",
    erros: 4
  },
  {
    titulo: "Nível 11",
    pergunta: "Crie uma lista não ordenada com três itens de sua escolha.",
    resposta: /<ul>\s*<li>.*?<\/li>\s*<li>.*?<\/li>\s*<li>.*?<\/li>\s*<\/ul>/is,
    dica: "Pense nas tags usadas para listas e itens."
  },
  {
    titulo: "Nível 12",
    pergunta: "Crie um formulário com um campo de texto e um botão de envio.",
    resposta: /<form>.*?<input.*?type=["']text["'].*?>.*?<button.*?>.*?<\/button>.*?<\/form>/is,
    dica: "Considere os elementos básicos de um formulário."
  },
  {
    titulo: "Nível 13",
    pergunta: "Use CSS para transformar o texto de um parágrafo em negrito.",
    resposta: /<style>.*?p\s*{[^}]*font-weight:\s*bold;[^}]*}.*?<\/style>.*?<p>.*?<\/p>/is,
    dica: "O estilo de peso da fonte é usado para destacar textos."
  },
  {
    titulo: "Nível 14",
    pergunta: "Adicione uma borda de 2px sólida preta em uma div usando CSS.",
    resposta: /<style>.*?div\s*{[^}]*border:\s*2px\s+solid\s+black;[^}]*}.*?<\/style>.*?<div><\/div>/is,
    dica: "A propriedade que define limites visuais ao redor do elemento começa com 'b'."
  },
  {
    titulo: "Nível 15",
    pergunta: "Use CSS para deixar o fundo de um parágrafo amarelo.",
    resposta: /<style>.*?p\s*{[^}]*background-color:\s*yellow;[^}]*}.*?<\/style>.*?<p>.*?<\/p>/is,
    dica: "Você já usou essa propriedade antes com outras cores."
  },
  // Debug 3 (após 15 níveis)
  {
    tipo: "debug",
    titulo: "Debug 3 - Formulário",
    pergunta: "Corrija os 5 erros neste formulário:",
    codigoComErros: `<form action="processa.php" method="get">
      <label for=nome>Nome:</label>
      <input type="text" id="nome name="nome">
      <input type="submit" valu="Enviar">
    </form>`,
    resposta: `<form action="processa.php" method="post">
      <label for="nome">Nome:</label>
      <input type="text" id="nome" name="nome">
      <input type="submit" value="Enviar">
    </form>`,
    dica: "Verifique: 1) Aspas, 2) Atributos faltando, 3) Valores incorretos",
    erros: 5
  },
  // Níveis 16-20 (originais)
  {
    titulo: "Nível 16",
    pergunta: "Crie um input do tipo email dentro de um formulário.",
    resposta: /<form>.*?<input.*?type=["']email["'].*?>.*?<\/form>/is,
    dica: "A entrada deve validar um endereço eletrônico."
  },
  {
    titulo: "Nível 17",
    pergunta: "Adicione um título de nível 2 com um texto qualquer e mude sua cor para verde usando CSS.",
    resposta: /<style>.*?h2\s*{[^}]*color:\s*green;[^}]*}.*?<\/style>.*?<h2>.*?<\/h2>/is,
    dica: "Já aplicou cor antes — agora mude o elemento alvo."
  },
  {
    titulo: "Nível 18",
    pergunta: "Use CSS para aplicar margem de 20px em uma div.",
    resposta: /<style>.*?div\s*{[^}]*margin:\s*20px;[^}]*}.*?<\/style>.*?<div><\/div>/is,
    dica: "A propriedade ajuda a afastar o elemento de outros ao redor."
  },
  {
    titulo: "Nível 19",
    pergunta: "Crie uma tabela com duas colunas e uma linha de conteúdo.",
    resposta: /<table>.*?<tr>\s*<td>.*?<\/td>\s*<td>.*?<\/td>\s*<\/tr>.*?<\/table>/is,
    dica: "Use as tags corretas para tabelas e células."
  },
  {
    titulo: "Nível 20",
    pergunta: "Crie um parágrafo e use CSS para deixá-lo em itálico.",
    resposta: /<style>.*?p\s*{[^}]*font-style:\s*italic;[^}]*}.*?<\/style>.*?<p>.*?<\/p>/is,
    dica: "Procure a propriedade que define o estilo da fonte como cursiva."
  }
];

function normalizarCodigo(html) {
  return html
    .replace(/\s+/g, ' ')
    .replace(/\s*([<>{};:,])\s*/g, '$1')
    .replace(/"\s+/g, '"')
    .replace(/\s+"/g, '"')
    .trim();
}


function carregarNivel() {
  const nivel = niveis[nivelAtual];
  
  if (nivel.tipo === "debug") {
    carregarDebug();
  } else {
    document.getElementById("nivel-titulo").innerHTML = 
      `<span class="level-icon">${getCategoryIcon(nivel.resposta)}</span>${nivel.titulo}`;
    document.getElementById("pergunta").textContent = nivel.pergunta;
    document.getElementById("codigo").value = "";
    document.getElementById("dica").style.display = "none";
    document.getElementById("proximo-nivel").style.display = "none";
    document.getElementById("codigo").classList.remove("correto", "errado");
    document.getElementById("feedback-icon").textContent = "";
    nivelConcluido = false;
    
    updateProgressBar();
    atualizarPontos();
    atualizarPreview();
  }
}

function carregarDebug() {
  const nivel = niveis[nivelAtual];
  document.getElementById("nivel-titulo").innerHTML = 
    `<span class="level-icon">🔍</span>${nivel.titulo}`;
  document.getElementById("pergunta").textContent = nivel.pergunta;
  document.getElementById("codigo").value = nivel.codigoComErros;
  document.getElementById("dica").style.display = "none";
  document.getElementById("debug-hint").classList.remove("show");
  document.getElementById("proximo-nivel").style.display = "none";
  document.getElementById("codigo").classList.remove("correto", "errado");
  document.getElementById("feedback-icon").textContent = "";
  nivelConcluido = false;
  
  // Mostra contador de erros
  document.getElementById("debug-counter").style.display = "block";
  document.getElementById("debug-counter").textContent = `Erros: ${nivel.erros}`;
  
  updateProgressBar();
  atualizarPontos();
  atualizarPreview();
}

function getCategoryIcon(regex) {
  const str = regex.toString();
  
  // Verifica primeiro se é um nível de debug
  if (niveis[nivelAtual].tipo === "debug") {
    return "🔍";
  }
  
  for (const [tag, icon] of Object.entries(categoryIcons)) {
    if (str.includes(`<${tag}`)) return icon;
  }
  return "💻";
}

function updateProgressBar() {
  const progress = (nivelAtual / niveis.length) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;
}

function verificarGameOver() {
  if (pontos <= 0) {
    pontos = 0;
    document.getElementById('game-over').style.display = 'flex';
    document.getElementById('pontos').textContent = `Pontos: ${pontos}`;
    document.getElementById("codigo").disabled = true;
    document.getElementById("verificar-btn").disabled = true;
    document.getElementById("mostrar-dica").disabled = true;
    return true;
  }
  return false;
}

function verificar() {
  const codigo = document.getElementById("codigo").value;
  const nivel = niveis[nivelAtual];
  const textarea = document.getElementById("codigo");
  const feedbackIcon = document.getElementById("feedback-icon");

  const codigoNormalizado = normalizarCodigo(codigo);

  if (nivel.tipo === "debug") {
    // Para desafios de debug
    const respostaNormalizada = normalizarCodigo(nivel.resposta);
    if (codigoNormalizado === respostaNormalizada) {
      respostaCorreta();
    } else {
      respostaIncorreta();
    }
  } else {
    // Para questões normais
    const regexStr = nivel.resposta.toString()
      .replace(/^\//, '')
      .replace(/\/[a-z]*$/, '')
      .replace(/\\s\*/g, '\\s*');
    
    const regex = new RegExp(regexStr, 'i');
    if (regex.test(codigoNormalizado)) {
      respostaCorreta();
    } else {
      respostaIncorreta();
    }
  }

  function respostaCorreta() {
    if (!nivelConcluido) {
      pontos += 7;
      nivelConcluido = true;
      salvarProgresso();
      showConfetti();
    }
    textarea.classList.add("correto");
    textarea.classList.remove("errado");
    feedbackIcon.textContent = "✅";
    feedbackIcon.className = "feedback-icon correto-icon";
    document.getElementById("proximo-nivel").style.display = "inline-block";
  }

  function respostaIncorreta() {
    if (!nivelConcluido) {
      pontos -= 3;
      if (verificarGameOver()) return;
      salvarProgresso();
    }
    textarea.classList.add("errado");
    textarea.classList.remove("correto");
    feedbackIcon.textContent = "❌";
    feedbackIcon.className = "feedback-icon errado-icon";
  }

  atualizarPontos();
  atualizarPreview();
}

function verificarDebug() {
  const codigo = document.getElementById("codigo").value.trim();
  const nivel = niveis[nivelAtual];
  const textarea = document.getElementById("codigo");
  const feedbackIcon = document.getElementById("feedback-icon");
  const codigoNormalizado = codigo.replace(/\s+/g, ' ').trim();
  const respostaNormalizada = nivel.resposta.replace(/\s+/g, ' ').trim();
  // Adicione no início da função verificarDebug()
console.log("Código digitado:", JSON.stringify(codigo));
console.log("Resposta esperada:", JSON.stringify(nivel.resposta));
console.log("São iguais?", codigo === nivel.resposta);

  if (codigoNormalizado === respostaNormalizada) {
    if (!nivelConcluido) {
      pontos += 7;
      nivelConcluido = true;
      salvarProgresso();
      showConfetti();
    }
    textarea.classList.add("correto");
    textarea.classList.remove("errado");
    feedbackIcon.textContent = "✅";
    feedbackIcon.className = "feedback-icon correto-icon";
    document.getElementById("proximo-nivel").style.display = "inline-block";
    document.getElementById("debug-counter").style.display = "none";
  } else {
    if (!nivelConcluido) {
      pontos -= 3;
      if (verificarGameOver()) return;
      salvarProgresso();
    }
    textarea.classList.add("errado");
    textarea.classList.remove("correto");
    feedbackIcon.textContent = "❌";
    feedbackIcon.className = "feedback-icon errado-icon";
    
    // Mostra diferenças entre o código digitado e a resposta
    mostrarDiferencasDebug(codigo, nivel.resposta);
  }
  
  atualizarPontos();
  atualizarPreview();
}

function mostrarDiferencasDebug(codigoUsuario, respostaCorreta) {
  const diff = Diff.diffWords(respostaCorreta, codigoUsuario);
  let mensagem = "Diferenças encontradas:\n";
  
  diff.forEach((part) => {
    if (part.added) {
      mensagem += `[+${part.value}]`;
    } else if (part.removed) {
      mensagem += `[-${part.value}]`;
    }
  });
  
  alert(mensagem);
}

function proximoNivel() {
  nivelAtual++;
  salvarProgresso();
  if (nivelAtual < niveis.length) {
    carregarNivel();
  } else {
    document.getElementById("nivel-titulo").textContent = "Parabéns!";
    document.getElementById("pergunta").textContent = "Você completou todos os níveis.";
    document.getElementById("codigo").style.display = "none";
    document.getElementById("verificar-btn").style.display = "none";
    document.getElementById("mostrar-dica").style.display = "none";
    document.getElementById("proximo-nivel").style.display = "none";
    document.getElementById("dica").style.display = "none";
    document.getElementById("preview").style.display = "none";
    document.getElementById("nivel-titulo").textContent = "Parabéns!";
    document.getElementById("pergunta").textContent = "Você completou todos os níveis.";
    document.getElementById("codigo").style.display = "none";
    document.getElementById("verificar-btn").style.display = "none";
    document.getElementById("mostrar-dica").style.display = "none";
    document.getElementById("proximo-nivel").style.display = "none";
    document.getElementById("dica").style.display = "none";
    document.getElementById("preview").style.display = "none";
  }
}

function voltarDezNiveis() {
  nivelAtual = Math.max(0, nivelAtual - 10);
  pontos = 10;
  document.getElementById('game-over').style.display = 'none';
  document.getElementById("codigo").disabled = false;
  document.getElementById("verificar-btn").disabled = false;
  document.getElementById("mostrar-dica").disabled = false;
  salvarProgresso();
  carregarNivel();
}

function mostrarDica() {
  const nivel = niveis[nivelAtual];
  
  if (nivel.tipo === "debug") {
    mostrarDicaDebug();
  } else {
    const custo = nivelAtual + 1;
    if (pontos >= custo) {
      pontos -= custo;
      if (verificarGameOver()) return;
      document.getElementById("dica").textContent = nivel.dica;
      document.getElementById("dica").style.display = "block";
      atualizarPontos();
      salvarProgresso();
    } else {
      alert("Pontos insuficientes para ver a dica!");
    }
  }
}

function mostrarDicaDebug() {
  const nivel = niveis[nivelAtual];
  const custo = nivelAtual + 1;
  
  if (pontos >= custo) {
    pontos -= custo;
    if (verificarGameOver()) return;
    document.getElementById("debug-hint").textContent = nivel.dica;
    document.getElementById("debug-hint").classList.add("show");
    atualizarPontos();
    salvarProgresso();
  } else {
    alert("Pontos insuficientes para ver a dica!");
  }
}

function atualizarPontos() {
  document.getElementById("pontos").textContent = `Pontos: ${pontos}`;
}

function atualizarPreview() {
  const codigo = document.getElementById("codigo").value;
  const preview = document.getElementById("preview");

  const iframe = document.createElement("iframe");
  iframe.style.width = "100%";
  iframe.style.height = "150px";
  iframe.style.border = "none";

  preview.innerHTML = "";
  preview.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(codigo);
  doc.close();
}

function salvarProgresso() {
  const progressData = {
    nivelAtual,
    pontos,
    data: new Date().toISOString(),
    versao: 1.2
  };
  
  try {
    localStorage.setItem('htmlCssGameProgress', JSON.stringify(progressData));
    sessionStorage.setItem('htmlCssGameProgressBackup', JSON.stringify(progressData));
  } catch (e) {
    console.error("Erro ao salvar progresso:", e);
  }
}

function carregarProgresso() {
  try {
    const savedData = localStorage.getItem('htmlCssGameProgress') || 
                     sessionStorage.getItem('htmlCssGameProgressBackup');
    
    if (savedData) {
      const { nivelAtual: savedNivel, pontos: savedPontos } = JSON.parse(savedData);
      if (typeof savedNivel === 'number') nivelAtual = Math.min(savedNivel, niveis.length - 1);
      if (typeof savedPontos === 'number') pontos = Math.max(savedPontos, 0);
    } else {
      pontos = 10;
    }
  } catch (e) {
    console.error("Erro ao carregar progresso:", e);
    pontos = 10;
  }
}

function reiniciarJogo() {
  if (document.getElementById('game-over').style.display === 'flex' || 
      confirm("Tem certeza que deseja reiniciar o jogo? Todo o progresso será perdido.")) {
    nivelAtual = 0;
    pontos = 10;
    nivelConcluido = false;
    document.getElementById('game-over').style.display = 'none';
    document.getElementById("codigo").disabled = false;
    document.getElementById("verificar-btn").disabled = false;
    document.getElementById("mostrar-dica").disabled = false;
    localStorage.removeItem('htmlCssGameProgress');
    sessionStorage.removeItem('htmlCssGameProgressBackup');
    carregarNivel();
  }
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

function showConfetti() {
  const confetti = document.createElement('div');
  confetti.style.position = 'fixed';
  confetti.style.top = '0';
  confetti.style.left = '0';
  confetti.style.width = '100%';
  confetti.style.height = '100%';
  confetti.style.pointerEvents = 'none';
  confetti.style.zIndex = '1000';
  
  for (let i = 0; i < 50; i++) {
    const dot = document.createElement('div');
    dot.style.position = 'absolute';
    dot.style.width = '10px';
    dot.style.height = '10px';
    dot.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    dot.style.borderRadius = '50%';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
    
    confetti.appendChild(dot);
  }
  
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 2000);
}

window.onload = () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  carregarProgresso();
  
  if (pontos <= 0) {
    verificarGameOver();
  }
  
  carregarNivel();

  document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
  document.getElementById("codigo").addEventListener("input", atualizarPreview);
  document.getElementById("reiniciar-btn").addEventListener("click", reiniciarJogo);
};