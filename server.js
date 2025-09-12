// server.js (código completo atualizado)

const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json()); // Essencial para a rota POST entender JSON

// "Banco de dados" em memória
let filmes = [
    { id: 1, titulo: "O Poderoso Chefão", ano: 1972, genero: "Crime, Drama" },
    { id: 2, titulo: "Interestelar", ano: 2014, genero: "Aventura, Drama, Sci-Fi" },
    { id: 3, titulo: "A Origem", ano: 2010, genero: "Ação, Aventura, Sci-Fi" }
];

// NOVO: Variável para controlar o próximo ID a ser gerado
let proximoId = 4;

// --- ROTAS DA API ---

// Rota GET para obter todos os filmes (já existente)
app.get('/api/filmes', (req, res) => {
    res.json(filmes);
});

// NOVO: Feature 2 - Rota POST para adicionar um novo filme
app.post('/api/filmes', (req, res) => {
    // 1. Pega os dados enviados no corpo da requisição
    const novoFilme = req.body;

    // 2. Validação simples para garantir que os dados necessários foram enviados
    if (!novoFilme.titulo || !novoFilme.ano || !novoFilme.genero) {
        return res.status(400).json({ mensagem: "Dados incompletos. Título, ano e gênero são obrigatórios." });
    }

    // 3. Adiciona um ID único ao novo filme e o adiciona ao array
    novoFilme.id = proximoId++;
    filmes.push(novoFilme);

    // 4. Retorna o filme que foi criado com o status 201 (Created)
    res.status(201).json(novoFilme);
});


app.listen(port, () => {
    console.log(`Servidor da API rodando em http://localhost:${port}`);
});