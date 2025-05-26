# Sistema de Análise de Nomes - IBGE

Este é um sistema orientado a serviços (SOA) que consome a API de nomes do IBGE para análise e comparação de nomes brasileiros.

## Funcionalidades

1. Evolução do nome por década
2. Top 3 nomes mais frequentes por localidade
3. Comparação entre dois nomes nacionalmente

## Requisitos

- Node.js (versão 14 ou superior)
- NPM (gerenciador de pacotes do Node.js)

## Instalação

1. Clone o repositório
2. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

## Uso

1. Abra o arquivo `frontend/index.html` em seu navegador
2. Para ver a evolução de um nome:
   - Digite o nome no campo correspondente
   - Clique em "Buscar"
3. Para ver os top nomes de uma localidade:
   - Digite o código IBGE da localidade
   - Clique em "Buscar"
4. Para comparar dois nomes:
   - Digite os dois nomes nos campos correspondentes
   - Clique em "Comparar"

## Estrutura do Projeto

```
.
├── backend/
│   ├── app.js
│   └── package.json
└── frontend/
    ├── index.html
    ├── styles.css
    └── scripts/
        ├── graficoNome.js
        ├── tabelaLocalidade.js
        └── comparacaoGrafico.js
```

## Tecnologias Utilizadas

- Backend: Node.js, Express
- Frontend: HTML, CSS, JavaScript
- Gráficos: Chart.js
- Requisições HTTP: Axios 