const {MongoClient, ObjectId} = require('mongodb');
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(__dirname + '/public'));

async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://venat:FaZL1BJvmbyHszKP@sorestonoiscluster.urpzo2g.mongodb.net/?retryWrites=true&w=majority";

 
    const client = new MongoClient(uri, { useUnifiedTopology: true });

    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");


        app.post('/register', async (req, res) => {
            const name = req.body.name;
            const bullets = 0;
            const progression = 'N1A';
            
            try {
                const result = await client.db("PlayerStats").collection("_stats").insertOne({ name, bullets, progression });
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
    } 
}

/*
	Registra um usuário no banco de dados	
*/

async function registerUser(client, newName, starterBullets, starterProgression) {
    const myColl = client.db("PlayerStats").collection("_stats");
    const doc = { name: newName, bullets: starterBullets, currentProgress: starterProgression};
    const result = await myColl.insertOne(doc);
    console.log("A document was inserted with the _id: ${result.insertedId}",);
    return result.ops[0];
}


main();







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