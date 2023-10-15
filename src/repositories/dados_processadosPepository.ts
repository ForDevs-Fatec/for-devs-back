import { MongoClient, Db, Collection } from 'mongodb';

let db: Db;
let collection: Collection;

export async function connectToMongoDB1() {
  const client = new MongoClient('mongodb+srv://dlsfilho00:YtadoriIuuji851@clusterdaniel.86xxpj7.mongodb.net/?retryWrites=true&w=majority');
  await client.connect();
  db = client.db('ForDevs');
  collection = db.collection('dados_processados');
}

export function getCollection() {
  return collection;
}