import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error("❌ MONGODB_URI no está definida en variables de entorno");
}

// Evita múltiples conexiones en dev (Next.js hot reload)
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri);
  global._mongoClientPromise = client.connect()
    .then(async (client) => {
      console.log("✅ Mongo conectado");

      // 🔥 TEST DE CONEXIÓN REAL
      const db = client.db();
      await db.command({ ping: 1 });

      console.log("🏓 Ping a Mongo OK");

      return client;
    })
    .catch((error) => {
      console.error("❌ Error conectando a Mongo:", error);
      throw error;
    });
}

clientPromise = global._mongoClientPromise;

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db("miDB"); // cambia si necesitas dinámico
}