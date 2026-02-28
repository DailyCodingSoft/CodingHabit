import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error("Por favor define MONGODB_URI en .env.local");
}

if (process.env.NODE_ENV === "development") {
    // En desarrollo reutilizamos la conexión entre hot-reloads
    const globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }

    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    // En producción siempre una conexión nueva
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;