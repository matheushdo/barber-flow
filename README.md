# 💈 Barber Flow

Sistema de gerenciamento para barbearias, desenvolvido para facilitar o controle de clientes, serviços, usuários e agendamentos.

O sistema permite o gerenciamento da agenda da barbearia, controle de horários disponíveis, bloqueios de horários, serviços realizados e acompanhamento através de um painel administrativo.

---

# 🚀 Tecnologias utilizadas

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Node.js
- Express.js

## Banco de dados

- MySQL 8.0

## Ferramentas

- Git e GitHub
- Insomnia
- MySQL Workbench
- VS Code

---

# 📁 Estrutura do projeto

```text
barber-flow
│
├── backend
│   │
│   ├── controllers
│   │   ├── agendaController.js
│   │   ├── agendamentosController.js
│   │   ├── clientesController.js
│   │   ├── servicosController.js
│   │   └── usuariosController.js
│   │
│   ├── database
│   │
│   ├── routes
│   │   ├── agenda.js
│   │   ├── agendamentos.js
│   │   ├── clientes.js
│   │   ├── dashboard.js
│   │   ├── servicos.js
│   │   └── usuarios.js
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
└── frontend
    │
    ├── admin
    │   ├── admin.html
    │   ├── admin.css
    │   └── admin.js
    │
    ├── css
    │   ├── style.css
    │   └── cadastro.css
    │
    ├── images
    │   ├── barbearia-interior.jpg
    │   └── barbearia.jpg
    │
    ├── js
    │   ├── script.js
    │   └── usuario.js
    │
    ├── cadastro.html
    ├── index.html
    └── login.html
```

---

# 🗄️ Banco de dados

O sistema utiliza MySQL com tabelas responsáveis pelo gerenciamento da aplicação.

## Usuários

Responsável pelo gerenciamento de usuários do sistema, permitindo diferenciar clientes e administradores através do campo tipo.

Campos principais:

- id
- nome
- email
- senha
- telefone
- tipo (cliente/admin)

---

## Serviços

Armazena os serviços oferecidos pela barbearia.

Campos principais:

- id
- nome
- preço
- duração

| Serviço | Valor | Duração |
|---|---|---|
| Barba | R$40,00 | 15 minutos |
| Cabelo mensal | R$80,00 | 30 minutos |
| Cabelo e barba mensal | R$165,00 | 30 minutos |
| Corte degradê navalhado | R$40,00 | 30 minutos |
| Cabelo na máquina e barba | R$60,00 | 30 minutos |
| Platinado/Nevou | R$250,00 | 120 minutos |
| Só máquina | R$25,00 | 15 minutos |

---

## Agendamentos

Responsável pelo controle dos horários marcados.

Campos principais:

- id
- usuario_id
- servico_id
- data
- horário
- status

Status disponíveis:

- pendente
- confirmado
- realizado
- cancelado

---

## Controle de agenda

Responsável pelo gerenciamento dos horários disponíveis.

Tabelas:

- horarios_funcionamento
- bloqueios_agenda

Permite:

- Controle do horário de funcionamento
- Pausa para almoço
- Bloqueio de horários específicos
- Bloqueio de dias completos

Tipos de bloqueios:

- Férias
- Feriado
- Curso
- Manutenção
- Outro

---

# ⚙️ Como executar o projeto

## Backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Execute o servidor:

```bash
npm start
```

---

## Banco de dados

Crie o banco:

```sql
CREATE DATABASE barber_flow;
```

Configure as credenciais do MySQL no backend.

---

## Frontend

Abra o arquivo:

```text
frontend/index.html
```

Ou utilize uma extensão como Live Server no VS Code.

---

# ✅ Funcionalidades atuais

## 👤 Clientes

- [x] Cadastro de clientes
- [x] Listagem de clientes
- [x] Buscar cliente por ID
- [x] Atualização de clientes
- [x] Exclusão de clientes
- [x] Validação de campos obrigatórios
- [x] Validação de telefone

---

## 💈 Serviços

- [x] Cadastro de serviços
- [x] Listagem de serviços
- [x] Buscar serviço por ID
- [x] Atualização de serviços
- [x] Exclusão de serviços
- [x] Controle de preço
- [x] Controle de duração

