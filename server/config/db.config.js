import dotenv from 'dotenv'
dotenv.config()

export default {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    PORT: process.env.DBPORT,
    DIALECT: process.env.DIALECT,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idel: 10000,
    },
}