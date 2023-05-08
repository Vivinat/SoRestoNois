const {MongoClient, ObjectId} = require('mongodb');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * http://localhost:3000/public/sandbox.html
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
                res.cookie('userId', result.toString());
                res.status(302).setHeader('Location', 'http://localhost:3000/public/choices.html').end();
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


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

/*
	Carrega um usuário do banco de dados
*/


async function loadUser(client, userid){

    var mongo = require('mongodb');
    var o_id = new mongo.ObjectId(userid);

    const finder = client.db("PlayerStats").collection("_stats").find({'_id': o_id});
 
    const results = await finder.toArray();

    console.log(results);

    return results;

}

/*
	Busca um texto no banco de dados
*/

async function searchText(client, textId) {

    const cursor = client.db("TextDatabase").collection("_text").find( {"_id" : textId});

    const results = await cursor.toArray();

    if (results.length > 0) {
        results.forEach((result, i) => {
            console.log(result);
                return result;
        });
    } else {
        console.log('Não localizado');
    }

}