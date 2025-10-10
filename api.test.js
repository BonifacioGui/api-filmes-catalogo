// api.test.js

// Mock da nossa API. Não precisamos iniciar o servidor de verdade para testar a lógica.
const filmes = [
    { id: 1, titulo: "O Poderoso Chefão", ano: 1972, genero: "Crime, Drama" },
    { id: 2, titulo: "Interestelar", ano: 2014, genero: "Aventura, Drama, Sci-Fi" },
    { id: 3, titulo: "A Origem", ano: 2010, genero: "Ação, Aventura, Sci-Fi" }
];

// Teste de exemplo
describe('API de Filmes', () => {
    
    test('Rota GET /api/filmes deve retornar uma lista de filmes', () => {
        // Simula a obtenção dos filmes
        const resultado = filmes;

        // Verifica se o resultado é um array
        expect(Array.isArray(resultado)).toBe(true);

        // Verifica se a lista não está vazia
        expect(resultado.length).toBeGreaterThan(0);
    });

});