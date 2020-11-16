# softlib-api TEST
- Esse projeto consiste no processo seletivo da softdesign

# Pré-requisitos
-  contas no pipedrive, bling e mongoDB Atlas
-  npm 6.12.x
-  node 12.3.x

# Instalação
Instalar node e npm
# Como rodar
docker-compose up --build

# Testes

npm test (só alguns cases, e ainda está itermitente)
# Endpoints

POST /api/pipedrive/dealsOnBling: Seleciona oportudinades com status won e insere como pedido na bling, e salva no banco com valor total e data

GET /api/pipedrive/dealsOnBling: Retorna oportunidades que foram salvas no banco
