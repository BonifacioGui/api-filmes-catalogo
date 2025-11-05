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

// Rota GET 
app.get('/filmes', (_req, res) => {
    res.json(filmes);
});

// Rota POST
app.post('/filmes', (req, res) => {
    const novoFilme = req.body;
    if (!novoFilme.titulo || !novoFilme.ano || !novoFilme.genero) {
        return res.status(400).json({ mensagem: "Dados incompletos." });
    }
    novoFilme.id = proximoId++;
    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});

// Rota DELETE
app.delete('/filmes/:id', (req, res) => {
    const idParaDeletar = parseInt(req.params.id);
    const indexDoFilme = filmes.findIndex(f => f.id === idParaDeletar);

    if (indexDoFilme === -1) {
        return res.status(404).send();
    }

    filmes.splice(indexDoFilme, 1);
    res.status(204).send();
});

// Exporta o app para testes
module.exports = app;

// Inicia o servidor apenas se não estiver em modo de teste
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Servidor da API rodando em http://localhost:${port}`);
    });
}