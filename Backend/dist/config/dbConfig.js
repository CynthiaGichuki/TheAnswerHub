"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
// import mssql from 'mssql'
const sqlConfig = {
    authentication: {
        type: 'default',
        options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PWD
        }
    },
    server: '192.168.231.252',
    options: {
        database: process.env.DB_NAME,
        encrypt: true,
        trustServerCertificate: true // change to true for local dev / self-signed certs
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};
exports.default = sqlConfig;
// const checkConnection = async () => {
//     try {
//         const x = await mssql.connect(sqlConfig)
//         if (x.connected) {
//             console.log("Connected to the Database");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
// checkConnection()
