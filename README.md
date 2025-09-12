# API de Filmes

Uma API REST simples para gerenciar uma lista de filmes.

## Como Executar

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Inicie o servidor:**
    ```bash
    node server.js
    ```

3.  A API estará disponível em `http://localhost:8080`.

## Endpoints da API

### Obter todos os filmes

* **Método:** `GET`
* **Rota:** `/api/filmes`
* **Resposta de Sucesso (200):**
    ```json
    [
        { "id": 1, "titulo": "O Poderoso Chefão", "ano": 1972, "genero": "Crime, Drama" },
        { "id": 2, "titulo": "Interestelar", "ano": 2014, "genero": "Aventura, Drama, Sci-Fi" }
    ]
    ```

### Adicionar um novo filme

* **Método:** `POST`
* **Rota:** `/api/filmes`
* **Corpo da Requisição (JSON):**
    ```json
    {
        "titulo": "Cidade de Deus",
        "ano": 2002,
        "genero": "Crime, Drama"
    }
    ```
* **Resposta de Sucesso (201):**
    ```json
    {
        "id": 4,
        "titulo": "Cidade de Deus",
        "ano": 2002,
        "genero": "Crime, Drama"
    }
    ```

---

## Workflow de Desenvolvimento (Git)

Para este projeto, foi utilizado o **Feature Branch Workflow**.

### Por que essa escolha?

1.  **Isolamento:** Cada nova feature (como a rota `POST`) é desenvolvida em sua própria branch. Isso significa que a branch `main` permanece sempre estável e funcional. Se algo der errado no desenvolvimento da nova feature, isso não quebra o código principal.

2.  **Colaboração Clara:** Em equipes, esse workflow facilita a colaboração. Vários desenvolvedores podem trabalhar em features diferentes simultaneamente, cada um em sua branch, sem interferir no trabalho do outro.

3.  **Code Review Facilitado:** Antes de incorporar uma feature na `main`, é possível criar um *Pull Request* (ou *Merge Request*). Isso abre um espaço para que outros membros da equipe revisem o código, sugiram melhorias e garantam a qualidade antes que a mudança seja oficializada.

4.  **Histórico Organizado:** O histórico de commits na branch `main` se torna uma linha do tempo de features integradas, tornando mais fácil entender a evolução do projeto e rastrear quando cada funcionalidade foi adicionada.