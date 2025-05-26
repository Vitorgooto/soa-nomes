# Sistema de Análise de Nomes - IBGE

Este é um sistema orientado a serviços (SOA) que consome a API de nomes do IBGE para análise e comparação de nomes brasileiros.

## Como os elementos de SOA foram aplicados neste projeto

- **Serviços Independentes:** O backend foi dividido em três serviços REST distintos, cada um responsável por uma funcionalidade específica:
  - `/api/nome/:nome`: Serviço para evolução do nome por década.
  - `/api/top-nomes/:codigo`: Serviço para retornar os 3 nomes mais frequentes de uma localidade.
  - `/api/comparar?nome1=...&nome2=...`: Serviço para comparar dois nomes nacionalmente.
- **Baixo acoplamento:** O frontend consome os serviços do backend via HTTP, sem depender de detalhes internos da implementação, apenas das APIs expostas.
- **Reusabilidade:** Os serviços podem ser consumidos por diferentes clientes (web, mobile, etc), bastando realizar requisições HTTP para os endpoints definidos.
- **Interoperabilidade:** A comunicação entre frontend e backend é feita via REST/HTTP e JSON, padrão aberto e amplamente suportado.
- **Descoberta e Composição:** Os serviços podem ser combinados no frontend para criar novas funcionalidades, como a comparação de nomes.
- **Escalabilidade:** Cada serviço pode ser evoluído ou escalado de forma independente, facilitando manutenção e crescimento do sistema.

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
   - Selecione o estado
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