# wannabet

### WannaBet é uma API desenvolvida para um desafio técnico de back-end

Para rodar o projeto clone este repositório

Você vai precisar ter o Postgres instalado ou rodando na máquina

Instale todas as dependências
``` bash
npm install
```

Configure o arquivo .env conforme o .env.example, com DATABASE_URL direcionando para o Postgres da sua máquina

```bash
npm run migration:run

```

Depois para rodar em modo de desenvolvimento 
```bash
npm run dev
```
Segue abaixo o link do deploy:

https://wannabet-h81t.onrender.com/


##Para rodar utilizando o Docker siga os seguintes passos:

Você precisa ter o docker instalado em sua máquina

Primeiramente criaremos uma network para conectar o container da aplicação com o container do banco de dados

```bash
docker network create demo
```

Agora rodaremos o container do postgres dentro desta network:
(Obs: o comando "-d" é utilizado para rodar o container sem precisar ficar preso ao terminal)
```bash
docker run -d -p 5433:5432 --name postgres --network demo -e POSTGRES_PASSWORD=postgres postgres
```

Esse comando acima irá baixar a imagem do postgres e rodá-la em sua máquina dentro da network que utilizaremos

Depois você precisa configurar seu .env com a DATABASE_URL trocando o "localhost" pelo nome do container que criamos acima, no caso "postgres"

Agora você poderá rodar o container da aplicação dentro da network para ela se comunicar com o banco:

```bash
docker run -p 4000:4000 --name wannabet --network demo yurilopesm/wannabet
```

Você pode configurar o comando "-d" para não ficar preso ao terminal também, se vir a mensagem "Server is listening on port 4000." o comando funcionou perfeitamente

Link para imagem docker:

https://hub.docker.com/repository/docker/yurilopesm/wannabet/general
