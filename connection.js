const { MongoClient, ServerApiVersion } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://greatoaau:123@greatooau.sgwk5.mongodb.net/mernapp?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try{
        await client.connect();

        await listDatabases(client);
    } catch(e){
        console.log(e);
    } finally{
        await client.close();
    }
}
main().catch(console.error);

async function listDatabases(client) {
    const dataBasesList = await client.db().admin().listDatabases();
    console.log("Databases: ");
    dataBasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}