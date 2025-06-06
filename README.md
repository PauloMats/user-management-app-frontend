Conectar Frontend - Gerenciamento de Usuários
Este é o frontend da aplicação Conectar, desenvolvido com ReactJS, TypeScript e estilizado com TailwindCSS. Ele consome a API RESTful fornecida pelo backend Conectar para permitir que os usuários se registrem, façam login e gerenciem suas informações, e que administradores gerenciem todos os usuários do sistema.

Funcionalidades Principais
Autenticação de Usuários:

Tela de Login (/login).

Tela de Cadastro (/register).

Armazenamento seguro de token JWT e gerenciamento de sessão.

Redirecionamento automático com base no status de autenticação e papel do usuário.

Gerenciamento de Perfil de Usuário (para usuários regulares e admins):

Visualização de dados do perfil (/profile).

Atualização de nome e senha.

Gerenciamento de Usuários (para Administradores):

Listagem de todos os usuários (/admin/users).

Filtro por papel e ordenação por nome ou data de criação (implementado via backend).

Busca local por nome/email na lista de usuários.

Visualização do status (ativo/inativo) dos usuários com base na última data de login.

Exclusão de usuários (com confirmação).

Interface Responsiva:

Design adaptável para funcionar bem em desktops e dispositivos móveis utilizando TailwindCSS.

Roteamento e Navegação:

Uso de React Router DOM para navegação entre páginas.

Rotas protegidas baseadas em autenticação e papel do usuário (ProtectedRoute).

Navbar dinâmica que reflete o estado de autenticação do usuário.

Feedback ao Usuário:

Mensagens de erro e sucesso para operações de formulário.

Indicadores de carregamento (isLoading) durante chamadas de API.

Tecnologias Utilizadas
Framework/Biblioteca: ReactJS (v18+)

Linguagem: TypeScript

Estado Global: React Context API (AuthContext)

Rotas: React Router DOM (v6+)

Estilização: TailwindCSS (via CDN no exemplo, idealmente via PostCSS em um projeto de produção)

HTTP Client: Axios (com interceptors para JWT e tratamento básico de erros de autenticação)

Hooks: useState, useEffect, useContext, useCallback, useNavigate e hooks customizados (useAuth).

Tooling: Create React App (ou Vite, se você optou por ele)

Estrutura do Projeto
conectar-frontend/
├── public/
│   ├── index.html          # HTML principal, onde o React é injetado
│   └── ...                 # Outros assets públicos (favicon, manifest.json)
├── src/
│   ├── App.tsx             # Componente raiz da aplicação, define layout principal e rotas
│   ├── index.css           # Estilos globais ou configuração base do TailwindCSS
│   ├── index.tsx           # Ponto de entrada do React, renderiza o App
│   │
│   ├── assets/             # (Opcional) Imagens, fontes locais, etc.
│   │
│   ├── components/         # Componentes reutilizáveis da UI
│   │   └── common/
│   │       └── Navbar.tsx  # Exemplo de componente de navegação
│   │
│   ├── config/
│   │   └── index.ts        # Configurações da aplicação (ex: URL da API)
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx # Contexto para gerenciamento de autenticação e dados do usuário
│   │
│   ├── hooks/
│   │   └── useAuth.ts      # Hook customizado para acessar o AuthContext
│   │
│   ├── pages/              # Componentes que representam páginas completas da aplicação
│   │   ├── AdminUserListPage.tsx
│   │   ├── LoginPage.tsx
│   │   ├── NotFoundPage.tsx
│   │   ├── RegisterPage.tsx
│   │   └── UserProfilePage.tsx
│   │
│   ├── router/
│   │   ├── index.tsx         # Define todas as rotas da aplicação usando React Router
│   │   └── ProtectedRoute.tsx # Componente para proteger rotas baseadas em autenticação e papéis
│   │
│   ├── services/
│   │   └── api.ts            # Configuração da instância do Axios para chamadas à API
│   │
│   ├── types/
│   │   └── user.ts           # Definições de tipos TypeScript (ex: User, UserRole)
│   │
│   └── reportWebVitals.ts
│   └── setupTests.ts       # (Se usar Jest/React Testing Library)
│
├── .env                    # Variáveis de ambiente (NÃO versionar)
├── .env.example            # Exemplo de arquivo .env
├── .gitignore
├── package.json
├── README.md               # Este arquivo
└── tsconfig.json           # Configuração do TypeScript

Pré-requisitos
Node.js (v16.x.x ou superior recomendado)

npm (v8+) ou yarn (v1.22+)

Git

