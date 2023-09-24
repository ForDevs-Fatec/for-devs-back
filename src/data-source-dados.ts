import { DataSource } from "typeorm";
import 'dotenv/config'
import 'reflect-metadata'

const port = process.env.DB_PORT as number | undefined;

export const AppDataSourceDados = new DataSource({
    type: 'postgres',
    password: process.env.DB_PASS_DADOS,
    name: process.env.DB_NAME_DADOS,
    url: process.env.DB_URL_DADOS,
    entities: [`${__dirname}/**/entities-dados/*.{ts,js}`],
	migrations: [`${__dirname}/**/migrations-dados/*.{ts,js}`]
})