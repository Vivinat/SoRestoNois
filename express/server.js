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
            
            try {   //Cria usuário na base de dados. Mande ele para game.html
                const result = await registerUser(client, name, bullets, progression); 
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
                if (user) {   //Se achar usuário, crie esta página dinamica com as infos do usuário
                    res.send(`
                    <html>
                    <head>
                      <title>Bem-vindo, ${user.newName}!</title>
                      <link rel="stylesheet" href="/public/style.css">
                    </head>
                    <body>
                      <h1>Bem-vindo, ${user.newName}!</h1>
                      <p>Progresso: ${user.starterProgression}</p>
                      <p>Balas: ${user.starterBullets}</p>
                      <button id="LogButton"><a href="/public/game.html">Continuar</a></button>
                      <button id="NewGameButton"><a href="/public/register.html">Novo Jogo</a></button>
                    </body>
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


          app.get('/consultaBullets', async (req, res) => {   //Aqui verifica as balas
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

async function registerUser(client, newName, starterBullets, starterProgression) {

    const result = await client.db("PlayerStats").collection("_stats").insertOne({ newName, starterBullets, starterProgression});
    console.log(`User ${newName} registered successfully.`);
    return result.insertedId;
}

/*
	Ache usuário no banco de dados
*/


async function findUser(client, userId) {
    return client.db("PlayerStats").collection("_stats").findOne({ _id: new ObjectId(userId) });
}

async function checkAndUpdateBullets(client, userId, bullets, canShoot)
{
    //QUER ADICIONAR BALAS? PASSE BULLETS COMO NEGATIVO NO BANCO
    //QUER TIRAR BALAS? PASSE COMO POSITIVO NO BANCO
    const user = await findUser(client, userId);
    user.starterBullets = user.starterBullets - bullets;
    console.log(`Serão adicionadas/removidas ${bullets} balas do jogador`);
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

function getCookie(req, name) {   //TALVEZ NÃO PRECISEMOS DISTO.
  if (req.cookies) {
    return req.cookies[name];
  }
  return null;
}

