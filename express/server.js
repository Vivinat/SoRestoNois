const {MongoClient} = require('mongodb');
const express = require('express');
const {ObjectId} = require('mongodb');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/public', express.static(__dirname + '/public'));

const uri = "mongodb+srv://venat:N5qgMr2pkgT2HxMI@sorestonoiscluster.urpzo2g.mongodb.net/?retryWrites=true&w=majority";

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * http://localhost:3000/public/register.html
     * RAIZ: http://localhost:3000/
     */
 
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        app.post('/register', async (req, res) => {
            const name = req.body.name;
            const bullets = 0;
            const progression = 'N1A';
            
            try {
                const result = await registerUser(client, name, bullets, progression); 
                console.log(`User registered successfully with ID ${result}.`);
                res.cookie('userId', result.toString(), { expires: new Date('2023-12-31T23:59:59Z') });
                res.status(302).setHeader('Location', 'http://localhost:3000/public/game.html').end();
            } catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        });

        app.get('/', async (req, res) => {
            const userId = req.cookies.userId;
            if (!userId) {
                res.sendFile(__dirname + '/public/register.html');
                return;
            }

            try {
                const user = await findUser(client, userId);
                if (user) {
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

                } else {
                    res.clearCookie('userId');
                    res.sendFile(__dirname + '/public/register.html');
                }
                
            } catch (error) {
                console.error(error);
                res.sendStatus(500);
            }
        });

        app.get('/text', async (req, res) => {
            const userId = req.cookies.userId;
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
              console.log(user.starterProgression);
              const textId = user.starterProgression;
              const text = await client.db('TextDatabase').collection('_text').findOne({ _id: textId });
              console.log(text);
              if (!text) {
                console.error(`Text with ID ${textId} not found.`);
                res.sendStatus(404);
                return;
              }
              res.json({ text: text.text });
            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
          });

          app.get('/choiceText', async (req, res) => {
            const userId = req.cookies.userId;
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
              console.log(user.starterProgression);
              const textId = user.starterProgression;
              const text = await client.db('TextDatabase').collection('_text').findOne({ _id: textId });
              const choicesId = text.choices;
              const choiceText = [];
              for (let i = 0; i < choicesId.length; i++) {
                const choice = await client.db('TextDatabase').collection('_choices').findOne({ _id: choicesId[i] });
                choiceText.push(choice.content);
              }
              console.log(text);
              if (!text) {
                console.error(`Text with ID ${textId} not found.`);
                res.sendStatus(404);
                return;
              }
              res.json({ choiceText });
            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
          });

          app.get('/choiceIds', async (req, res) => {
            const userId = req.cookies.userId;
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

              const textId = user.starterProgression;
              const text = await client.db('TextDatabase').collection('_text').findOne({ _id: textId });
              const choicesId = text.choices;
              console.log(choicesId);
              if (!text) {
                console.error(`ID ${textId} not found.`);
                res.sendStatus(404);
                return;
              }
              res.json({ choicesId });

            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
            });


          app.get('/consultaBullets', async (req, res) => {
            const userId = req.cookies.userId;
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
              const currentBullets = user.starterBullets;
              console.log(`O usuário tem ${currentBullets} balas`)
              res.json({ currentBullets });
            } catch (error) {
              console.error(error);
              res.sendStatus(500);
            }
          });


          app.post('/makeChoice', async (req, res) => {
            const userId = req.cookies.userId;
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

              const choiceId = req.body.choiceId;

              // Find the choice in the database
              const choice = await client.db('TextDatabase').collection('_choices').findOne({ _id: choiceId });
              console.log('depois')

              console.log("Verificando se escolha tem custo de balas");

              if (choice.use_bullets == true)
              {
                  console.log("Uso de balas detectado");
                  let bullets = parseInt(choice.bullets_used);
                  const canShoot = { value: true };
                  await checkAndUpdateBullets(client, userId, bullets, canShoot);
                  console.log(canShoot.value);
                  if (canShoot.value == false)
                  {
                    console.log("MORREU!")
                    choice.next_narration = "DEATH";
                  }
              }
              
              if (!choice) {
                res.sendStatus(404);
                return;
              }
            
              // Update the user's starterProgression
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

        app.listen(3000, () => {
            console.log('Server started at port 3000');
        });

    } catch (e) {
        console.error(e);
    } 
}

/*
	Registra um usuário no banco de dados	
*/

main();

async function registerUser(client, newName, starterBullets, starterProgression) {

    const result = await client.db("PlayerStats").collection("_stats").insertOne({ newName, starterBullets, starterProgression});
    console.log(`User ${newName} registered successfully.`);
    return result.insertedId;
}

async function findUser(client, userId) {
    return client.db("PlayerStats").collection("_stats").findOne({ _id: new ObjectId(userId) });
}

async function checkAndUpdateBullets(client, userId, bullets, canShoot)
{
    //QUER ADICIONAR BALAS? PASSE BULLETS COMO NEGATIVO
    //QUER TIRAR BALAS? PASSE COMO POSITIVO
    const user = await findUser(client, userId);
    user.starterBullets = user.starterBullets - bullets;
    console.log(`Serão removidas ${bullets} balas do jogador`);
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

function getCookie(req, name) {
  if (req.cookies) {
    return req.cookies[name];
  }
  return null;
}

