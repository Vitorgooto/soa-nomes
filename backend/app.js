const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Middleware para fazer requisições à API do IBGE
const ibgeApi = axios.create({
    baseURL: 'https://servicodados.ibge.gov.br/api/v2/censos/nomes'
});

// Rota para evolução do nome por década
app.get('/api/nome/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        const response = await ibgeApi.get(`/${nome}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do nome' });
    }
});

// Rota para top 3 nomes por localidade
app.get('/api/top-nomes/:codigo', async (req, res) => {
    try {
        const { codigo } = req.params;
        const response = await ibgeApi.get(`/ranking?localidade=${codigo}&limit=3`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar top nomes' });
    }
});

// Rota para comparar dois nomes
app.get('/api/comparar', async (req, res) => {
    try {
        const { nome1, nome2 } = req.query;
        const [response1, response2] = await Promise.all([
            ibgeApi.get(`/${nome1}`),
            ibgeApi.get(`/${nome2}`)
        ]);
        res.json({
            nome1: response1.data,
            nome2: response2.data
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao comparar nomes' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
}); 