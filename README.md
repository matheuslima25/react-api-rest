
# 🛒 Projeto Fullstack – Marketplace com Django REST Framework + ReactJS + TypeScript

Este repositório contém um projeto fullstack de um marketplace simples, com backend em Django REST Framework e frontend em ReactJS com TypeScript, integrando autenticação via JWT com httpOnly cookies.

---

## 📦 Estrutura de Pastas

```
/backend      # API Django REST Framework
/frontend     # Aplicação ReactJS + TypeScript
```

---

## 🚀 Como Rodar o Projeto

### ✅ **Backend (Django REST Framework)**

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Crie e ative o ambiente virtual:

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate   # Windows
```

3. Instale as dependências:

```bash
pip install -r requirements.txt
```

4. Configure o banco de dados e rode as migrações:

```bash
python manage.py migrate
```

5. Crie um superusuário para acessar o Django Admin:

```bash
python manage.py createsuperuser
```

6. Inicie o servidor:

```bash
python manage.py runserver
```

---

### ✅ **Frontend (ReactJS + TypeScript + Vite)**

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente criando o arquivo `.env.local`:

```
VITE_API_URL=http://localhost:8000
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Acesse no navegador:  
[http://localhost:5173](http://localhost:5173)

---

## 🎯 **Atividade Prática**

Implemente um módulo de **Galeria de Imagens** utilizando os conceitos aprendidos:

### 📌 **Requisitos da Galeria:**

- [ ] Criar uma nova entidade/modelo de **Galeria** no backend (com título, descrição e imagem).
- [ ] Configurar a API de CRUD para a Galeria (usar Django REST Framework).
- [ ] No frontend, criar:
  - [ ] Página de listagem de imagens (Dashboard).
  - [ ] Página de cadastro/edição de uma nova imagem.
  - [ ] Página de detalhes da imagem.
- [ ] Utilizar React Hook Form + Yup para validação dos formulários.
- [ ] Proteger as rotas com autenticação (aproveitar o AuthContext).
- [ ] Implementar paginação na listagem.
- [ ] Aplicar estilização com Tailwind CSS.

### 💡 **Extras (Desafio):**
- [ ] Adicionar a possibilidade de "Favoritar" uma imagem.
- [ ] Implementar um filtro para buscar imagens pelo título.
- [ ] Adicionar suporte a múltiplos idiomas (i18n).

---

### 📤 Entrega

- Subir no GitHub ou enviar ZIP com:
  - Código fonte do projeto
  - Prints do funcionamento (opcional)

---

## 🤝 **Dúvidas?**

Caso tenha dúvidas, entre em contato pelo **Discord** ou pelo e-mail do professor. Bons estudos e divirta-se!
