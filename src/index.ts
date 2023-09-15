import express from 'express';
import { AppDataSource } from './data-source';
import routes from './routes';
import cors from 'cors';

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

  return app.listen(process.env.PORT, () => {
    console.log('🚀 HTTP Server started!');
  })
});