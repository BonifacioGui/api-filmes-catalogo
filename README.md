# API de Filmes

Uma API REST simples para gerenciar uma lista de filmes, desenvolvida para a disciplina de Gestão de Configuração.

Este projeto inclui uma API Node.js/Express, um frontend de consumo e um pipeline de CI/CD completo com GitHub Actions focado em qualidade de código.

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
* **Rota:** `/filmes`
* **Resposta de Sucesso (200):**
    ```json
    [
        { "id": 1, "titulo": "O Poderoso Chefão", "ano": 1972, "genero": "Crime, Drama" }
    ]
    ```

### Adicionar um novo filme

* **Método:** `POST`
* **Rota:** `/filmes`
* **Corpo da Requisição (JSON):**
    ```json
    {
        "titulo": "Cidade de Deus",
        "ano": 2002,
        "genero": "Crime, Drama"
    }
    ```
* **Resposta de Sucesso (201):** Retorna o objeto do filme criado.
* **Resposta de Erro (400):** Retorna se `titulo`, `ano` ou `genero` não forem fornecidos.

### Remover um filme

* **Método:** `DELETE`
* **Rota:** `/filmes/<id>`
* **Exemplo de Rota:** `/filmes/2`
* **Resposta de Sucesso (204):** O filme foi removido com sucesso (sem conteúdo de resposta).
* **Resposta de Erro (404):** O filme com o `id` especificado não foi encontrado.

---

## Workflow de Gestão de Configuração e Qualidade

Este projeto segue um fluxo de trabalho profissional focado em garantir a qualidade e a integridade do código.

### 1. Feature Branch Workflow

Todo o desenvolvimento é feito em *branches* separadas (ex: `feature/atividade-qualidade`). A branch `main` é protegida e não pode receber commits diretos.

### 2. Commits Semânticos e Assinados

* [cite_start]**Commits Semânticos:** Todos os commits seguem a especificação [Conventional Commits](https://www.conventionalcommits.org/) (ex: `feat:`, `fix:`, `test:`, `ci:`, `docs:`), conforme apresentado nos slides [cite: 64, 116-128].
* [cite_start]**Commits Assinados:** Todos os commits feitos na branch principal são assinados com uma chave GPG para garantir a autoria e a segurança do código [cite: 163-169].

### 3. Integração Contínua (GitHub Actions)

Antes de qualquer Pull Request ser mesclado na `main`, ele é **obrigado** a passar por duas verificações automáticas de qualidade:

* [cite_start]**`lint` (Análise Estática):** Este job executa o **ESLint** para garantir que todo o código segue os padrões de estilo e para encontrar "bad smells" ou possíveis bugs, conforme os conceitos de Análise Estática de Código[cite: 53, 63, 194].
* [cite_start]**`test` (Testes e Cobertura):** Este job executa todos os testes de unidade e integração (`npm test`) e verifica a **cobertura de testes**[cite: 214].

### 4. Proteção da Branch Principal

A branch `main` é protegida com as seguintes regras:
* É obrigatório o uso de Pull Requests.
* É obrigatório que os checks de status **`lint`** e **`test`** passem com sucesso.
* A cobertura de testes deve se manter acima de **90%**.