import { DataAPIClient } from "@datastax/astra-db-ts";

const { ASTRA_DB_APPLICATION_TOKEN, ASTRA_DB_API_ENDPOINT } = process.env;

if (!ASTRA_DB_APPLICATION_TOKEN || !ASTRA_DB_API_ENDPOINT) {
  throw new Error("Missing Astra credentials");
}

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN, {
  httpOptions: {
    client: "fetch",
  },
});

const db = client.db(ASTRA_DB_API_ENDPOINT);


export default db;
