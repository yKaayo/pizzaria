# Projeto Pizzaria

## Visão Geral

Pizzaria é uma aplicação web full-stack desenvolvida para proporcionar uma experiência fluida de pedido de pizza online. O projeto consiste em um frontend moderno baseado em React e um backend robusto em Node.js, utilizando TypeScript e Prisma ORM para gerenciamento do banco de dados. Esta aplicação demonstra as melhores práticas em desenvolvimento web, incluindo design de API RESTful, autenticação e gerenciamento de estado.

## Tecnologias Utilizadas

### Frontend
- React com TypeScript
- Vite como ferramenta de build
- CSS para estilização
- React Router para roteamento no cliente
- Gerenciamento de estado com Redux Toolkit

### Backend
- Node.js com TypeScript
- Express.js para API REST
- Prisma ORM para modelagem e migrações do banco de dados
- Autenticação baseada em JWT
- Middlewares para autorização e controle de acesso de administradores
- PostgreSQL como banco de dados

## Começando

### Pré-requisitos
- Node.js (recomendado v16 ou superior)
- Gerenciador de pacotes npm ou yarn
- Instância de banco de dados PostgreSQL

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/yKaayo/pizzaria.git
   cd pizzaria
   ```

2. Instale as dependências tanto do cliente quanto do servidor:
   ```bash
   cd client
   pnpm install
   cd ../server
   pnpm install
   ```

3. Configure as variáveis de ambiente:

   Crie arquivos `.env` nos diretórios `client` e `server` conforme necessário. Variáveis típicas incluem:

   - `DATABASE_URL` para a string de conexão do banco de dados Prisma
   - `JWT_SECRET` para tokens de autenticação
   - Outras chaves de API ou variáveis de configuração

4. Execute as migrações do Prisma para configurar o esquema do banco:

   ```bash
   npx prisma migrate deploy
   ```

### Executando a Aplicação
- Para iniciar o servidor backend:
  ```bash
  pnpm dev
  ```

- Para iniciar o servidor de desenvolvimento do frontend:
  ```bash
  cd ../client
  pnpm dev
  ```

O frontend estará disponível tipicamente em `http://localhost:5173` e a API backend em `http://localhost:3000` (ou conforme configurado).

## Estrutura do Projeto

```
pizzaria/
├── client/                 # Código fonte do frontend React
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── server/                 # Código fonte do backend Node.js
│   ├── src/
│   │   ├── controllers/    # Controladores das rotas da API
│   │   ├── models/         # Modelos do banco de dados
│   │   ├── routes/         # Definições das rotas Express
│   │   ├── middlewares/    # Autenticação e autorização
│   │   ├── services/       # Lógica de negócio e utilitários
│   │   └── prisma/         # Esquema e migrações do Prisma
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

## Testes

- Os testes do backend podem ser executados com:

  ```bash
  cd ../server
  pnpm test
  ```

- Testes do frontend (se houver) podem ser executados de forma similar no diretório do cliente.

## Contribuindo

Contribuições são bem-vindas! Por favor, faça um fork do repositório e crie um pull request com suas alterações. Certifique-se de seguir o estilo de código existente e incluir testes quando aplicável.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Obrigado por conferir o projeto Pizzaria! Se tiver dúvidas ou problemas, por favor abra uma issue no GitHub.
