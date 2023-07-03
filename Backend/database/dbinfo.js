const { connect } = require("mssql")
/* 
string connect nodejs */
const mssql = require('mssql')

const SQL_DRIVER = 'SQL sever'
const SQL_SERVER = 'DESKTOP-05IV9K1\\SQLEXPRESS'
const SQL_DATABASE = 'DatabaseSeedSchool'

const SQL_UID = 'sa'
const SQL_PWD = '654321'

const config = {
    driver: SQL_DRIVER,
    server: SQL_SERVER,
    database: SQL_DATABASE,
    user: SQL_UID,
    password: SQL_PWD,
    options: {
        encrypt: false,
        enableArithAbort: false,
    },
    connectionTimeout: 300000,
    requestTimeout: 300000,
    pool: {
        idleTimeoutMillis: 300000,
        max: 100,
    }
}

const pool = new mssql.ConnectionPool(config);
module.exports = {
    pool,
}