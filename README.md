# Projeto Cookmaster API

Projeto desenvolvido durante aprendizado na Trybe que envolve a criação de uma API para gerenciamento de receitas.

## Desenvolvimento

Esta aplicação foi desenvolvida através do padrão REST, utilizando arquitetura MSC (model, service e controller), para gerenciamento de receitas através de operações CRUD (criação, leitura, atualização e exclusão) em um banco de dados MongoDB. Para qualquer uma dessas operações, será necessário uma autenticação. Os usuários podem ser clientes ou administradores. Pessoas clientes apenas poderão disparar ações nas receitas que ele mesmo criou. Já uma pessoa administradora pode disparar qualquer ação em qualquer receita.

### Tecnologias

- Node.js
- Express.js
- Json Web Token (autenticação e validação de usuários)
- Multer (upload de arquivos para o servidor)

## Rodando a Aplicação

1. Clone o repositório

- `https://github.com/lucasmvnascimento/cookmaster-api.git`.
- Entre na pasta do repositório que você acabou de clonar:
  - `cd cookmaster-api`

2. Instale as dependências

- `npm install`

3. Iniciar servidor

- `npm start`
- A aplicação será iniciada na porta 3000.

OBS - Necessário MongoDB instalado para gerenciamento do banco. Configurações de conexão podem ser alteradas no arquivo `/src/api/models/connection.js`.

## Endpoints Disponíveis

- /users
  - Método POST (cadastro de usuário)
    - Formato da requisição
    ```json
      {
        "name": "string",
        "email": "string",
        "password": "string"
      }
     ```
     
     
- /login
  - Método POST (autenticação de usuário)
    - Formato da requisição
    ```json
      {
        "email": "string",
        "password": "string"
      }
     ```
     
- /recipes 
  - Método POST (cadastro de receita)
    - Formato da requisição
    ```json
      {
        "name": "string",
        "ingredients": "string",
        "preparation": "string"
      }
     ```
  - Método GET (listagem de todas as receitas)

- /recipes:id 
  - Método GET (acessar receita específica)
  - Método PUT (edição de receita)
    - Formato da requisição
    ```json
      {
        "name": "string",
        "ingredients": "string",
        "preparation": "string"
      }
     ```
  - Método DELETE (remover receita)

- /recipes/:id/image
  - Método PUT (adiciona imagem à receita)
    - Formato da requisição
      `multipart/form-data`
  - Acesso às imagens
    `/images/<id-da-receita>.jpeg`
      
