// api.test.js
const request = require('supertest');
const app = require('./server'); // Importa o app do server.js

// Descreve o conjunto de testes para a API de Filmes
describe('API de Filmes - Testes de Integração', () => {

    // Teste para a rota GET 
    it('GET /filmes - Deve retornar a lista de filmes', async () => {
        const response = await request(app).get('/filmes');
        
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // Teste para a rota POST 
    it('POST /filmes - Deve criar um novo filme com sucesso', async () => {
        const novoFilme = {
            titulo: "Matrix",
            ano: 1999,
            genero: "Sci-Fi, Ação"
        };
        
        const response = await request(app).post('/filmes').send(novoFilme);

        expect(response.statusCode).toBe(201);
        expect(response.body.titulo).toBe("Matrix");
        expect(response.body.id).toBeDefined();
    });

    // Teste para a rota DELETE com sucesso 
    it('DELETE /filmes/:id - Deve deletar um filme existente e retornar 204', async () => {
        const idParaDeletar = 1; // Deleta "O Poderoso Chefão"
        
        const response = await request(app).delete(`/filmes/${idParaDeletar}`);
        
        expect(response.statusCode).toBe(204); // 
    });

    // Teste para a rota DELETE com falha (filme não existe) 
    it('DELETE /filmes/:id - Deve retornar 404 se o filme não existir', async () => {
        const idQueNaoExiste = 999;
        
        const response = await request(app).delete(`/filmes/${idQueNaoExiste}`);
        
        expect(response.statusCode).toBe(404); // 
    });

});