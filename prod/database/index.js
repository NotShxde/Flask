"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const connectionString = 'postgres://plybsfkzimgkwn:0968ac1d1535315945601db4f90a53d471da7cd40f95c654db0aee2834855069@ec2-63-32-248-14.eu-west-1.compute.amazonaws.com:5432/d9ggsk373lbj9e'
const pool = new pg_1.Pool({
   connectionString,
});
pool.connect()
    .then(() => console.log('[INFO]', 'CONNECTION HAS BEEN ESTABLISHED WITH DATABASE'))
    .catch((err) => console.log('[ERROR]', `Problem with connecting to PG database: \n ${err}`));
pool.query(`
  CREATE TABLE IF NOT EXISTS guild_data(
     id BIGSERIAL PRIMARY KEY NOT NULL,
     guild_id BIGINT NOT NULL,
     prefix VARCHAR(5) NOT NULL 
  );
`, (err, res) => {
    if (err)
        throw err;
    res;
});
pool.query(`
 CREATE TABLE IF NOT EXISTS audit_log(
  enabled BOOLEAN NOT NULL,
  guild_id BIGSERIAL NOT NULL,
  audit_id BIGINT );
`, (err, res) => {
    if (err)
        throw err;
    res;
});
pool.query(`
  CREATE TABLE IF NOT EXISTS warn_data(
     id uuid DEFAULT uuid_generate_v4 (),
     issuedms  BIGSERIAL NOT NULL,
     guild_id BIGSERIAL NOT NULL,
     user_id BIGINT NOT NULL,
     reason TEXT NOT NULL 
  );
`, (err, res) => {
    if (err)
        throw err;
    res;
});
exports.db = pool;
