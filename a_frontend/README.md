# HelpDesk Frontend

Aplicação web do sistema **HelpDesk**, desenvolvida em Angular.

## 📋 Sobre o projeto

O frontend é responsável pela interface do sistema, permitindo que os usuários realizem autenticação, gerenciamento de chamados, comentários e anexos por meio da API do backend.

---

## 🚀 Tecnologias utilizadas

- Angular
- SweetAlert2
- ApexCharts

---

## ✨ Funcionalidades

- Login de usuários
- Cadastro de usuários
- Edição de usuários
- Exclusão de usuários
- Criação de chamados
- Visualização de chamados
- Assumir chamados
- Conclusão de chamados
- Adição e visualização de comentários
- Adição, visualização e remoção de anexos
- Dashboard com gráficos

---

## 🛠️ Pré-requisitos

- Node.js
- npm
- Angular CLI

---

## ⚙️ Configuração

Instale as dependências:

```bash
npm install
```

Configure a URL da API no arquivo:

```text
src/environments/environment.ts
```

Exemplo:

```ts
export const environment = {
  apiUrl: 'http://localhost:8080'
};
```

Caso o backend esteja sendo executado em outro endereço, altere a URL da API.

---

## ▶️ Executando o projeto

```bash
ng serve
```

A aplicação ficará disponível em:

```text
http://localhost:4200
```

---

## 📁 Estrutura

```text
src/
├── app/
├── assets/
├── environments/
```