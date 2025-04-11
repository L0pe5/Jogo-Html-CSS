let nivelAtual = parseInt(localStorage.getItem('nivelAtual')) || 0;
let pontos = parseInt(localStorage.getItem('pontos'));
if (isNaN(pontos)) pontos = 10;
let nivelConcluido = false;

const niveis = [
    {
      titulo: "Nível 1",
      pergunta: "Use uma tag de título apropriada para mostrar a frase 'Olá Mundo' com destaque.",
      resposta: /<h1>Olá Mundo<\/h1>/i,
      dica: "Títulos são representados por tags específicas para destacar diferentes níveis de importância."
    },
    {
      titulo: "Nível 2",
      pergunta: "Crie uma divisão de conteúdo (div) com uma classe identificadora chamada 'container'.",
      resposta: /<div class=["']container["']><\/div>/i,
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
    
  function carregarNivel() {
    const nivel = niveis[nivelAtual];
    document.getElementById("nivel-titulo").textContent = nivel.titulo;
    document.getElementById("pergunta").textContent = nivel.pergunta;
    document.getElementById("codigo").value = "";
    document.getElementById("dica").style.display = "none";
    document.getElementById("proximo-nivel").style.display = "none";
    document.getElementById("codigo").classList.remove("correto", "errado");
    document.getElementById("feedback-icon").textContent = "";
    nivelConcluido = false;
    atualizarPontos();
    atualizarPreview();
  }
  
  // Verificar se ta certo
  function verificar() {
    const codigo = document.getElementById("codigo").value.trim();
    const nivel = niveis[nivelAtual];
    const textarea = document.getElementById("codigo");
    const feedbackIcon = document.getElementById("feedback-icon");
  
    if (nivel.resposta.test(codigo)) {
      if (!nivelConcluido) {
        pontos += 7;
        nivelConcluido = true;
        salvarProgresso();
      }
      document.getElementById("proximo-nivel").style.display = "inline-block";
      textarea.classList.add("correto");
      textarea.classList.remove("errado");
      feedbackIcon.textContent = "✅";
      feedbackIcon.className = "feedback-icon correto-icon";
    } else {
      if (!nivelConcluido) {
        pontos -= 3;
        if (pontos < 0) pontos = 0;
      }
      textarea.classList.add("errado");
      textarea.classList.remove("correto");
      feedbackIcon.textContent = "❌";
      feedbackIcon.className = "feedback-icon errado-icon";
    }
  
    atualizarPontos();
    atualizarPreview();
  }
  
  // sobe de nivel
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
    }
  }
  
  // dica
  function mostrarDica() {
    const nivel = niveis[nivelAtual];
    const custo = nivelAtual + 1;
    if (pontos >= custo) {
      pontos -= custo;
      document.getElementById("dica").textContent = nivel.dica;
      document.getElementById("dica").style.display = "block";
      atualizarPontos();
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
  
  // Salvar
  function salvarProgresso() {
    localStorage.setItem('nivelAtual', nivelAtual);
    localStorage.setItem('pontos', pontos);
  }
  
  function carregarProgresso() {
    const salvoNivel = parseInt(localStorage.getItem('nivelAtual'));
    const salvoPontos = parseInt(localStorage.getItem('pontos'));
    if (!isNaN(salvoNivel)) nivelAtual = salvoNivel;
    if (!isNaN(salvoPontos)) pontos = salvoPontos;
  }
  
  function reiniciarJogo() {
    if (confirm("Tem certeza que deseja reiniciar o jogo? Todo o progresso será perdido.")) {
      nivelAtual = 0;
      pontos = 10;
      nivelConcluido = false;
      localStorage.removeItem('nivelAtual');
      localStorage.removeItem('pontos');
      carregarNivel();
    }
  }
  
  window.onload = () => {
    carregarProgresso();
    carregarNivel();
    document.getElementById("codigo").addEventListener("input", atualizarPreview);
    document.getElementById("reiniciar-jogo").addEventListener("click", reiniciarJogo);
  };