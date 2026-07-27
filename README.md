# HelpDesk

Sistema de gerenciamento de chamados desenvolvido com o objetivo de praticar e consolidar conhecimentos em desenvolvimento Full Stack utilizando Angular, Quarkus e PostgreSQL.

## 📋 Sobre o projeto

O **HelpDesk** é uma aplicação para gerenciamento de chamados, permitindo que usuários realizem autenticação e que tickets sejam criados, assumidos e concluídos de forma organizada.

Este projeto foi desenvolvido como prática de desenvolvimento Full Stack, aplicando conceitos de arquitetura de APIs REST, autenticação com JWT, integração entre frontend e backend e persistência de dados.

---

## 🚀 Tecnologias utilizadas

### Frontend

* Angular
* SweetAlert2
* ApexCharts

### Backend

* Quarkus
* JWT Authentication

### Banco de dados

* PostgreSQL

### Infraestrutura

* Docker (PostgreSQL)

---

## ✨ Funcionalidades

### Autenticação

* Login de usuários
* Autenticação via JWT

### Usuários

* Cadastro de usuários
* Edição de usuários
* Exclusão de usuários

### Chamados

* Criação de chamados
* Visualização de chamados
* Assumir chamados
* Conclusão de chamados

### Comentários

* Adição de comentários em chamados
* Visualização de comentários em chamados

### Anexos

* Adição de anexos em chamados
* Visualização de anexos em chamados
* Remoção de anexos em chamados


---

# 🛠️ Como executar o projeto

## Pré-requisitos

* Node.js
* npm
* Java (compatível com o Quarkus utilizado)
* Angular CLI
* Maven
* Docker
* PostgreSQL

---

## Banco de dados

Execute uma instância do PostgreSQL utilizando Docker (ou outro método de sua preferência).

Após iniciar o banco:

1. Crie um banco de dados chamado:

```text
help_desk
```

2. Configure no arquivo `application.properties` do backend as informações de conexão:

* Usuário
* Senha
* Nome do banco

---

## Configuração do Backend

Antes de iniciar a aplicação é necessário gerar o par de chaves RSA utilizado na autenticação JWT.

Na pasta:

```text
src/main/resources
```

gere a chave privada com o comando:

```bash
openssl genrsa -out private_key.pem 2048
```

Em seguida, gere a chave pública:

```bash
openssl rsa -in private_key.pem -pubout -out public_key.pem
```

Por padrão, a aplicação espera os arquivos:

```text
private_key.pem
public_key.pem
```

Caso utilize nomes diferentes, basta alterar suas referências no arquivo:

```text
application.properties
```

Após gerar as chaves e configurar o acesso ao banco de dados no `application.properties`, execute o backend normalmente utilizando o Quarkus.

---

## Configuração do Frontend

Instale as dependências:

```bash
npm install
```

Em seguida, ajuste o arquivo:

```text
src/environments/environment.ts
```

Caso o backend esteja sendo executado em outro endereço.

Por padrão, a API utiliza:

```text
http://localhost:8080
```

Após a configuração, execute:

```bash
ng serve
```

---

## 📖 Documentação da API

O backend disponibiliza a documentação dos endpoints através do Swagger.

Após iniciar a aplicação, acesse:

```text
http://localhost:8080/swagger
```

---

## 📁 Estrutura geral do projeto

```text
HelpDesk
│
├── frontend/
│
├── backend/
```

---

## 🔐 Autenticação

A aplicação utiliza autenticação baseada em **JWT (JSON Web Token)**.

As chaves pública e privada são utilizadas para assinatura e validação dos tokens gerados pelo backend.

---

## 🎯 Objetivo

O principal objetivo deste projeto foi colocar em prática conceitos como:

* Desenvolvimento Full Stack
* APIs REST
* Angular
* Quarkus
* PostgreSQL
* Docker
* Autenticação com JWT
* Integração entre frontend e backend