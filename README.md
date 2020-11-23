# softlib-api TEST
- Esse projeto consiste no processo seletivo da softdesign

# Pré-requisitos
-  npm 6.12.x
-  node 12.3.x

# Instalação
Instalar node e npm
# Como rodar
criar um arquivo .env e preencher como mostrado em env.example
docker-compose up --build

# Testes

npm test (só alguns cases, e ainda está itermitente)

# Endpoints

em todas as requisições, menos login, e criação de usuário é necessário passar o token no header: (auth: "token"), que é retornado no login
## usuário: 


POST /api/usuario/inserir => request: {name: string, username: string, password: string}, response: {name}
POST /api/usuario/login => request: {username: string, password: string}, response: { auth: true, token, userId }
GET /api/usuario/livros => request:  {username: string }, response: {book - (objeto livro)}

## livro: 


POST /api/livro/inserir => 
request: {
    title: string;
    isbn: string;
    author: string;
    quantity: number;
    synopsis: string;
}, 
response: {title}

GET /api/livro =>
request: {},
response: {book[]}

GET /api/livro/filtrar =>
request: {
    title: string | null;
    isbn: string | null;
    author: string | null;
}, response: {book[]}

PUT /api/livro/ =>
request: {
    title: string;
    isbn: string;
    author: string;
    quantity: number;
    synopsis: string;
}, response: {status: "livro atualizado com sucesso!" }

DELETE /api/livro/ => 
request: {
    title: string;
    isbn: string;
    author: string;
    quantity: number;
    synopsis: string;
}, response: {status: "livro deletado com sucesso!" }

## aluguel


POST /api/aluguel/ =>
request:  {
    userId: string,
    isbn: string
}, response: {title: string}

POST /api/aluguel/devolucao => 
request:  {
    userId: string,
    isbn: string
}, response: {title: string}