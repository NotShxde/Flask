"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    host: "localhost",
    port: 5432,
    user: "notshade",
    database: 'flask',
    password: "slq"
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
