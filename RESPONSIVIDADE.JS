// CONTEÚDO PRINCIPAL
const TextElement = document.getElementById('text');
const OptionButtonsElement = document.getElementById('opt-btns');
const ImageElement = document.getElementById('img-cnt');
const PageElement = document.getElementById('page-nm');

function Start() {
  ShowTextNode(1)
}

function ShowTextNode(TextNodeIndex) {

  //TEXTOS
  const TextNode = TextNodes.find(TextNodes => TextNodes.id === TextNodeIndex)
  TextElement.innerText = TextNode.Text

  //IMAGEM
  ImageElement.innerHTML = TextNode.Image

  //PÁGINAS (CONTADOR)
  PageElement.innerText = `${TextNode.id}`

  //TORNAR O NÚMERO DE OPÇÕES ADAPTÁVEL
  while (OptionButtonsElement.firstChild) {
    OptionButtonsElement.removeChild(OptionButtonsElement.firstChild)
  }
  TextNode.Options.forEach(Options => {
    if (ShowOption(Options)) {
      const button = document.createElement('button')
      button.innerText = Options.Text
      button.classList.add('btn')
      button.addEventListener('click', () => SelectOption(Options))
      OptionButtonsElement.appendChild(button)
    }
  })

}
function ShowOption(Options) {
  return Options
}

//REINÍCIO DE PROGRESSO
function SelectOption(Options) {
  const NextTextNodeId = Options.NextText
  if (NextTextNodeId <= 0) {
    localStorage.setItem('progress', '1')
    return Start()
  }

  //PERMITE QUE O USUÁRIO AVANCE PELA HISTÓRIA
  ShowTextNode(NextTextNodeId)
}

//--------------------------------------------------------------------------------------------------------

//CONSTRUÇÃO DA HISTÓRIA, INSERÇÃO DE IMAGENS E ADIÇÃO DAS OPÇÕES
const TextNodes = [
  {
    id: 1,
    Text: "Bem-vindo!",
    Image: '<img src="IMG/Image-1.jpg" alt="" style ="width: 100%; max-height: 100%" />',
    Options: [
      {
        Text: "Começar",
        NextText: 2
      },
      {
        Text: "Instruções",
        NextText: 3
      },
      {
        Text: "Créditos",
        NextText: -1
      },
    ],
  },
]
//--------------------------------------------------------------------------------------------------------

//MENU LATERAL
// FUNÇÃO PARA EXIBIR MENU LATERAL
function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

// FUNÇÃO PARA ESCONDER/FECHAR MENU LATERAL
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
//--------------------------------------------------------------------------------------------------------

//SALVAR, CARREGAR E REINICIAR PROGRESSO

//REINICIAR PROGRESSO
function res() {
  if (confirm('Todo seu progresso sera perdido e o livro será reiniciado, tem certeza?')) {
    closeNav()
    localStorage.setItem('progress', '1')
    return Start()
  } else {
    closeNav()
  }
}

//SALVAR PROGRESSO
function save() {
  closeNav()
  const progress = PageElement.innerHTML;
  localStorage.setItem('progress', progress)
  alert('Progresso salvo!')
}

//CARREGAR PROGRESSO
function load() {
  if (confirm('Isso irá sobrescrever seu progresso não salvo, tem certeza?')) {
    closeNav()
    return ShowTextNode(Number(localStorage.getItem('progress')))
  } else {
    closeNav()
  }
}
//--------------------------------------------------------------------------------------------------------

Start()