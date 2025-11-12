# ⚡ Porter Dash — Painel Administrativo de Usuários e Favoritos

> Projeto desenvolvido como parte de um **Desafio Técnico de Frontend Sênior**, utilizando **React (Next.js 15)**, **Material UI**, **React Query** e **TypeScript**.

> O Projeto pode ser acessado tanto como **React** como **Next**, ambos estão documentados de como serem reproduzidos, todos os diferenciais técnicos se encontram no projeto **React**.

---

## 🧱 Sumário
- [Descrição](#descrição)
- [Arquitetura e Decisões Técnicas](#arquitetura-e-decisões-técnicas)
- [Autor](#autor)

---

## 🧩 Descrição

O **Porter Dash** é uma aplicação web que lista e gerencia usuários favoritos consumindo dados da **Random User API**.

Funcionalidades principais:
- Listagem paginada na tela de usuários;
- Exibição de dados principais: **foto**, **nome**, **e-mail** e **nacionalidade**;
- Tela de **detalhamento do usuário** com informações adicionais (telefone, gênero, país, idade);
- **Favoritar / desfavoritar** usuários com persistência local (`localStorage`);
- **Tela exclusiva** de usuários favoritos com scroll infinito;
- **Filtros por nome** e **por favoritos**;
- **Feedback visual** (loading, mensagens e ícones);
- **Internacionalização** (português e inglês via `next-intl`).

---

## 🧠 Arquitetura e Decisões Técnicas

### 🧩 Framework e Estrutura
- Utilizado **Next.js (App Router)** pela estrutura moderna, otimização e suporte nativo a Server/Client Components.
- Separação entre **Server Components** (metadados, SSR) e **Client Components** (componentes interativos com hooks).

### ⚙️ State Management
- Utilizado **React Query (`@tanstack/react-query`)** para gerenciamento de cache e estado assíncrono.
  - Justificativa: facilita o controle de *loading*, *error*, *refetch* e *caching* de requisições.
- Estados locais simples (como busca e favoritos) são tratados via **hooks customizados** com `useState` e `useLocalStorage`.

### 🧱 UI e Design System
- Baseado em **Material UI v7**, com customização leve via tema e `sx` props.
- CSS-in-JS nativo do MUI (`@emotion/styled`).

### 🌍 Internacionalização (i18n)
- Implementada com **next-intl**.
- Estrutura de mensagens em `messages/en.json` e `messages/pt.json`.

### 🌍 Escolha da API
- A API utilizadada foi a **randomuser** devido a sua grande quantidade de dados e disponibilidade, podendo fazer requisição até de 1000 usuários, nela podemos obtermos diversas informações do usuário e realizar vários filtros para sua utilização.
- Toda a estrutura de tipagem dela pode ser conferida em `src/api/users/users.types.ts` .

### 🧭 Organização
- **Atomic Design** adaptado:
  - **Atoms:** botões, cards, inputs, skeletons.
  - **Molecules:** menus.
  - **Organisms:** tabelas completas, layouts, header, sidebar.
  - **Features:** páginas e funcionalidades especificas para cada página (Users, Favorites, etc).
  - **Template:** estrutura geral (sidebar + header).
- Requisições encapsuladas em `src/api/`.

---

## ⚙️ Setup do Projeto

### Pré-requisitos
- Node.js >= 20
- npm >= 9

### Instalação e Acesso Next

```bash
# Clonar o repositório
git clone https://github.com/RenatoAlbuquerque/porter-tec.git

# Acessar o diretório
cd porter-tec
cd app-next

# Instalar dependências
npm install

# Rodar o Projeto
npm run dev

#A aplicação estará disponível em http://localhost:3000
```

### Instalação e Acesso React

```bash
# Clonar o repositório
git clone https://github.com/RenatoAlbuquerque/porter-tec.git

# Acessar o diretório
cd porter-tec
cd app-react

# Instalar dependências
npm install

# Rodar o Projeto
npm run dev

#A aplicação estará disponível em http://localhost:5173/
```

### 👨‍💻 Autor

Renato Albuquerque
github.com/RenatoAlbuquerque

Frontend Developer | React, TypeScript, Next.js, MUI
