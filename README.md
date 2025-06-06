# Conectar Frontend – Gerenciamento de Usuários

Frontend moderno e escalável para o sistema **Conectar**, desenvolvido com **ReactJS**, **TypeScript** e **TailwindCSS**, com foco em autenticação segura, gerenciamento de usuários e experiência responsiva. Este projeto consome uma API RESTful desenvolvida em NestJS e oferece funcionalidades distintas para usuários comuns e administradores.

---

## 🚀 Funcionalidades Principais

### 👤 Autenticação de Usuários
- Tela de Login (`/login`)
- Tela de Cadastro (`/register`)
- Armazenamento seguro de token JWT
- Gerenciamento de sessão com redirecionamento baseado em papel

### 🧑‍💼 Gerenciamento de Perfil (Usuário & Admin)
- Visualização de dados do perfil (`/profile`)
- Atualização de nome e senha

### 🛠️ Administração de Usuários (Somente Admin)
- Listagem completa de usuários (`/admin/users`)
- Filtro por papel e ordenação (nome ou data de criação)
- Busca local por nome/email
- Status ativo/inativo com base no último login
- Exclusão com confirmação

### 📱 Interface Responsiva
- Layout fluido e adaptável via TailwindCSS

### 🔁 Roteamento e Navegação
- React Router DOM com rotas protegidas (`ProtectedRoute`)
- Navbar dinâmica de acordo com status de autenticação

### 💬 Feedback ao Usuário
- Mensagens de sucesso e erro
- Indicadores de carregamento durante requisições

---

## 🛠️ Tecnologias Utilizadas

| Categoria           | Ferramenta                         |
|---------------------|------------------------------------|
| Framework           | ReactJS v18+                       |
| Linguagem           | TypeScript                         |
| Estado Global       | Context API (`AuthContext`)        |
| Roteamento          | React Router DOM v6+               |
| Estilização         | TailwindCSS (via CDN)              |
| Requisições HTTP    | Axios + interceptors JWT           |
| Hooks               | `useState`, `useEffect`, `useContext`, `useNavigate`, `useAuth` |
| Build Tools         | Create React App / Vite            |

---

## 📁 Estrutura do Projeto

conectar-frontend/
├── public/
├── src/
│ ├── App.tsx
│ ├── index.tsx
│ ├── index.css
│ ├── assets/
│ ├── components/common/Navbar.tsx
│ ├── config/index.ts
│ ├── contexts/AuthContext.tsx
│ ├── hooks/useAuth.ts
│ ├── pages/
│ │ ├── AdminUserListPage.tsx
│ │ ├── LoginPage.tsx
│ │ ├── RegisterPage.tsx
│ │ ├── UserProfilePage.tsx
│ │ └── NotFoundPage.tsx
│ ├── router/
│ │ ├── index.tsx
│ │ └── ProtectedRoute.tsx
│ ├── services/api.ts
│ └── types/user.ts
├── .env.example
├── package.json
└── tsconfig.json


---

## ⚙️ Pré-requisitos

- Node.js **v16+**
- npm **v8+** ou yarn **v1.22+**
- Git
- API Backend NestJS (rodando em `http://localhost:3001`)

---

## 🔧 Configuração do Ambiente

Crie um `.env` baseado no `.env.example`:

```env
REACT_APP_API_URL=http://localhost:3001


# Clonar repositório
git clone https://github.com/seu-usuario/conectar-frontend.git
cd conectar-frontend

# Instalar dependências
npm install
# ou
yarn install


npm install axios react-router-dom
# ou
yarn add axios react-router-dom


# Iniciar frontend
npm start
# ou
yarn start


| Script  | Descrição                        |
| ------- | -------------------------------- |
| `start` | Inicia a aplicação em modo dev   |
| `build` | Compila para produção (`/build`) |
| `test`  | Executa testes (se configurado)  |
| `eject` | Remove CRA config (irreversível) |


🧠 Decisões de Arquitetura
React + TS: Previsibilidade e manutenção com tipagem estática

Context API: Simples e eficaz para autenticação

TailwindCSS: Velocidade e consistência visual

Axios + Interceptors: Manipulação centralizada de JWTs

Roteamento Protegido: Acesso por papéis com segurança

Estrutura Modular: Pastas por responsabilidade para escalar com clareza

💡 Próximos Passos
✅ Testes unitários e de integração (Jest + RTL)

✅ Toasts de feedback global

✅ Validação de formulários com React Hook Form

✅ Melhorar performance com React.lazy e memoization

✅ Login Social com OAuth (Google, Microsoft)

✅ Paginação na listagem de usuários

✅ i18n para múltiplos idiomas

✅ CI/CD com GitHub Actions ou similar

🔒 Considerações de Segurança
JWT no localStorage (padrão comum, mas vulnerável a XSS)

Recomendado: Futuramente migrar para cookies HttpOnly

Sanitização de entradas (evitar dangerouslySetInnerHTML)