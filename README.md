
<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="https://i.imgur.com/CbJSC4I.png" width="300px" />
</h1>

### Sobre a API

<p>Essa API faz parte do Desafio Final, que é uma aplicação completa (Back-end, Front-end e Mobile) que é avaliada para emissão do Certificado do Bootcamp GoStack. Ela foi construída em NodeJS usando o Express. </p>

### Ferramentas/Tecnologias

- [Express](https://expressjs.com/pt-br/)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Nodemon](https://nodemon.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [EditorConfig](https://editorconfig.org/)
- [Sequelize](https://sequelize.org/)
- [Autenticação JWT](https://jwt.io/)
- [Redis](https://redis.io/)
- [Multer](https://github.com/expressjs/multer)
- [Nodemailer](https://nodemailer.com/about/)

### Funcionalidades
#### Funcionalidades do administrador
<p>Abaixo estão descritas as funcionalidades para administradores.</p>

#### 1. Autenticação

<p>Na aplicação existe um usuário administrador no qual seu login é feito através de email e senha. Esse usuário é responsável por tarefas envolvendo o gerenciamento de destinatarios, encomendas e entregadores. Ao logar na aplicação, é gerado um token que deverá ser utilizado nas demais rotas que precisam de autenticação.</p>

#### 2. Gestão de destinatários
<p>O administrador poderá gerenciar destinatários através do cadastro e atualização dos mesmos. Um destinatário é composto por <b>nome</b> do destinatário e campos de endereço: <b>rua, número, complemento, estado, cidade e CEP</b>. O destinatário não pode se autenticar na aplicação, portanto, não possui senha.</p>

#### 3. Gestão de entregadores
<p>Permite que o administrador cadastre e gerencie entregadores na plataforma.
Os campos pertencentes ao entregador são: </p>

- id (id do entregador)
- name (nome do entregador);
- avatar_id (foto do entregador);
- email (email do entregador)
- created_at;
- updated_at;

#### 4. Gestão de encomendas

<p>Nessa funcionalidade é feito um cadastro de encomendas para o entregador. A encomenda possui os campos:</p>

- id (id da entrega)
- recipient_id (referência ao destinatário);
- deliveryman_id (referência ao entregador);
- signature_id (referência à uma assinatura do destinatário, que será uma imagem);
- product (nome do produto a ser entregue);
- canceled_at (data de cancelamento, se cancelada);
- start_date (data de retirada do produto);
- end_date (data final da entrega);
- created_at;
- updated_at;

<p>A <b>data de início</b> deve ser cadastrada assim que for feita a retirada do produto pelo entregador, e as retiradas só podem ser feitas entre as 08:00 e 18:00h.</p>

<p>A <b>data de término</b> da entrega deve ser cadastrada quando o entregador finalizar a entrega:</p>

<p>Os campos <b>recipient_id</b> e <b>deliveryman_id</b> devem ser cadastrados no momento que for cadastrada a encomenda.</p>

<p>Quando a encomenda é <b>cadastrada</b> para um entregador, o entregador recebe um e-mail com detalhes da encomenda, com nome do produto e uma mensagem informando-o que o produto já está disponível para a retirada.</p>

#### Funcionalidades do entregador
<p>Abaixo estão descritas as funcionalidades que você deve adicionar em sua aplicação para os entregadores.</p>

#### 1. Visualizar encomendas
<p>Para que o entregador possa visualizar suas encomendas, ele deverá informar apenas seu ID de cadastro (ID do entregador no banco de dados). Essa funcionalidade deve retornar as encomendas atribuidas a ele, que **não estejam entregues ou canceladas**.</p>

<p>Além disso, é permitido listar as encomendas que já foram <b>entregues</b> por ele, com base em seu ID de cadastro;</p>

#### 2. Alterar status de encomendas
<p>O entregador pode alterar o status de retirada, através de uma data de retirada(start_date) e data de entrega(end_date) para as encomendas. O entregador só pode fazer <b>5 retiradas por dia</b>.  Além disso, para finalizar a entrega o entregador deve enviar uma imagem com a assinatura da pessoa que recebeu a encomenda.</p>

#### 3. Cadastrar problemas nas entregas
<p>O entregador nem sempre conseguirá entregar as encomendas com sucesso, algumas vezes o destinatário pode estar ausente, ou o próprio entregador poderá ter algum problema com seu veículo na hora de entregar. Os campos que compoem o cadastro de um problema são: </p>

- delivery_id (referência da encomenda);
- description (descrição do problema que o entregador teve);
- created_at;
- updated_at;
