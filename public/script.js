    // --- INÍCIO: LÓGICA DO TEMA ESCURO ---
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');

    // Aplica o tema salvo ao carregar a página
    if (currentTheme) {
        document.body.classList.add(currentTheme);
        if (currentTheme === 'dark-mode') {
            themeToggle.checked = true;
        }
    }

    // Listener para o clique no botão
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.remove('light-mode'); 
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode'); 
            localStorage.setItem('theme', 'light-mode');
        }
    })

    const apiUrl = 'http://localhost:8080/api/filmes';
    const listaFilmes = document.getElementById('lista-filmes');
    const form = document.getElementById('form-add-filme');

    // Função para buscar e exibir os filmes
    async function carregarFilmes() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erro ao buscar filmes');
            }
            const filmes = await response.json();

            listaFilmes.innerHTML = ''; 
            filmes.forEach(filme => {
                const item = document.createElement('li');
                item.innerHTML = `
                    <strong>${filme.titulo}</strong>
                    <span>Ano: ${filme.ano}</span> | <span>Gênero: ${filme.genero}</span>
                `;
                listaFilmes.appendChild(item);
            });
        } catch (error) {
            console.error('Falha na requisição GET:', error);
            listaFilmes.innerHTML = '<li>Não foi possível carregar os filmes.</li>';
        }
    }

    // Função para adicionar um novo filme
    async function adicionarFilme(event) {
        event.preventDefault(); 

        const titulo = document.getElementById('titulo').value;
        const ano = document.getElementById('ano').value;
        const genero = document.getElementById('genero').value;

        const novoFilme = {
            titulo: titulo,
            ano: parseInt(ano), 
            genero: genero
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoFilme),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar filme');
            }

            // Limpa o formulário e recarrega a lista
            form.reset();
            carregarFilmes();

        } catch (error) {
            console.error('Falha na requisição POST:', error);
            alert('Não foi possível adicionar o filme.');
        }
    }

    form.addEventListener('submit', adicionarFilme);

    carregarFilmes();
});