const request = require('supertest');
const app = require('./server');

describe('API de Filmes - Testes de Integração', () => {

    // Teste GET
    it('GET /filmes - Deve retornar a lista de filmes', async () => {
        const response = await request(app).get('/filmes');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Teste POST (Sucesso)
    it('POST /filmes - Deve criar um novo filme com sucesso', async () => {
        const novoFilme = { titulo: "Matrix", ano: 1999, genero: "Sci-Fi, Ação" };
        const response = await request(app).post('/filmes').send(novoFilme);
        expect(response.statusCode).toBe(201);
        expect(response.body.titulo).toBe("Matrix");
    });

    // Teste POST (Falha 400) - PARA GARANTIR >90% DE COBERTURA
    it('POST /filmes - Deve retornar 400 se os dados estiverem incompletos', async () => {
        const filmeIncompleto = { titulo: "Filme Sem Ano" };
        const response = await request(app).post('/filmes').send(filmeIncompleto);
        expect(response.statusCode).toBe(400);
    });

    // Teste DELETE (Sucesso 204)
    it('DELETE /filmes/:id - Deve deletar um filme existente e retornar 204', async () => {
        // Adiciona um filme só para ter certeza que ele existe antes de deletar
        const novoFilme = { titulo: "Para Deletar", ano: 2000, genero: "Teste" };
        const postRes = await request(app).post('/filmes').send(novoFilme);
        const idParaDeletar = postRes.body.id;

        const response = await request(app).delete(`/filmes/${idParaDeletar}`);
        expect(response.statusCode).toBe(204);
    });

    // Teste DELETE (Falha 404)
    it('DELETE /filmes/:id - Deve retornar 404 se o filme não existir', async () => {
        const idQueNaoExiste = 999;
        const response = await request(app).delete(`/filmes/${idQueNaoExiste}`);
        expect(response.statusCode).toBe(404);
    });
});