const {MongoClient, ObjectId} = require('mongodb');


async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://venat:R8Us6VvrNTHBgv8O@sorestonoiscluster.urpzo2g.mongodb.net/?retryWrites=true&w=majority";

    const client = new MongoClient(uri);
 
    try {
        await client.connect();

        //await  listDatabases(client);

        //await searchText(client, '1');

        //await registerUser(client, 'Flavinho', 0, '0');

        await loadUser(client, '641ca0f6dfb3b457e6cad75f');
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);


/*
	Lista as databases	
*/

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

/*
	Registra um usuário no banco de dados	
*/


async function registerUser(client, newName, starterBullets, starterProgression) {
    const myColl = client.db("PlayerStats").collection("_stats");
    const doc = { name: newName, bullets: starterBullets, currentProgress: starterProgression};
    const result = await myColl.insertOne(doc);
    console.log("A document was inserted with the _id: ${result.insertedId}",);
}

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
            // Here you could build your html or put the results in some other data structure you want to work with
        });
    } else {
        console.log('Não localizado');
    }
}
