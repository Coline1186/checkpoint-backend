import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import http from "http";
import { buildSchema } from "type-graphql";
import CountryResolver from "./resolvers/country.resolver";
import datasource from "./lib/datasource";


const app = express();
const httpServer = http.createServer(app);

async function main() {
  const schema = await buildSchema({
    resolvers: [CountryResolver],
    validate: false, 
  })
  const server = new ApolloServer({
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    schema,
  });

  await server.start();
  app.use(
    "/",
    express.json(), 
    expressMiddleware(server)
  );
  await datasource.initialize();
  await new Promise<void>((resolve) => 
    httpServer.listen({ port: 4000 }, resolve)
  );

  console.log(`🚀 Server lancé sur http://localhost:4000/`);
}
main();
