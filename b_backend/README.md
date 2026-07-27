# HelpDesk Backend

API REST do sistema **HelpDesk**, desenvolvida com Quarkus.

## 📋 Sobre o projeto

O backend é responsável pelo gerenciamento da autenticação, usuários, chamados, comentários e anexos, disponibilizando uma API REST consumida pelo frontend.

---

## 🚀 Tecnologias utilizadas

- Quarkus
- JWT Authentication
- PostgreSQL
- Docker

---

## ✨ Funcionalidades

### Autenticação

- Login via JWT

### Usuários

- Cadastro
- Edição
- Exclusão

### Chamados

- Criação
- Listagem
- Assumir chamados
- Conclusão

### Comentários

- Cadastro
- Listagem

### Anexos

- Upload
- Listagem
- Remoção

---

## 🛠️ Pré-requisitos

- Java
- Maven
- PostgreSQL
- Docker
- OpenSSL

---

## 🗄️ Banco de dados

Crie um banco de dados chamado:

```text
help_desk
```

Configure o arquivo:

```text
src/main/resources/application.properties
```

Informando:

- Usuário
- Senha
- Banco de dados

---

## 🔐 Configuração do JWT

Na pasta:

```text
src/main/resources
```

gere a chave privada:

```bash
openssl genrsa -out private_key.pem 2048
```

Depois gere a chave pública:

```bash
openssl rsa -in private_key.pem -pubout -out public_key.pem
```

A aplicação espera os arquivos:

```text
private_key.pem
public_key.pem
```

Caso utilize outros nomes, altere suas referências no arquivo:

```text
application.properties
```

---

## ▶️ Executando o projeto

Após configurar o banco de dados e gerar as chaves:

```bash
./mvnw quarkus:dev
```

ou

```bash
mvn quarkus:dev
```

A API estará disponível em:

```text
http://localhost:8080
```

---

## 📖 Documentação da API

Após iniciar a aplicação, acesse:

```text
http://localhost:8080/swagger
```