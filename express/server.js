const {MongoClient} = require('mongodb');
const express = require('express');
const {ObjectId} = require('mongodb');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));


async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * http://localhost:3000/public/register.html
     * RAIZ: http://localhost:3000/
     */
    const uri = "mongodb+srv://venat:bAsEwW6b3gDP86j8@sorestonoiscluster.urpzo2g.mongodb.net/?retryWrites=true&w=majority";

 
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