---

## 📅 Agendamentos

- [x] Criar agendamento
- [x] Listar agendamentos
- [x] Buscar agendamento por ID
- [x] Atualizar agendamento
- [x] Excluir agendamento

### Regras de negócio

- [x] Verificação de horários disponíveis
- [x] Bloqueio de horários duplicados
- [x] Controle de duração dos serviços
- [x] Remoção automática de horários ocupados
- [x] Validação de conflitos de horários
---

# 🕒 Controle de agenda

- [x] Cadastro de horários de funcionamento
- [x] Alteração dos horários da agenda
- [x] Geração automática de horários disponíveis
- [x] Intervalos de 15 minutos
- [x] Controle de pausa para almoço
- [x] Bloqueio de horários específicos
- [x] Bloqueio de dias completos

---

# 👥 Usuários

- [x] Estrutura de usuários
- [x] Separação entre cliente e administrador
- [x] Relacionamento com agendamentos

Relacionamentos:

- Um usuário pode possuir vários agendamentos.
- Um serviço pode estar presente em vários agendamentos.

---

# 📊 Painel Administrativo

- [x] Dashboard administrativo
- [x] Filtro de faturamento baseado em serviços realizados
- [x] Total de clientes
- [x] Total de serviços
- [x] Total de agendamentos
- [x] Cálculo de faturamento
- [x] Gráfico de serviços mais realizados
- [x] Próximos atendimentos

---

# 🔗 Endpoints da API

## Clientes

```http
GET    /clientes
POST   /clientes
GET    /clientes/:id
PUT    /clientes/:id
DELETE /clientes/:id
```

---

## Serviços

```http
GET    /servicos
POST   /servicos
GET    /servicos/:id
PUT    /servicos/:id
DELETE /servicos/:id
```

---

## Agendamentos

```http
GET    /agendamentos
POST   /agendamentos
GET    /agendamentos/:id
PUT    /agendamentos/:id
DELETE /agendamentos/:id
```

---

## Agenda

### Horários

```http
GET /agenda/horarios

PUT /agenda/horarios/:id
```

### Bloqueios

```http
GET    /agenda/bloqueios

POST   /agenda/bloqueios

PUT    /agenda/bloqueios/:id

DELETE /agenda/bloqueios/:id
```

### Disponibilidade

```http
GET /agenda/disponiveis
```

Exemplo:

```text
/agenda/disponiveis?data=2026-07-24&servico=44
```

Retorno:

```json
{
 "duracao":120,
 "horarios":[
   "09:00",
   "09:15",
   "14:30"
 ]
}
```

---

# 🔄 Próximas funcionalidades

- [ ] Sistema de login
- [ ] Seleção de horários pelo cliente através do calendário
- [ ] Atualização do Frontend do painel do cliente
- [ ] Autenticação JWT
- [ ] Controle de permissões
- [ ] Calendário visual de agendamentos
- [ ] Seleção de horários pelo cliente
- [ ] Confirmação automática
- [ ] Notificações
- [ ] Cadastro de barbeiros
- [ ] Deploy

---

# 📌 Objetivo

Projeto desenvolvido para estudo de desenvolvimento web, aplicando conceitos de frontend, backend, banco de dados e APIs REST.

O projeto busca simular um sistema real de gerenciamento para uma barbearia, com foco em:

- Organização da agenda
- Automação de horários
- Controle de serviços
- Regras de negócio
- Melhor experiência para clientes

---

# 👨‍💻 Desenvolvimento

Projeto desenvolvido utilizando arquitetura baseada em API REST, separando responsabilidades entre:

- Frontend
- Backend
- Banco de dados

Conceitos aplicados:

- Desenvolvimento Web
- Banco de dados relacionais
- CRUD
- APIs REST
- Validações
- Regras de negócio
- Relacionamentos SQL
- Versionamento com Git

---

# 📍 Status do projeto

🚧 Em desenvolvimento ativo

Funcionalidades principais implementadas:

- CRUD completo
- Sistema de agendamento
- Controle de disponibilidade
- Gestão de serviços
- Dashboard administrativo

Novas funcionalidades continuam sendo adicionadas conforme a evolução do projeto.