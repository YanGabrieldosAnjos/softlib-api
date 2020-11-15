import { Document, createConnection, set, connection, Collection } from "mongoose";
const { MONGO_USER_TEST, MONGO_PASSWORD_TEST, DB_NAME_TEST, DB_URI_TEST } = process.env;


export const mongoOptions = {
    user: MONGO_USER_TEST,
    pass: MONGO_PASSWORD_TEST,
    useNewUrlParser: true,
    dbName: DB_NAME_TEST,
    authSource: "admin",
};

const uri = DB_URI_TEST;

async function removeAllCollections () {
    const collections = Object.keys(connection.collections)
    for (const collectionName of collections) {
      const collection = connection.collections[collectionName]
      await collection.deleteMany({});
    }
}

async function dropAllCollections (){
    const collections = Object.keys(connection.collections);
    for (const collectionName of collections) {
        const collection = connection.collections[collectionName]
        
        try{
            await collection.drop();
        }catch(error) {
            if(error.message === "ns not found"){
                return;
            }
          
            if(error.message.includes('a background operation is currently running')){
                return;
            }
              
            console.log(error.message);
        }
    }
}
beforeAll(async () => {
    const conn = createConnection(uri!, mongoOptions);

    conn.on("error", console.log.bind(console, "Erro ao conectar"));
    conn.once("open", console.log.bind(console, "Conexão estabelecida"));

    set("useCreateIndex", true);

    
});

afterEach(async () => {
    await removeAllCollections();
    
});

afterAll( async () => {
   await dropAllCollections();
   await connection.close(); 
});