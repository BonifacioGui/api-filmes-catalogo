// server.js

const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

let filmes = [
    { id: 1, titulo: "O Poderoso Chefão", ano: 1972, genero: "Crime, Drama" },
    { id: 2, titulo: "Interestelar", ano: 2014, genero: "Aventura, Drama, Sci-Fi" },
    { id: 3, titulo: "A Origem", ano: 2010, genero: "Ação, Aventura, Sci-Fi" }
];
let proximoId = 4;

// --- ROTAS DA API ---

// 1. Rota GET (Ajustada para /filmes, sem /api)
app.get('/filmes', (req, res) => {
    res.json(filmes);
});

// 2. Rota POST (Ajustada para /filmes, como no exercício) [cite: 207]
app.post('/filmes', (req, res) => {
    const novoFilme = req.body;
    if (!novoFilme.titulo || !novoFilme.ano || !novoFilme.genero) {
        return res.status(400).json({ mensagem: "Dados incompletos." });
    }
    novoFilme.id = proximoId++;
    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});

// 3. NOVA Rota DELETE (Conforme exercício) [cite: 208]
app.delete('/filmes/:id', (req, res) => {
    // Pega o ID da URL e converte para número
    const idParaDeletar = parseInt(req.params.id);

    // Encontra o índice do filme no array
    const indexDoFilme = filmes.findIndex(f => f.id === idParaDeletar);

    // Caso o filme não exista, retorna 404 
    if (indexDoFilme === -1) {
        return res.status(404).send();
    }

    // Caso o filme exista, remove-o 
    filmes.splice(indexDoFilme, 1);

    // Retorna 204 (No Content) 
    res.status(204).send();
});

// Exporta o 'app' para que nossos testes possam usá-lo
module.exports = app;

// Inicia o servidor apenas se o arquivo for executado diretamente
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor da API rodando em http://localhost:${port}`);
    });
}