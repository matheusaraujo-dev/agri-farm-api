# ⚙️ Projeto Agri Farm - API Backend

Bem-vindo à API backend do projeto Agri Farm! Esta API foi desenvolvida utilizando **AdonisJS**, um framework Node.js robusto e elegante para a construção de aplicações web.

## Repositório

O código fonte desta API está disponível em:
[https://github.com/matheusaraujo-dev/agri-farm-api](https://github.com/matheusaraujo-dev/agri-farm-api)

## ✨ Tecnologias Principais

*   **AdonisJS (v5 ou superior):** Framework Node.js.
*   **Node.js:** Ambiente de execução JavaScript.
*   **PostgreSQL:** Banco de dados relacional.
*   **Docker & Docker Compose:** Para facilitar a configuração do ambiente de banco de dados.
*   **Yarn / npm:** Gerenciadores de pacotes.

## 📋 Pré-requisitos

Antes de começar, garanta que você tenha o seguinte instalado em sua máquina:

*   **[Node.js](https://nodejs.org/)** (versão 16.x ou superior recomendada, verifique os requisitos do AdonisJS para a versão específica do seu projeto).
*   **[Yarn](https://classic.yarnpkg.com/en/docs/install)** (opcional, se preferir usar Yarn) ou npm (que já vem com o Node.js).
*   **[Docker](https://www.docker.com/products/docker-desktop/)** e **[Docker Compose](https://docs.docker.com/compose/install/)** (altamente recomendado para rodar o banco de dados PostgreSQL de forma isolada e consistente).

## 🚀 Como Configurar e Executar o Projeto Localmente

Siga os passos abaixo para configurar e rodar a API em seu ambiente de desenvolvimento:

1.  **Clone o Repositório:**
    Abra seu terminal e execute o comando:
    ```bash
    git clone https://github.com/matheusaraujo-dev/agri-farm-api
    cd agri-farm-api
    ```

2.  **Instale as Dependências:**
    Você pode usar Yarn ou npm. Escolha um dos comandos abaixo:

    *   Com Yarn:
        ```bash
        yarn install
        ```
    *   Com npm:
        ```bash
        npm install
        ```

3.  **Configuração do Ambiente (`.env`):**
    A API precisa de um arquivo `.env` com as variáveis de ambiente. Você pode copiar o arquivo de exemplo `.env.example` ou criar um novo com o seguinte conteúdo:

    *   Copie o exemplo:
        ```bash
        cp .env.example .env
        ```
    *   Ou crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:
        ```env
        TZ=UTC
        PORT=3333
        HOST=0.0.0.0
        LOG_LEVEL=info
        APP_KEY=5sgluuh96UR_cpMxzw-92-i5Ic7gnyFs # Importante: Para produção, gere uma nova chave com 'node ace generate:key'
        NODE_ENV=development
        DB_CONNECTION=pg # Certifique-se que está 'pg' se for usar PostgreSQL
        DB_HOST=127.0.0.1
        DB_PORT=5432
        DB_USER=postgres
        DB_PASSWORD=123456
        DB_DATABASE=postgres
        ```
    **Observações Importantes sobre o `.env`:**
    *   O `APP_KEY` é crucial para a segurança. O valor fornecido é um exemplo. Para um ambiente de produção, sempre gere uma nova chave com o comando: `node ace generate:key`.
    *   Certifique-se de que os valores de `DB_USER`, `DB_PASSWORD`, e `DB_DATABASE` correspondem à configuração do seu PostgreSQL, especialmente se você **não** estiver usando o Docker Compose fornecido.

4.  **Configuração e Inicialização do Banco de Dados (PostgreSQL com Docker Compose):**
    Este projeto inclui um arquivo `docker-compose.yml` na pasta `docker/` para facilitar a configuração do PostgreSQL.

    *   Navegue até a pasta `docker`:
        ```bash
        cd docker
        ```
    *   Execute o Docker Compose para iniciar o container do PostgreSQL em segundo plano (detached mode):
        ```bash
        docker-compose up -d
        ```
        Este comando irá baixar a imagem do PostgreSQL (se ainda não existir localmente) e iniciar um container com o banco de dados. As credenciais (`postgres`/`123456`) e o nome do banco (`postgres`) no `docker-compose.yml` devem corresponder ao seu arquivo `.env`.

    *   Para parar o container do banco de dados (quando não precisar mais):
        ```bash
        docker-compose down
        ```
    *   **Importante:** Após iniciar o Docker, volte para a raiz do projeto API:
        ```bash
        cd ..
        ```

5.  **Execute as Migrations e Seeds (Obrigatório):**
    Com o banco de dados rodando (seja via Docker ou configurado manualmente), você precisa criar as tabelas e popular o banco com dados iniciais. Execute o seguinte comando na raiz do projeto:
    ```bash
    node ace migration:refresh --seed
    ```
    Este comando irá:
    *   `migration:refresh`: Reverter todas as migrations existentes e depois executar todas as migrations novamente (ideal para um ambiente de desenvolvimento limpo).
    *   `--seed`: Executar os arquivos de seed após as migrations para popular o banco.

6.  **Inicie o Servidor de Desenvolvimento:**
    Após todos os passos anteriores, inicie a API:

    *   Com Yarn:
        ```bash
        yarn dev
        ```
    *   Com npm:
        ```bash
        npm run dev
        ```

7.  **Acesse a API:**
    Por padrão (conforme o `.env` de exemplo), a API estará acessível em `http://localhost:3333`. Você pode verificar o output no terminal para confirmar a porta.

---

E pronto! Sua API backend do Agri Farm está configurada e rodando localmente. 🎉

## 📖 Endpoints da API

Abaixo estão alguns dos principais endpoints disponíveis na API. Para uma lista completa e detalhada, considere explorar os arquivos de rota do projeto ou utilizar uma ferramenta como Postman ou Insomnia.

### Dashboard
*   **`GET /dashboard_data`**
    *   Descrição: Retorna dados consolidados para exibição no dashboard.

### Culturas (Crops)
*   **`GET /crops`**
    *   Descrição: Lista todas as culturas (tipos de plantação) disponíveis.

### Safras (Harvests)
*   **`GET /harvests`**
    *   Descrição: Lista todas as safras registradas.
*   **`POST /harvests`**
    *   Descrição: Cria uma nova safra.
*   **`DELETE /harvests/:id`**
    *   Descrição: Exclui uma safra específica pelo seu ID.

### Produtores (Producers)
*   **`GET /producers`**
    *   Descrição: Lista todos os produtores rurais cadastrados.
*   **`POST /producers`**
    *   Descrição: Cria um novo produtor.
    *   Corpo da Requisição (exemplo): `{ "name": "João Silva", "document": "12345678900" }` (ajuste conforme sua modelagem)
*   **`PUT /producers/:id`**
    *   Descrição: Edita os dados de um produtor existente pelo seu ID.
    *   Corpo da Requisição: Similar ao `POST /producers`, contendo os campos a serem atualizados.

### Fazendas (Farms)
*   **`GET /farms`**
    *   Descrição: Lista todas as fazendas cadastradas.
*   **`POST /farms`**
    *   Descrição: Cria uma nova fazenda.
    *   Descrição: Edita os dados de uma fazenda existente pelo seu ID.
    *   Corpo da Requisição: Similar ao `POST /farms`, contendo os campos a serem atualizados.

**Nota:** Os exemplos de corpo de requisição (`Corpo da Requisição`) são ilustrativos. Consulte a implementação dos seus controllers e validadores para a estrutura exata dos payloads.

## 🤝 Contribuindo

Se desejar contribuir com o projeto, por favor, siga as diretrizes de contribuição (se houver) ou abra uma Issue para discutir suas ideias.
