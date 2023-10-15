import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';
import cors from 'cors';
import { AppDataSourceDados } from './data-source-dados';
import { connectToMongoDB1 } from './repositories/dados_processadosPepository';
import { connectToMongoDB2 } from './repositories/dadosN_processadosRepository';

AppDataSourceDados.initialize();
AppDataSource.initialize().then(() => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
        allowedHeaders: ["authorization", "Content-Type"],
        exposedHeaders: ["authorization"],
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE,CREATE,OPTIONS",
        preflightContinue: false    
    })
  );

  app.use(routes);

  connectToMongoDB1();
  connectToMongoDB2();

  return app.listen(process.env.PORT, () => {
    console.log('🚀 HTTP Server started!');
  })
});