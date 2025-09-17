const express = require('express');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json()); 

// "Banco de dados" em memória
let filmes = [
    { id: 1, titulo: "O Poderoso Chefão", ano: 1972, genero: "Crime, Drama" },
    { id: 2, titulo: "Interestelar", ano: 2014, genero: "Aventura, Drama, Sci-Fi" },
    { id: 3, titulo: "A Origem", ano: 2010, genero: "Ação, Aventura, Sci-Fi" }
];

let proximoId = 4;

// --- ROTAS DA API ---

// Rota GET para obter todos os filmes 
app.get('/api/filmes', (req, res) => {
    res.json(filmes);
});

//Feature 2 - Rota POST para adicionar um novo filme
app.post('/api/filmes', (req, res) => {
    
    const novoFilme = req.body;

    if (!novoFilme.titulo || !novoFilme.ano || !novoFilme.genero) {
        return res.status(400).json({ mensagem: "Dados incompletos. Título, ano e gênero são obrigatórios." });
    }

    novoFilme.id = proximoId++;
    filmes.push(novoFilme);

    res.status(201).json(novoFilme);
});


app.listen(port, () => {
    console.log(`Servidor da API rodando em http://localhost:${port}`);
});