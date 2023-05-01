# Aplicação Rogalabs Node.js Case
Esta aplicação é uma implementação do case da RogaLabs. A aplicação está hospedada no seguinte link: https://rogalabsnodejscase.herokuapp.com/api-docs/

# Como rodar localmente
Para rodar a aplicação localmente, basta seguir os seguintes passos:


Clone o repositório para sua máquina local usando o seguinte comando:

```
git clone https://github.com/<seu-usuario>/rogalabs-nodejs-case.git
```

Navegue até o diretório do projeto usando o seguinte comando:

```
cd rogalabs-nodejs-case
```

Instale as dependências do projeto usando o seguinte comando:

```
npm install
```
Crie um arquivo .env na raiz do projeto e configure-o com as seguintes variáveis de ambiente:

```
PG_HOST=
AUTH_TOKEN=
```

Inicie o servidor local usando o seguinte comando:

```
npm start
```
Acesse a aplicação em http://localhost:3000/api-docs.

# Como rodar os testes unitários
Para rodar os testes unitários, basta usar o seguinte comando:

```
npm test
```


#Referência
Esta aplicação é baseada em um case para entrevista de trabalho na Rogalabs. O link para o case original pode ser encontrado em: https://github.com/RogaLabs/teste-backend-nodejs-pleno