Backend Rodando: A API do backend Conectar deve estar em execução e acessível (por padrão, em http://localhost:3001).

Configuração do Ambiente (.env)
Na raiz do projeto frontend, crie um arquivo chamado .env (você pode copiar do .env.example).

Defina a URL base da sua API backend:

REACT_APP_API_URL=http://localhost:3001

Observação: No código fornecido, a URL da API no src/services/api.ts (API_URL em src/config/index.ts) é http://localhost:3001. Se o seu backend NestJS tiver um prefixo global /api configurado para todos os endpoints (ex: app.setGlobalPrefix('api'); no main.ts do backend), você precisará ajustar esta variável para REACT_APP_API_URL=http://localhost:3001/api ou remover o prefixo do backend. O código atual do backend NestJS fornecido não define um prefixo global /api, então os endpoints são acessados diretamente (ex: /auth/login, /users). Assim, REACT_APP_API_URL=http://localhost:3001 deve ser o correto.

Instalação das Dependências
Após clonar o repositório, navegue até a pasta do projeto e instale as dependências:

# Usando npm
npm install

# Ou usando yarn
yarn install

Se você ainda não instalou axios ou react-router-dom, instale-os:

npm install axios react-router-dom
# ou
yarn add axios react-router-dom

Rodando a Aplicação em Modo de Desenvolvimento
Para iniciar o servidor de desenvolvimento do React:

# Usando npm
npm start

# Ou usando yarn
yarn start

A aplicação frontend estará disponível em http://localhost:3000 (ou outra porta, se a 3000 estiver ocupada). O navegador deve abrir automaticamente.

Lembre-se que o servidor backend (NestJS) também precisa estar rodando para que as funcionalidades que dependem da API (login, cadastro, listagem de usuários, etc.) funcionem corretamente.

Scripts Disponíveis
No diretório do projeto, você pode rodar:

npm start ou yarn start: Inicia a aplicação em modo de desenvolvimento.

npm run build ou yarn build: Compila a aplicação para produção na pasta build/.

npm test ou yarn test: (Se configurado) Roda os testes.

npm run eject ou yarn eject: (Se usando Create React App) Remove a dependência de configuração única e copia os scripts de build para o seu projeto. Atenção: esta é uma operação irreversível!

Build para Produção
Para criar uma versão otimizada da aplicação para produção:

# Usando npm
npm run build

# Ou usando yarn
yarn build

Os arquivos compilados serão gerados na pasta build/. Estes arquivos podem ser implantados em qualquer servidor web estático (Vercel, Netlify, GitHub Pages, AWS S3, etc.).

Decisões de Design e Arquitetura
ReactJS com TypeScript: Escolhido pela sua popularidade, ecossistema robusto, e pela segurança de tipos que o TypeScript oferece, tornando o desenvolvimento mais previsível e menos propenso a erros em tempo de execução.

Context API para Estado Global: Para o gerenciamento do estado de autenticação e informações do usuário logado, a Context API é suficiente para este escopo de projeto, sendo mais simples que Redux para casos de uso menos complexos.

React Router DOM: Padrão para roteamento em aplicações React, oferecendo uma API declarativa para gerenciar a navegação e proteger rotas.

TailwindCSS: Framework CSS utility-first que permite construir interfaces customizadas rapidamente sem escrever CSS tradicional, promovendo consistência e facilidade de manutenção.

Axios: Cliente HTTP popular que facilita o envio de requisições assíncronas, com funcionalidades como interceptors para manipulação de tokens JWT e tratamento global de respostas/erros.

Estrutura de Pastas: Organizada por features/responsabilidades (pages, components, services, contexts) para facilitar a localização e manutenção do código.

Componentes Funcionais e Hooks: Utilização da abordagem moderna do React com componentes funcionais e hooks para lógica e estado.

Próximos Passos e Melhorias (Sugestões)
Testes: Implementar testes unitários (com Jest/React Testing Library) para componentes e lógica, e testes de integração.

Tratamento de Erros e Feedback: Melhorar o feedback visual para o usuário com toasts/notificações para erros de API, sucesso em operações, etc.

Validação de Formulários: Utilizar bibliotecas como React Hook Form ou Formik para validações de formulário mais robustas e melhor gerenciamento de estado de formulários.

Otimização de Performance:

Code splitting com React.lazy e Suspense para páginas ou componentes pesados.

Memoização (React.memo, useMemo, useCallback) onde apropriado.

Segurança:

Revisar a segurança do armazenamento de tokens (embora localStorage seja comum, HttpOnly cookies gerenciados pelo backend são mais seguros contra XSS, mas requerem configuração adicional no backend).

Implementar sanitização de inputs se houver qualquer renderização de HTML vindo de dados do usuário (geralmente não é o caso com React se você não usa dangerouslySetInnerHTML).

Estilização Avançada: Para projetos maiores, configurar o TailwindCSS via PostCSS em vez de CDN para permitir personalizações mais profundas e otimizações de build (purging).

Login Social (OAuth): Implementar botões de login com Google ou Microsoft, coordenando com os respectivos endpoints no backend.

Paginação: Na tela de listagem de usuários (Admin), implementar paginação se o número de usuários puder crescer muito.

Internacionalização (i18n): Se a aplicação precisar suportar múltiplos idiomas.

CI/CD: Configurar um pipeline de Integração Contínua e Deploy Contínuo.