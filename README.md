# **API de Gestão de Eventos**

**Descrição**:
- Essa API que permita a gestão de eventos, onde os usuários podem criar e participar de eventos, como conferências, workshops ou meetups. O sistema também gerencia a 
  inscrição e a lista de participantes.

**Funcionalidades**:
**CRUD de Eventos**:

**Eventos**: cada evento tem um `nome`, `data`, `local`, `descrição` e `capacidade` de `participantes`.
- **Relacionamento**: Um evento pode ter vários participantes.
- 
**CRUD de Usuários**:

**Usuários**: os usuários podem se cadastrar e fazer login.

- **Relacionamento**: Um usuário pode criar vários eventos e se inscrever em vários eventos.
  
**Inscrição em Eventos**:

- Usuários podem se inscrever em eventos, respeitando o limite de capacidade.
- Uma inscrição só pode ser feita caso o evento ainda tenha vagas.
  
**Autenticação e Autorização**:

- Implemente autenticação com JWT para garantir que apenas usuários autenticados possam criar eventos ou se inscrever.
  
**Relações com Prisma**:

- Relacionamento muitos-para-muitos entre Usuários e Eventos através de uma tabela de Participações.
- Validação de capacidade do evento no momento da inscrição.
- Validação de dados:

- Valide os dados no backend, como verificar a data do evento (não permitir datas no passado) e a capacidade máxima.

**Extras**:

- Filtros para listar eventos futuros e passados.
- Endpoint para listar todos os participantes de um evento.

**Modelo de Entidades**:

- **Usuário**: (`id`, `nome`, `email`, `senha`)
  
- **Evento** (`id`, `nome`, `data`, `local`, `capacidade`)

- **Participação** (`id`, `userId`, `eventId`)

**Tecnologias**:

**Backend**: Node.js com Express
  
**Banco de Dados**: PostgreSQL ou MySQL

**ORM**: Prisma

**Autenticação**: JWT

**Testes**: Jest ou qualquer outro framework de teste
Esse projeto vai te ajudar a mostrar o uso de Prisma para gerenciar relacionamentos complexos e validar dados em um cenário real. Além disso, pode incluir autenticação e controle de acesso, o que é uma habilidade importante no desenvolvimento de APIs robustas.
