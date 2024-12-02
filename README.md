# tasks-nest

Uma API RESTful de lista de tarefas construída com NestJS.  Permite a criação, edição, atualização, exclusão e busca de tarefas, com autenticação via JWT.

## Descrição

Este projeto é uma API de lista de tarefas que permite a criação, edição, atualização, exclusão e busca de tarefas. A autenticação de usuários é feita via JWT.

## Tecnologias Utilizadas

* TypeScript
* NestJS
* TypeORM
* PostgreSQL

## Passos para Instalação

1. Clone o repositório: `git clone <repositório_git>`
2. Navegue até o diretório do projeto: `cd tasks-nest`
3. Instale as dependências: `npm install`
4. Crie um arquivo `.env` baseado em `.env.example`, configurando as variáveis de ambiente.


## Como Usar

1. **Opção com Docker:**  Se você tiver o Docker instalado, execute `docker compose up -d` para iniciar o banco de dados PostgreSQL.
2. Execute `npm run start`.
3. A API estará disponível em `http://localhost:3000`.

## Funcionalidades Principais

**Autenticação:**

* Criar usuário
* Fazer login de usuário

**Gerenciamento de Tarefas:** (Todos os endpoints abaixo requerem um token JWT válido)

* Criar tarefa
* Editar tarefa
* Atualizar tarefa
* Excluir tarefa
* Ver todas as tarefas
* Buscar uma tarefa por ID


## Licença

MIT

## Contato

[Meu LinkedIn](https://www.linkedin.com/in/felipems1/)

## Configurações Necessárias

Crie um arquivo `.env` baseado no arquivo `.env.example` fornecido.  Este arquivo conterá as configurações de conexão com o banco de dados e outras variáveis de ambiente.
