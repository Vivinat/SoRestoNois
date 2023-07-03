const {MongoClient} = require('mongodb');
const express = require('express');
const path = require('path');
const {ObjectId} = require('mongodb');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());    //CookieParser vai armazenar cookie do usuário igual a _id no banco de dados
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));  //Diretorio onde estão os js e htmls restantes

const uri = "mongodb+srv://venat:N5qgMr2pkgT2HxMI@sorestonoiscluster.urpzo2g.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT || 3000; // Usa a porta dinâmica do Heroku ou a porta 3000 se não estiver definida

async function main(){
 
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();   //Conecta com o mongoDB
        console.log("Connected to MongoDB Atlas");

        app.post('/register', async (req, res) => {   //Se NÃO houver nenhum cookie de id salvo no sistema, registra usuário
            const name = req.body.name; //Valores padrão
            const bullets = 0;
            const progression = 'N1A';
            const achievements = [];
            const health = 5;
            
            try {   //Cria usuário na base de dados. Mande ele para game.html
                const result = await registerUser(client, name, bullets, progression, achievements, health); 
                console.log(`User registered successfully with ID ${result}.`);
                res.cookie('userId', result.toString(), { expires: new Date('2023-12-31T23:59:59Z') });
                res.status(302).setHeader('Location', 'http://localhost:3000/public/game.html').end();
            } catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        });

        app.get('/', async (req, res) => {    //Raiz da aplicação. Verifica se tem cookie de _id salvo
            const userId = req.cookies.userId;
            if (!userId) {    //Se não houver, mande o usuário se registrar
                res.sendFile(__dirname + '/public/register.html');
                return;
            }

            try {
                const user = await findUser(client, userId);
                let achievementsList = '';
                if (user) {
                  const achievements = user.achievements; // Obtenha o array de conquistas
                  // Crie uma string com os itens da lista de conquistas
                  achievementsList = achievements
                  .map(achievement => `<li><img src="${achievement}" alt="Achievement"></li>`)
                  .join('');  //QUEM FOR FAZER O CSS ACHA UM JEITO DE TIRAR O • DO <li>
              }

                if (user) {   //Se achar usuário, crie esta página dinamica com as infos do usuário
                    res.send(`
                    <html>
                    <head>
                      <title>Bem-vindo, ${user.newName}!</title>
                      <link rel="stylesheet" href="/public/style_start.css">
                    </head>
                    <body>
                      <h1>Só Resto Nois</h1>
                      <h1>Bem-vindo, ${user.newName}!</h1>
                      <p>Progresso: ${user.starterProgression}</p>
                      <p>Balas: ${user.starterBullets}</p>
<<<<<<< HEAD
                      <section class="hero-section">
                        <div class="card-grid">
                          <a id="LogButton" class="card" href="/public/game.html">
                            <div class="card__background" style="background-image: url(https://th.bing.com/th/id/OIG.5.g33uZBDYO4GlissDWY?pid=ImgGn)"></div>
                            <div class="card__content">
                              <p class="card__category"></p>
                              <h3 class="card__heading">Continuar</h3>
                            </div>
                          </a>
                          <a id="NewGameButton" class="card" href="/public/register.html">
                            <div class="card__background" style="background-image: url(https://th.bing.com/th/id/OIG.ZC2UKESEk4WKqD4JqCT5?pid=ImgGn)"></div>
                            <div class="card__content">
                              <p class="card__category"></p>
                              <h3 class="card__heading">Novo Jogo</h3>
                            </div>
                          </a>
                        <div>
                      </section>
=======
                      <p>Saúde: ${user.health}</p>
                      <button id="LogButton"><a href="/public/game.html">Continuar</a></button>
                      <button id="NewAccountButton"><a href="/public/register.html">Nova Conta</a></button>
                      <button id="NewGameButton"><a href="#" onclick="resetUser()">Novo Jogo</a></button>
                      <hr>
                      <p>Conquistas</p>
                      <p>${user.achievements.length} de 30</p>
                      <ul>
                        ${achievementsList} <!-- Insira a lista de conquistas aqui -->
                      </ul>
>>>>>>> main
                    </body>
                    <script>
                          function resetUser() {
                            fetch('/resetUser', { method: 'POST' })
                              .then(response => {
                                if (response.ok) {
                                  window.location.href = '/';
                                } else {
                                  throw new Error('Ocorreu um erro ao consultar o banco de dados.');
                                }
                              })
                              .catch(error => {
                                console.error(error);
                              });
                          }
                    </script>
                    </html>
                    `);

                } else {    //Se usuário quiser, ele pode iniciar um novo jogo
                    res.clearCookie('userId');
                    res.sendFile(__dirname + '/public/register.html');
                }
                
            } catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        });

        
        app.post('/resetUser', async (req,res) => { //Quero resetar meu jogo, mas não quero criar outra conta
          const userId = req.cookies.userId;            
          if (!userId) {    //Se não acha o cookie, manda o cara se registrar
            res.sendFile(__dirname + '/public/register.html');
            return;
          }
          try{
            const user = await findUser(client, userId);  //Ache o usuário
            if (!user) {  //Se não tiver achado, de este erro
              res.sendStatus(404);
              return;
            }

            const filter = { _id: new ObjectId(userId)};  //Vamos preparar para fazer o update
            const bullets = 0;
            const progression = 'N1A';
            const health = 5;

            const update = { $set: { 
              starterProgression: progression , 
              starterBullets: bullets,
              health: health} };

            const result = await client.db("PlayerStats").collection("_stats").updateOne(filter, update);
            if (result.modifiedCount === 0) {
              console.error(`Failed to update user ${userId}`);
              res.sendStatus(500);
              return;
            }
            console.log(`${userId} resetado com sucesso`);
            res.redirect('/');
            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
      });

        app.get('/text', async (req, res) => {    //Aqui ele pega a narração
            const userId = req.cookies.userId;    //Identifica usuário
            if (!userId) {
              res.sendStatus(401);
              return;
            }
          
            try {
              const user = await findUser(client, userId);
              if (!user) {
                res.sendStatus(401);
                return;
              }
              console.log(user.starterProgression);   //Onde o usuário está no jogo?
              const textId = user.starterProgression;
              const text = await client.db('TextDatabase').collection('_text').findOne({ _id: textId });
              console.log(text);    //Pegue a narração correta

              if (!text) {
                console.error(`Text with ID ${textId} not found.`);
                res.sendStatus(404);
                return;
              }

              const placeholder = "@";    //A narração tem o caractere placeholder '@'? 
              const regex = new RegExp(placeholder, "g");
              console.log(text.text);
              if (regex.test(text.text)) {    //Se tiver, troque ele pelo nome do usuário
                console.log("Fazendo mudança de nome");
                text.text = text.text.replace(regex, user.newName);
              }

              res.json({ text: text.text });
            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
          });

          app.get('/choiceText', async (req, res) => {    //Aqui ele pega as escolhas
            const userId = req.cookies.userId;    //Identifique o usuário
            if (!userId) {
              res.sendStatus(401);
              return;
            }
          
            try {
              const user = await findUser(client, userId);
              if (!user) {
                res.sendStatus(401);
                return;
              }
              console.log(user.starterProgression);   //Ache a progressão dele
              const textId = user.starterProgression;
              const text = await client.db('TextDatabase').collection('_text').findOne({ _id: textId });
              const choicesId = text.choices;
              const choiceText = [];    //Vetor com as escolhas
              for (let i = 0; i < choicesId.length; i++) {
                const choice = await client.db('TextDatabase').collection('_choices').findOne({ _id: choicesId[i] });
                choiceText.push(choice.content);    //Coloque elas no vetor
              }
              console.log(text);
              if (!text) {
                console.error(`Text with ID ${textId} not found.`);
                res.sendStatus(404);
                return;
              }
              res.json({ choiceText });   //Devolva o vetor
            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
          });

          app.get('/choiceIds', async (req, res) => {   //Preciso identificar agora qual é o ID dessas escolhas
            const userId = req.cookies.userId;    //Ache o usuário
            if (!userId) {
              res.sendStatus(401);
              return;
            }
          
            try {
              const user = await findUser(client, userId);
              if (!user) {
                res.sendStatus(401);
                return;
              }

              const textId = user.starterProgression;   //Ache sua progressão
              const text = await client.db('TextDatabase').collection('_text').findOne({ _id: textId });
              const choicesId = text.choices;   //Text.choices é uma array de Ids de escolhas
              console.log(choicesId);
              if (!text) {
                console.error(`ID ${textId} not found.`);
                res.sendStatus(404);
                return;
              }
              res.json({ choicesId });    //Devolva estas Ids. Precisamos delas pra saber onde mandar o jogador

            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
            });


          app.get('/updateBullets', async (req, res) => {   //Aqui verifica as balas
            const userId = req.cookies.userId;
            if (!userId) {
              res.sendStatus(401);
              return;
            }
          
            try {
              const user = await findUser(client, userId);    //Ache o usuário
              if (!user) {
                res.sendStatus(401);
                return;
              }
              const currentBullets = user.starterBullets;   //Consulte as balas
              console.log(`O usuário tem ${currentBullets} balas`)
              res.json({ currentBullets });
            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
          });

          app.get('/updateHealth', async (req, res) => {   //Aqui verifica as balas
            const userId = req.cookies.userId;
            if (!userId) {
              res.sendStatus(401);
              return;
            }
          
            try {
              const user = await findUser(client, userId);    //Ache o usuário
              if (!user) {
                res.sendStatus(401);
                return;
              }
              const currentHealth = user.health;   //Consulte as balas
              console.log(`O usuário tem ${currentHealth} pontos de saúde`)
              res.json({ currentHealth });
            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
          });


          app.post('/makeChoice', async (req, res) => {   //Aqui acontece quando o usuário aperta um botão de escolha
            const userId = req.cookies.userId;
            if (!userId) {
              res.sendStatus(401);
              return;
            }
            try {
              const user = await findUser(client, userId);    //Ache ele
              if (!user) {
                res.sendStatus(401);
                return;
              }

              const choiceId = req.body.choiceId;   //Cate a Id da escolha

              // Ache a escolha no banco
              const choice = await client.db('TextDatabase').collection('_choices').findOne({ _id: choiceId });

              console.log("Verificando se escolha tem custo de balas");

              if (choice.use_bullets == true)   //Essa escolha usa balas?
              {
                  console.log("Uso de balas detectado");
                  let bullets = parseInt(choice.bullets_used);
                  const canShoot = { value: true };
                  await checkAndUpdateBullets(client, userId, bullets, canShoot);
                  console.log(canShoot.value);
                  if (canShoot.value == false)    //Não há balas suficientes
                  {
                    console.log("MORREU!")
                    choice.next_narration = "DEATH";    //Chame narração de morte
                  }
              }

              if (choice.use_health == true)  //Essa escolha usa vida?
              {
                console.log("Modificão de saúde detectada");
                let health = parseInt(choice.health_used);
                const isDead = { value: false};
                await checkAndUpdateHealth(client, userId, health, isDead);
                console.log(isDead.value);
                if (isDead.value == true)         //Sua saúde caiu para zero
                {
                  console.log("MORREU!")
                  choice.next_narration = "DEATH";    //Chame narração de morte
                }
              }

              if (choice.has_achievement == true) //Essa escolha te dá uma conquista?
              {
                console.log("Recebimento de conquista detectado");
                await updateAchievements(client, userId, choice.achievement);
              }
              
              if (!choice) {
                res.sendStatus(404);
                return;
              }
            
              // Escolha feita com sucesso. Atualize a proressão do usuário
              const filter = { _id: new ObjectId(userId)};
              console.log(choice.next_narration);
              const update = { $set: { starterProgression: choice.next_narration } };
              const result = await client.db("PlayerStats").collection("_stats").updateOne(filter, update);
              if (result.modifiedCount === 0) {
                console.error(`Failed to update user ${userId}`);
                res.sendStatus(500);
                return;
              }
              console.log(`User progression updated to ${choice.next_narration}`);
              res.sendStatus(200);
              } catch (error) {
                console.error(error);
                res.sendStatus(500);
              }
            });

      app.listen(port, () => {  //Port dinamico
        console.log(`Server listening on ${port}`);
      });
    } catch (error) {
      console.error("Error connecting to MongoDB Atlas", error);
    }
}


main();

/*
	Registra um usuário no banco de dados	
*/

async function registerUser(client, newName, starterBullets, starterProgression, achievements, health) {

    const result = await client.db("PlayerStats").collection("_stats").insertOne({ newName, starterBullets, starterProgression, achievements, health});
    console.log(`User ${newName} registered successfully.`);
    return result.insertedId;
}

/*
	Ache usuário no banco de dados
*/


async function findUser(client, userId) {
    return client.db("PlayerStats").collection("_stats").findOne({ _id: new ObjectId(userId) });
}

async function updateAchievements(client, userId, achievement)
{
  const user = await findUser(client, userId);
  user.achievements.push(achievement);
  try{
    const filter = { _id: new ObjectId(userId)};
    console.log(`Nova conquista a ser inserida: ${achievement}`);
    const update = { $set: { achievements: user.achievements } };
    const result = await client.db("PlayerStats").collection("_stats").updateOne(filter, update);
    if (result.modifiedCount === 0) {
      console.error(`Failed to update user ${userId}`);
      res.sendStatus(500);
      return -1;
    }
    console.log(`User achievements updated`);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
}

async function checkAndUpdateBullets(client, userId, bulletsModify, canShoot)
{
    //QUER ADICIONAR BALAS? PASSE BULLETS COMO NEGATIVO NO BANCO
    //QUER TIRAR BALAS? PASSE COMO POSITIVO NO BANCO
    const user = await findUser(client, userId);
    user.starterBullets = user.starterBullets - bulletsModify;
    console.log(`Serão adicionadas/removidas ${bulletsModify} balas do jogador`);
    if (user.starterBullets < 0){
      console.log("Não há balas suficientes!")
      canShoot.value = false;
    }
    try{
    const filter = { _id: new ObjectId(userId)};
    console.log(`Quantidade de balas atualizado: ${user.starterBullets}`);
    const update = { $set: { starterBullets: user.starterBullets } };
    const result = await client.db("PlayerStats").collection("_stats").updateOne(filter, update);
    if (result.modifiedCount === 0) {
      console.error(`Failed to update user ${userId}`);
      res.sendStatus(500);
      return -1;
    }
    console.log(`User bullets updated`);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
}

async function checkAndUpdateHealth(client, userId, healthModify, isDead)
{
    //MESMA LÓGICA DAS BALAS
    //QUER ADICIONAR VIDA? PASSE HEALTHMODIFY COMO NEGATIVO NO BANCO
    //QUER TIRAR VIDA? PASSE COMO POSITIVO NO BANCO
    const user = await findUser(client, userId);
    user.health = user.health - healthModify;
    if (user.health > 5){
      console.log("Vida do jogador excede 5. Forçando valor para 5")
      user.health = 5;
    }
    console.log(`Será adicionado/removido ${healthModify} saúde do jogador`);
    if (user.health <= 0){
      console.log("Saúde caiu para zero!")
      isDead.value = true;
    }
    try{
    const filter = { _id: new ObjectId(userId)};
    console.log(`Quantidade de saúde atualizado: ${user.health}`);
    const update = { $set: { health: user.health } };
    await client.db("PlayerStats").collection("_stats").updateOne(filter, update);
    console.log(`User health updated`);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
}

function getCookie(req, name) {   //TALVEZ NÃO PRECISEMOS DISTO.
  if (req.cookies) {
    return req.cookies[name];
  }
  return null;
}

