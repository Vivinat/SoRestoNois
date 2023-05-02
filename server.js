const {MongoClient, ObjectId} = require('mongodb');
const express = require('express');


async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://venat:R8Us6VvrNTHBgv8O@sorestonoiscluster.urpzo2g.mongodb.net/?retryWrites=true&w=majority";
 
 
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        const app = express();
        app.use(express.json());

        app.post('/register', async (req, res) => {
            const { name } = req.body;
            const bullets = 0;
            const progression = 'N1A';
            
            try {
                await registerUser(client, name, bullets, progression);
                console.log(`User ${name} registered successfully.`);
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
    } finally {
        await setTimeout(() => {client.close()}, 1500)
    }
}

/*
	Registra um usuário no banco de dados	
*/


function registerUser(client, newName, starterBullets, starterProgression) {
    const myColl = client.db("PlayerStats").collection("_stats");
    const doc = { name: newName, bullets: starterBullets, currentProgress: starterProgression};
    const result = myColl.insertOne(doc);
    console.log("A document was inserted with the _id: ${result.insertedId}",);
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