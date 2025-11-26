# Sistema de Gerenciamento de Tarefas (Full Stack)

Projeto desenvolvido para demonstrar competências em desenvolvimento Full Stack, utilizando arquitetura moderna com Node.js, React e Docker.

![Status](https://img.shields.io/badge/Status-Concluído-green)

## 🚀 Tecnologias Utilizadas

- **Frontend:** React.js, TypeScript, Tailwind CSS, Vite.
- **Backend:** Node.js, Express, TypeScript, Prisma ORM, JWT (Autenticação).
- **Banco de Dados:** PostgreSQL (via Docker).
- **DevOps:** Docker Compose.

## ⚙️ Funcionalidades

- [x] Cadastro e Autenticação de Usuários (JWT).
- [x] Dashboard Protegido (Rotas Privadas).
- [x] CRUD de Tarefas (Criar, Listar, Atualizar, Deletar).
- [x] Interface Responsiva e Clean.

## 📦 Como Rodar o Projeto

### Pré-requisitos

- Node.js e NPM instalados.
- Docker e Docker Compose instalados.

### Passo 1: Clone o repositório

```bash
git clone [https://github.com/fap233/task-manager.git](https://github.com/fap233/task-manager.git)
cd task-manager
```

### Passo 2: Subir o Banco de Dados

```Bash

docker compose up -d
```

### Passo 3: Configurar e Rodar o Backend

```Bash

cd server
npm install

# Crie um arquivo .env baseado no exemplo ou configure as variáveis

npx prisma migrate dev --name init
npm run dev
```

### Passo 4: Rodar o Frontend

Em um novo terminal:

```Bash

cd web
npm install
npm run dev

Acesse http://localhost:5173 no seu navegador.
```

Desenvolvido por Fellipe Pavin
