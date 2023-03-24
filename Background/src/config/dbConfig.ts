import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })


const sqlConfig = {
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PWD
    }
  },
  server: '172.18.149.156',
  options: {
    database: process.env.DB_NAME,
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
};

export default sqlConfig;