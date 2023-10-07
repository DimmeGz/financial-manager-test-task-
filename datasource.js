const { config } = require('dotenv');
config();

const { DataSource } = require('typeorm');

exports.connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
  synchronize: true,
  name: 'default',
  entities: ['./*/entities/*.ts'],
  migrations: ['src/migrations/*.ts'],
  subscribers: ['src/subscribers/*.ts'],
});
